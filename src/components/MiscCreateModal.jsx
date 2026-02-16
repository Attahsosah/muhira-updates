"use client";

import React, { useContext, useEffect, useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSession } from "next-auth/react";
import { db, storage } from "../../firestore";
import { 
  MiscDescriptionContext, 
  MiscDiscountContext, 
  MiscFeaturedContext, 
  MiscImagesContext, 
  MiscOfferContext, 
  MiscOpenContext, 
  MiscPriceContext, 
  MiscTitleContext, 
  MiscTypeContext, 
  MiscWasContext, 
  TaskContext 
} from "./context/MiscContext";

function MiscCreateModal({ pageCategory, onSuccess }) {
  const { data: session } = useSession();
  
  // Context States
  const [miscOpen, setmiscOpen] = useContext(MiscOpenContext);
  const [miscTitle, setmiscTitle] = useContext(MiscTitleContext);
  const [miscDescription, setmiscDescription] = useContext(MiscDescriptionContext);
  const [miscDiscount, setmiscDiscount] = useContext(MiscDiscountContext);
  const [miscFeatured, setmiscFeatured] = useContext(MiscFeaturedContext);
  const [miscOffer, setmiscOffer] = useContext(MiscOfferContext);
  const [miscPrice, setmiscPrice] = useContext(MiscPriceContext);
  const [miscWas, setmiscWas] = useContext(MiscWasContext);
  const [miscType, setMiscType] = useContext(MiscTypeContext);
  const [miscImages, setmiscImages] = useContext(MiscImagesContext);
  const [task, setTask] = useContext(TaskContext);

  // Local States
  const [uploading, setUploading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSub, setSelectedSub] = useState("");

  // 1. AUTO-SET PAGE CONTEXT
  useEffect(() => {
    if (miscOpen && pageCategory) {
      // Logic: If page is 'accessories', set internal type to the DB version 'accesories'
      const initialType = pageCategory === "accessories" ? "accesories" : pageCategory;
      setMiscType(initialType);
    }
  }, [miscOpen, pageCategory, setMiscType]);

  // 2. FETCH RELEVANT SUBCATEGORIES (Using Universal Spelling Fix)
  useEffect(() => {
    const fetchRelevantSubs = async () => {
      if (!miscOpen || !miscType) return;
      
      const subRef = collection(db, "subcategories");
      
      // Build search terms to catch both spellings
      let searchTerms = [miscType];
      if (miscType === "accessories") searchTerms.push("accesories");
      if (miscType === "accesories") searchTerms.push("accessories");

      const q = query(subRef, where("parentCategory", "in", searchTerms));
      
      try {
        const snap = await getDocs(q);
        const fetched = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSubcategories(fetched);
      } catch (error) {
        console.error("Error fetching subcategories for creation:", error);
      }
    };
    
    fetchRelevantSubs();
  }, [miscOpen, miscType]);

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files) return;
    setImgLoading(true);
    const storageRef = ref(storage);

    try {
      const uploadPromises = Array.from(files).map((file) => {
        const fileRef = ref(storageRef, `misc/${Date.now()}-${file.name}`);
        return uploadBytes(fileRef, file);
      });

      const snapshots = await Promise.all(uploadPromises);
      const urls = await Promise.all(snapshots.map(s => getDownloadURL(s.ref)));
      
      setmiscImages((prev) => [...(prev || []), ...urls]);
      setImgLoading(false);
    } catch (error) {
      console.error("Upload error:", error);
      setImgLoading(false);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setmiscImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!miscTitle || !miscPrice) return alert("Please fill in basic details");

    try {
      setUploading(true);
      
      // Ensure we save using the misspelled version for Accessories so it shows up on the page
      const dbType = miscType === "accessories" ? "accesories" : miscType;

      await addDoc(collection(db, "misc"), {
        title: miscTitle,
        description: miscDescription,
        discount: miscDiscount,
        featured: miscFeatured,
        offer: miscOffer,
        price: miscPrice,
        was: miscWas,
        type: dbType,
        subcategory: selectedSub,
        images: miscImages,
        username: session?.user?.username || "admin",
        createdAt: new Date(),
      });

      // Reset everything
      setmiscTitle("");
      setmiscDescription("");
      setmiscDiscount("");
      setmiscFeatured(false);
      setmiscOffer(false);
      setmiscPrice("");
      setmiscWas("");
      setmiscImages([]);
      setSelectedSub("");
      setmiscOpen(false);
      setTask("");
      setUploading(false);

      if (onSuccess) onSuccess();

    } catch (error) {
      console.error("Save error:", error);
      setUploading(false);
    }
  };

  if (!miscOpen || task !== "create") return null;

  return (
    <div className="justify-center items-center flex fixed inset-0 z-[10000] outline-none focus:outline-none bg-black/50 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#bd8b31] p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-tight">Add New Item</h3>
            <p className="text-[10px] font-bold uppercase opacity-80 mt-1">Target Category: {miscType}</p>
          </div>
          <button onClick={() => {setmiscOpen(false); setTask("");}} className="text-2xl hover:bg-white/20 w-8 h-8 flex items-center justify-center rounded-full transition-all">&times;</button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6 custom-scrollbar">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product Title</label>
              <input className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-[#bd8b31]" placeholder="e.g. Pro Helmet" value={miscTitle} onChange={(e) => setmiscTitle(e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price (BIF)</label>
              <input className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-[#bd8b31]" placeholder="50000" value={miscPrice} onChange={(e) => setmiscPrice(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Main Category</label>
              <select 
                className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none bg-gray-50 capitalize font-medium"
                value={miscType}
                onChange={(e) => setMiscType(e.target.value)}
              >
                <option value="electronics">Electronics/Misc</option>
                <option value="safety">Safety</option>
                <option value="accesories">Advertising (Accessories)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Subcategory</label>
              <select 
                className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-[#bd8b31] bg-white transition-colors"
                value={selectedSub}
                onChange={(e) => setSelectedSub(e.target.value)}
              >
                <option value="">Select Sub-filter...</option>
                {subcategories.map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ... Rest of your UI (Offer, Featured, Description, Gallery) ... */}
          <div className="flex flex-wrap items-center gap-6 py-2 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={miscOffer} onChange={(e) => setmiscOffer(e.target.checked)} className="w-5 h-5 accent-[#bd8b31]" />
              <span className="text-xs font-bold text-gray-600 group-hover:text-black">ON OFFER</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={miscFeatured} onChange={(e) => setmiscFeatured(e.target.checked)} className="w-5 h-5 accent-[#bd8b31]" />
              <span className="text-xs font-bold text-gray-600 group-hover:text-black">FEATURED</span>
            </label>
            <div className="flex items-center gap-2 ml-auto">
                <input className="border-2 border-gray-100 rounded-lg p-2 w-20 text-center text-xs font-bold" placeholder="-%" value={miscDiscount} onChange={(e) => setmiscDiscount(e.target.value)} />
                <input className="border-2 border-gray-100 rounded-lg p-2 w-28 text-center text-xs font-bold" placeholder="Old Price" value={miscWas} onChange={(e) => setmiscWas(e.target.value)} />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</label>
            <textarea rows={3} value={miscDescription} onChange={(e) => setmiscDescription(e.target.value)} className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-[#bd8b31] resize-none" placeholder="Enter item details..."/>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gallery ({miscImages?.length || 0})</label>
            <div className="flex gap-3 overflow-x-auto pb-4 items-center no-scrollbar">
              {miscImages?.map((url, i) => (
                <div key={i} className="relative flex-shrink-0">
                  <img src={url} className="h-24 w-24 object-cover rounded-xl border-2 border-gray-100 shadow-sm" alt="preview" />
                  <button onClick={() => handleRemoveImage(i)} className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg text-[10px]">&times;</button>
                </div>
              ))}
              <label htmlFor="create-image-upload" className="flex-shrink-0 h-24 w-24 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-[#bd8b31] hover:text-[#bd8b31] cursor-pointer transition-all">
                {imgLoading ? <div className="w-5 h-5 border-2 border-[#bd8b31] border-t-transparent animate-spin rounded-full" /> : <span className="text-xl font-light">+</span>}
                <span className="text-[9px] font-bold uppercase mt-1">{imgLoading ? "..." : "Add"}</span>
              </label>
            </div>
            <input id="create-image-upload" type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex gap-3">
          <button onClick={() => {setmiscOpen(false); setTask("");}} className="flex-1 py-3 text-gray-500 font-bold text-xs uppercase tracking-widest hover:bg-gray-200 rounded-xl transition-all">Discard</button>
          <button onClick={handleSubmit} disabled={uploading || imgLoading} className="flex-[2] py-3 bg-[#bd8b31] text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg disabled:opacity-50 hover:bg-[#a67a2a] transition-all">
            {uploading ? "Creating..." : "Create Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MiscCreateModal;