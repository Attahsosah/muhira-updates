"use client";

import React, { useState, useContext, useEffect } from "react";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firestore"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import { MiscImagesContext } from "@/components/context/MiscContext"; 
import { FiX, FiCheckCircle, FiImage } from "react-icons/fi";

function AddCategoryModal({ isOpen, onClose, onRefresh, parentCategory, editData = null }) {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [miscImages, setmiscImages] = useContext(MiscImagesContext);

  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setName(editData.name || "");
        // Support both field names 'image' and 'imageUrl'
        setPreview(editData.imageUrl || editData.image || null);
      } else {
        setName("");
        setPreview(null);
        setFile(null);
      }
    }
  }, [editData, isOpen]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Clean up previous blob if it exists
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
      setPreview(URL.createObjectURL(selectedFile));
      setmiscImages([selectedFile]); 
    }
  };

  const clearImage = () => {
    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
    setmiscImages([]);
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    
    setLoading(true);

    try {
      // 1. Maintain existing data as fallback
      let finalImageUrl = editData?.imageUrl || editData?.image || "";
      let finalImagePath = editData?.imagePath || "";

      // 2. Upload only if a new file is chosen
      if (file) {
        const path = `subcategory_icons/${Date.now()}_${file.name}`;
        const storageRef = ref(storage, path);
        const snapshot = await uploadBytes(storageRef, file);
        finalImageUrl = await getDownloadURL(snapshot.ref);
        finalImagePath = path;
      }

      const payload = {
        name: name.trim(),
        // We save both to be safe, but keep 'image' as primary for your current setup
        image: finalImageUrl,
        imageUrl: finalImageUrl, 
        imagePath: finalImagePath,
        updatedAt: new Date(),
      };

      if (editData?.id) {
        // UPDATE MODE
        const categoryRef = doc(db, "subcategories", editData.id);
        await updateDoc(categoryRef, payload);
      } else {
        // CREATE MODE
        await addDoc(collection(db, "subcategories"), {
          ...payload,
          parentCategory: parentCategory || "electronics",
          createdAt: new Date(),
        });
      }

      // Cleanup and Exit
      setName("");
      clearImage();
      onRefresh(); 
      onClose();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#bd8b31] p-6 text-white flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="text-xl font-black uppercase tracking-tighter">
              {editData ? "Edit Category" : "New Category"}
            </h2>
            <p className="text-[9px] font-bold opacity-70 tracking-[0.2em] uppercase">
              Section: {editData?.parentCategory || parentCategory || 'electronics'}
            </p>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <FiX size={20} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Category Title
            </label>
            <input 
              placeholder="e.g. Smartphones" 
              className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-[#bd8b31] font-bold transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Category Icon
            </label>
            {!preview ? (
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer hover:bg-orange-50/50 hover:border-[#bd8b31]/40 transition-all group">
                <FiImage size={32} className="text-gray-300 group-hover:text-[#bd8b31] mb-2" />
                <span className="text-[10px] font-bold text-gray-400 group-hover:text-[#bd8b31] uppercase">Upload Image</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            ) : (
              <div className="relative w-full h-40 rounded-3xl overflow-hidden border-2 border-gray-100 bg-gray-50 flex items-center justify-center">
                <img src={preview} alt="Preview" className="h-28 w-28 object-contain drop-shadow-md" />
                <button 
                  onClick={clearImage}
                  className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <FiX size={14} />
                </button>
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur text-white px-3 py-1.5 rounded-full text-[9px] font-black uppercase flex items-center gap-2">
                  <FiCheckCircle className="text-green-400" /> {file ? "New File" : "Current"}
                </div>
              </div>
            )}
          </div>

          {/* Save Button */}
          <button 
            onClick={handleSave}
            disabled={loading || !name.trim()}
            className="w-full bg-black text-[#bd8b31] py-5 rounded-2xl font-black uppercase tracking-[0.2em] active:scale-[0.98] transition-all disabled:opacity-20 flex items-center justify-center gap-3"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-[#bd8b31] border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              editData ? "Update Category" : "Add Category"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCategoryModal;