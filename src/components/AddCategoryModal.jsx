"use client";

import React, { useState, useContext, useEffect } from "react";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firestore"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import { MiscImagesContext } from "@/components/context/MiscContext"; 
import { FiX, FiCheckCircle, FiImage } from "react-icons/fi";

// Added editData prop to handle existing category modifications
function AddCategoryModal({ isOpen, onClose, onRefresh, parentCategory, editData = null }) {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [miscImages, setmiscImages] = useContext(MiscImagesContext);

  // Sync state when modal opens for editing
  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setName(editData.name || "");
        setPreview(editData.image || null);
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
      setPreview(URL.createObjectURL(selectedFile));
      setmiscImages([selectedFile]); 
    }
  };

  const clearImage = () => {
    setFile(null);
    setPreview(null);
    setmiscImages([]);
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    
    setLoading(true);
    // If editing, start with the existing image URL
    let imageUrl = editData?.image || "";

    try {
      // 1. Upload new file if selected
      if (file) {
        const storageRef = ref(storage, `subcategory_icons/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(snapshot.ref);
      }
      
      if (editData?.id) {
        // 2. UPDATE MODE
        const categoryRef = doc(db, "subcategories", editData.id);
        await updateDoc(categoryRef, {
          name: name.trim(),
          image: imageUrl,
          updatedAt: new Date(),
        });
      } else {
        // 3. CREATE MODE
        const finalParent = parentCategory || "electronics";
        await addDoc(collection(db, "subcategories"), {
          name: name.trim(),
          parentCategory: finalParent,
          image: imageUrl,
          createdAt: new Date(),
        });
      }

      setName("");
      clearImage();
      onRefresh(); 
      onClose();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("System error: Could not save category changes.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10">
        
        {/* Modal Header */}
        <div className="bg-[#bd8b31] p-6 text-white flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="text-xl font-black uppercase tracking-tighter">
              {editData ? "Edit Category" : "New Category"}
            </h2>
            <span className="text-[10px] font-bold opacity-80 tracking-widest uppercase">
              Target: {editData?.parentCategory || parentCategory || 'electronics'}
            </span>
          </div>
          <button onClick={onClose} className="hover:rotate-90 transition-transform bg-white/20 p-2 rounded-full">
            <FiX size={18} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Category Name
            </label>
            <input 
              placeholder="e.g. Helmets, Vests, Laptops" 
              className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-[#bd8b31] text-gray-900 font-bold transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Category Icon
            </label>
            {!preview ? (
              <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 hover:border-[#bd8b31] transition-all group">
                <FiImage size={28} className="text-gray-300 group-hover:text-[#bd8b31] mb-2" />
                <span className="text-xs font-bold text-gray-400 group-hover:text-[#bd8b31]">Select Icon Image</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            ) : (
              <div className="relative w-full h-36 rounded-2xl overflow-hidden border-2 border-gray-100 bg-gray-50 flex items-center justify-center">
                <img src={preview} alt="Preview" className="h-24 w-24 object-contain" />
                <button 
                  onClick={clearImage}
                  className="absolute top-3 right-3 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <FiX size={14} />
                </button>
                <div className="absolute bottom-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase flex items-center gap-1.5 shadow-md">
                  <FiCheckCircle /> {file ? "New image ready" : "Existing image"}
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={handleSave}
            disabled={loading || !name.trim()}
            className="w-full bg-black text-[#bd8b31] py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-black/10 active:scale-[0.97] transition-all disabled:opacity-30 flex items-center justify-center gap-3"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-[#bd8b31] border-t-transparent rounded-full animate-spin" />
            ) : (
              editData ? "Save Changes" : "Create Category"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCategoryModal;