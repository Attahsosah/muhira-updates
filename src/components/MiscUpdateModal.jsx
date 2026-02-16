"use client";

import React, { useContext, useEffect, useState } from "react";
import { doc, updateDoc, collection, getDocs, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSession } from "next-auth/react";
import { db, storage } from "../../firestore";
import { 
  MiscDescriptionContext, 
  MiscDiscountContext, 
  MiscFeaturedContext, 
  MiscIdContext, 
  MiscImagesContext, 
  MiscOfferContext, 
  MiscOpenContext, 
  MiscPriceContext, 
  MiscTitleContext, 
  MiscTypeContext, 
  MiscWasContext, 
  TaskContext,
  MiscSubcategoryContext 
} from "./context/MiscContext";

function MiscUpdateModal({ pageCategory, onSuccess }) {
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
  const [miscId, setmiscId] = useContext(MiscIdContext);
  const [task, setTask] = useContext(TaskContext);
  const [miscSubcategory, setMiscSubcategory] = useContext(MiscSubcategoryContext);

  // Local States
  const [uploading, setUploading] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSub, setSelectedSub] = useState("");

  // 1. IMPROVED FETCH LOGIC
  useEffect(() => {
    const fetchRelevantSubs = async () => {
      // If the modal isn't open for an update, don't run
      if (!miscOpen || task !== "updateMiscellenious") return;

      const subRef = collection(db, "subcategories");
      
      /** * DETERMINING SEARCH CRITERIA:
       * We create an array of potential parent categories.
       * We include pageCategory (from URL), miscType (from item data), 
       * and common variations to ensure we find the match.
       */
      let searchTerms = [];
      if (pageCategory) searchTerms.push(pageCategory);
      if (miscType) searchTerms.push(miscType);
      
      // Handle the specific 'accessories' typo mapping
      if (searchTerms.includes("accessories") || searchTerms.includes("accesories")) {
        searchTerms.push("accessories", "accesories");
      }

      // Remove duplicates and empty strings
      const finalTerms = [...new Set(searchTerms)].filter(t => t !== "");

      // If no terms, try a fallback to get all just to check if connection works
      const q = finalTerms.length > 0 
        ? query(subRef, where("parentCategory", "in", finalTerms))
        : query(subRef);

      try {
        const snap = await getDocs(q);
        const fetched = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Log this to your browser console (F12) to see what is actually returning
        console.log("Subcategory Search Terms:", finalTerms);
        console.log("Subcategories Found:", fetched);
        
        setSubcategories(fetched);
      } catch (error) {
        console.error("Subcategory fetch error:", error);
      }
    };

    fetchRelevantSubs();
  }, [miscOpen, task, pageCategory, miscType]); // Added miscType as dependency

  // 2. Sync the dropdown with the item's actual subcategory when opening
  useEffect(() => {
    if (miscOpen) {
      setSelectedSub(miscSubcategory || "");
    }
  }, [miscOpen, miscSubcategory]);

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    const storageRef = ref(storage);

    try {
      const uploadPromises = Array.from(files).map((file) => {
        const fileRef = ref(storageRef, `misc/${Date.now()}-${file.name}`);
        return uploadBytes(fileRef, file);
      });

      const snapshots = await Promise.all(uploadPromises);
      const urls = await Promise.all(snapshots.map(s => getDownloadURL(s.ref)));
      
      setmiscImages((prev) => [...(prev || []), ...urls]);
      setUploading(false);
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setmiscImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    if (!miscId) return;
    setUploading(true);
    
    // Maintain the DB spelling logic for the 'type' field
    const finalType = miscType === "accessories" ? "accesories" : miscType;

    try {
      const itemRef = doc(db, "misc", miscId);
      await updateDoc(itemRef, {
        title: miscTitle,
        description: miscDescription,
        discount: miscDiscount,
        featured: miscFeatured,
        offer: miscOffer,
        price: miscPrice,
        was: miscWas,
        type: finalType,
        subcategory: selectedSub,
        images: miscImages,
        lastUpdatedBy: session?.user?.username || "admin",
        updatedAt: new Date()
      });

      setmiscOpen(false);
      setTask("");
      setUploading(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Update error:", error);
      setUploading(false);
    }
  };

  if (!miscOpen || task !== "updateMiscellenious") return null;

  return (
    <div className="justify-center items-center flex fixed inset-0 z-[10000] outline-none focus:outline-none bg-black/50 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#10b981] p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-tight">Update {miscTitle || 'Item'}</h3>
            <p className="text-[10px] opacity-70 font-mono mt-1">ID: {miscId}</p>
          </div>
          <button 
            onClick={() => {setmiscOpen(false); setTask("");}} 
            className="text-2xl hover:bg-white/20 w-8 h-8 flex items-center justify-center rounded-full transition-all"
          >&times;</button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6 custom-scrollbar">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product Title</label>
              <input className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-[#10b981] transition-colors" value={miscTitle} onChange={(e) => setmiscTitle(e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price (BIF)</label>
              <input className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-[#10b981] transition-colors" value={miscPrice} onChange={(e) => setmiscPrice(e.target.value)} />
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
                <option value="accesories">Advertising </option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Subcategory</label>
              <select 
                className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-[#10b981] bg-white transition-colors"
                value={selectedSub}
                onChange={(e) => setSelectedSub(e.target.value)}
              >
                <option value="">Select Subcategory</option>
                {subcategories.map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 py-2 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={miscOffer} onChange={(e) => setmiscOffer(e.target.checked)} className="w-5 h-5 accent-[#10b981]" />
              <span className="text-xs font-bold text-gray-600 group-hover:text-[#10b981] transition-colors">ON OFFER</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={miscFeatured} onChange={(e) => setmiscFeatured(e.target.checked)} className="w-5 h-5 accent-[#10b981]" />
              <span className="text-xs font-bold text-gray-600 group-hover:text-[#10b981] transition-colors">FEATURED</span>
            </label>
            <div className="flex items-center gap-2 ml-auto">
                <input className="border-2 border-gray-100 rounded-lg p-2 w-20 text-center text-xs font-bold" placeholder="-%" value={miscDiscount} onChange={(e) => setmiscDiscount(e.target.value)} />
                <input className="border-2 border-gray-100 rounded-lg p-2 w-28 text-center text-xs font-bold" placeholder="Old Price" value={miscWas} onChange={(e) => setmiscWas(e.target.value)} />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</label>
            <textarea rows={3} value={miscDescription} onChange={(e) => setmiscDescription(e.target.value)} className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-[#10b981] resize-none" />
          </div>

          <div className="space-y-3">
             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gallery ({miscImages?.length || 0})</label>
            <div className="flex gap-3 overflow-x-auto pb-4 items-center no-scrollbar">
              {miscImages?.map((url, i) => (
                <div key={i} className="relative flex-shrink-0 group">
                  <img src={url} className="h-24 w-24 object-cover rounded-xl border-2 border-gray-100 shadow-sm" alt="product" />
                  <button onClick={() => handleRemoveImage(i)} className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg text-[10px]">✕</button>
                </div>
              ))}
              <label htmlFor="update-image-upload" className="flex-shrink-0 h-24 w-24 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 cursor-pointer hover:border-[#10b981] hover:text-[#10b981]">
                <span className="text-xl">+</span>
              </label>
            </div>
            <input id="update-image-upload" type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 flex gap-3">
          <button onClick={() => {setmiscOpen(false); setTask("");}} className="flex-1 py-3 text-gray-500 font-bold text-xs uppercase tracking-widest hover:bg-gray-200 rounded-xl transition-all">Discard</button>
          <button 
            onClick={handleSubmit} 
            disabled={uploading}
            className="flex-[2] py-3 bg-[#10b981] text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg disabled:opacity-50 hover:bg-[#0da371] transition-all"
          >
            {uploading ? "Processing..." : "Save Product Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MiscUpdateModal;