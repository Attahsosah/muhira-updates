"use client";

import React, { useContext, useState, useEffect, useRef } from "react";
import { doc, updateDoc, addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firestore";
import { 
  ElectronicsOpenContext, 
  TaskContext,
  ElectronicsTitleContext, 
  ElectronicsPriceContext, 
  ElectronicsSubcategoryContext, 
  ElectronicsDescriptionContext,
  ElectronicsImagesContext,
  ElectronicsIdContext,
  ElectronicsSpecsContext,
  ToastContext // Added Toast Context
} from "./context/CrudContext";
import { FaCloudUploadAlt, FaTrashAlt, FaPlus } from "react-icons/fa";

function ElectronicsUpdateModal() {
  const [isOpen, setIsOpen] = useContext(ElectronicsOpenContext);
  const [task, setTask] = useContext(TaskContext);
  const [docId] = useContext(ElectronicsIdContext);
  const fileInputRef = useRef(null);

  // Form Fields from Context
  const [title, setTitle] = useContext(ElectronicsTitleContext);
  const [price, setPrice] = useContext(ElectronicsPriceContext);
  const [subcategory, setSubcategory] = useContext(ElectronicsSubcategoryContext);
  const [description, setDescription] = useContext(ElectronicsDescriptionContext);
  const [images, setImages] = useContext(ElectronicsImagesContext); 
  const [specs, setSpecs] = useContext(ElectronicsSpecsContext);
  
  // Toast trigger from Context
  const { triggerToast } = useContext(ToastContext);

  // Local State
  const [dbSubcategories, setDbSubcategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch Categories whenever the modal opens
  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const q = query(collection(db, "subcategories"), where("parentCategory", "==", "electronics"));
        const snap = await getDocs(q);
        setDbSubcategories(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    if (isOpen) {
      fetchSubs();
    }
  }, [isOpen]);

  // --- SPECIFICATIONS LOGIC ---
  const handleAddSpec = () => setSpecs([...specs, { key: "", value: "" }]);
  
  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const removeSpec = (index) => setSpecs(specs.filter((_, i) => i !== index));

  // --- IMAGE LOGIC ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const storageRef = ref(storage, `electronics/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed", null, 
      (err) => { 
        console.error(err); 
        setUploading(false); 
        triggerToast("Image upload failed");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImages((prev) => [...prev, url]);
          setUploading(false);
        });
      }
    );
  };

  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleClose = () => {
    setIsOpen(false);
    setTask("");
    // Reset Specs to a single empty row for the next session
    setSpecs([{ key: "", value: "" }]);
  };

  const handleSave = async () => {
    if (!title || !price) {
      triggerToast("Title and Price are required!");
      return;
    }

    setLoading(true);
    const productData = {
      title,
      price: Number(price),
      subcategory,
      description,
      // Only save specs that have a Label (key) filled out
      specifications: specs.filter(s => s.key.trim() !== ""), 
      images: images,
      updatedAt: new Date(),
    };

    try {
      if (task === "update") {
        const docRef = doc(db, "electronics", docId);
        await updateDoc(docRef, productData);
        triggerToast("Product updated successfully!");
      } else {
        // Handle "create" task
        await addDoc(collection(db, "electronics"), {
          ...productData,
          createdAt: new Date()
        });
        triggerToast("New product added!");
      }
      handleClose();
    } catch (error) {
      console.error("Save error:", error);
      triggerToast("Error saving product");
    } finally {
      setLoading(false);
    }
  };

  // Only show if open and task is valid
  if (!isOpen || (task !== "update" && task !== "create")) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-[#bd8b31] p-6 text-white flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-tight">
              {task === "update" ? "Update" : "Add"} Electronic
            </h2>
            <p className="text-orange-100 text-sm italic">{title || "Product Editor"}</p>
          </div>
          <button onClick={handleClose} className="text-2xl hover:bg-white/20 w-10 h-10 rounded-full transition-all">✕</button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8 overflow-y-auto">
          {/* Image Gallery */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Image Gallery</label>
            <div className="flex flex-wrap gap-4">
              {images && images.map((url, index) => (
                <div key={index} className="relative w-28 h-28 rounded-2xl overflow-hidden group border-2 border-gray-50">
                  <img src={url} alt="product" className="w-full h-full object-cover" />
                  <button onClick={() => removeImage(index)} className="absolute inset-0 bg-red-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              ))}
              <button 
                onClick={() => fileInputRef.current.click()} 
                className="w-28 h-28 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-[#bd8b31] hover:text-[#bd8b31] transition-all"
              >
                <FaCloudUploadAlt size={28} />
                <span className="text-[10px] font-bold mt-2">{uploading ? "Uploading..." : "Upload"}</span>
              </button>
            </div>
            <input type="file" className="hidden" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* General Info */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">General Info</label>
              <input placeholder="Title" className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-[#bd8b31]" value={title} onChange={(e) => setTitle(e.target.value)} />
              
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Price (BIF)" className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-[#bd8b31]" value={price} onChange={(e) => setPrice(e.target.value)} />
                <select className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-[#bd8b31]" value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                  <option value="">Category</option>
                  {dbSubcategories.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
                </select>
              </div>

              <textarea 
                placeholder="Product Description..." 
                rows={5}
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-[#bd8b31] resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Specifications */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Specifications</label>
                <button onClick={handleAddSpec} className="text-[#bd8b31] flex items-center gap-1 text-[10px] font-bold">
                  <FaPlus size={10} /> Add Spec
                </button>
              </div>
              
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                {specs.map((spec, index) => (
                  <div key={index} className="flex gap-2 group">
                    <input 
                      placeholder="e.g. Battery" 
                      className="flex-1 bg-gray-50 border-2 border-gray-100 p-3 rounded-xl text-sm focus:border-blue-400 outline-none"
                      value={spec.key}
                      onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                    />
                    <input 
                      placeholder="e.g. 5000mAh" 
                      className="flex-1 bg-gray-50 border-2 border-gray-100 p-3 rounded-xl text-sm focus:border-blue-400 outline-none"
                      value={spec.value}
                      onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                    />
                    <button onClick={() => removeSpec(index)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <FaTrashAlt size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 flex justify-end gap-4">
          <button onClick={handleClose} className="px-8 py-3 font-bold text-gray-500">Cancel</button>
          <button 
            onClick={handleSave} 
            disabled={loading || uploading}
            className="bg-[#bd8b31] text-white px-12 py-3 rounded-2xl font-bold disabled:opacity-50 transition-all shadow-lg shadow-orange-100 active:scale-95"
          >
            {loading ? "Processing..." : task === "update" ? "Update Product" : "Save Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ElectronicsUpdateModal;