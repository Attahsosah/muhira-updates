"use client";

import React, { useContext, useState, useEffect, useRef } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firestore"; // Ensure 'storage' is exported from your config
import { 
  ElectronicsOpenContext, 
  TaskContext,
  ElectronicsTitleContext, 
  ElectronicsPriceContext, 
  ElectronicsSubcategoryContext, 
  ElectronicsDescriptionContext,
  ElectronicsImagesContext 
} from "./context/CrudContext";
import { FaCloudUploadAlt, FaTimesCircle } from "react-icons/fa";

function CreateElectronic() {
  const [isOpen, setIsOpen] = useContext(ElectronicsOpenContext);
  const [task] = useContext(TaskContext);
  const fileInputRef = useRef(null);

  // Form Fields
  const [title, setTitle] = useContext(ElectronicsTitleContext);
  const [price, setPrice] = useContext(ElectronicsPriceContext);
  const [subcategory, setSubcategory] = useContext(ElectronicsSubcategoryContext);
  const [description, setDescription] = useContext(ElectronicsDescriptionContext);
  const [images, setImages] = useContext(ElectronicsImagesContext); // This will hold the URLs

  const [dbSubcategories, setDbSubcategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1. Handle File Selection & Immediate Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `electronics/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Upload failed:", error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImages((prev) => [...prev, downloadURL]); // Add URL to context array
          setUploading(false);
        });
      }
    );
  };

  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  // ... (fetchSubs and handleClose logic remains the same) ...
  useEffect(() => {
    const fetchSubs = async () => {
      const q = query(collection(db, "subcategories"), where("parentCategory", "==", "electronics"));
      const snapshot = await getDocs(q);
      setDbSubcategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    if (isOpen && task === "create") fetchSubs();
  }, [isOpen, task]);

  const handleClose = () => {
    setIsOpen(false);
    setTitle(""); setPrice(""); setSubcategory(""); setDescription(""); setImages([]);
  };

  const handleSave = async () => {
    if (!title || !price || !subcategory) return alert("Required fields missing!");
    setLoading(true);
    try {
      await addDoc(collection(db, "electronics"), {
        title,
        price: Number(price),
        subcategory,
        description,
        images: images, // The array of Firebase Storage URLs
        createdAt: new Date(),
      });
      handleClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || task !== "create") return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl my-8">
        
        <div className="bg-[#F75D34] p-6 text-white flex justify-between items-center">
          <h2 className="text-2xl font-bold">New Product Details</h2>
          <button onClick={handleClose}>✕</button>
        </div>

        <div className="p-8 space-y-6">
          {/* IMAGE UPLOAD SECTION */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Product Images</label>
            
            <div className="flex flex-wrap gap-4">
              {/* Image Previews */}
              {images.map((url, index) => (
                <div key={index} className="relative w-24 h-24 rounded-xl overflow-hidden border">
                  <img src={url} alt="preview" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 text-red-500 bg-white rounded-full"
                  >
                    <FaTimesCircle size={18} />
                  </button>
                </div>
              ))}

              {/* Upload Trigger */}
              <button 
                onClick={() => fileInputRef.current.click()}
                disabled={uploading}
                className="w-24 h-24 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-orange-400 hover:text-orange-400 transition-all"
              >
                {uploading ? <div className="animate-spin h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full" /> : <FaCloudUploadAlt size={24} />}
                <span className="text-[10px] font-bold mt-1">{uploading ? "Uploading" : "Add Photo"}</span>
              </button>
            </div>
            
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-bold text-gray-400 uppercase">Title</label>
              <input className="w-full border-2 border-gray-100 p-3 rounded-xl" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Price</label>
              <input type="number" className="w-full border-2 border-gray-100 p-3 rounded-xl" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Category</label>
              <select className="w-full border-2 border-gray-100 p-3 rounded-xl bg-white" value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                <option value="">Select Category</option>
                {dbSubcategories.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 flex justify-end gap-3 rounded-b-3xl">
          <button onClick={handleClose} className="px-6 py-2 font-bold text-gray-400">Cancel</button>
          <button 
            onClick={handleSave} 
            disabled={loading || uploading}
            className="bg-[#F75D34] text-white px-10 py-2 rounded-xl font-bold disabled:opacity-50"
          >
            {loading ? "Saving..." : "Create Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateElectronic;