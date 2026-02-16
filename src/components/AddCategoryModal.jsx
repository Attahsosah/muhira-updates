"use client";

import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firestore";

// Added parentCategory to the destructured props
function AddCategoryModal({ isOpen, onClose, onRefresh, parentCategory }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;
    
    // Safety check: if parentCategory is missing, default to electronics 
    // or prevent saving to avoid "orphaned" categories.
    const finalParent = parentCategory || "electronics";

    setLoading(true);
    try {
      await addDoc(collection(db, "subcategories"), {
        name: name.trim(),
        parentCategory: finalParent, // Now dynamic!
        createdAt: new Date(),
      });
      setName("");
      onRefresh(); 
      onClose();
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-[#bd8b31] p-4 text-white flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="font-bold uppercase tracking-tight">New Category</h2>
            <span className="text-[10px] opacity-80">Adding to: {parentCategory}</span>
          </div>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">✕</button>
        </div>
        <div className="p-6 space-y-4">
          <label className="text-xs font-bold text-gray-400 uppercase">Category Name</label>
          <input 
            placeholder="e.g. Billboards, Helmets, Laptops" 
            className="w-full bg-gray-50 border-2 border-gray-100 p-3 rounded-xl outline-none focus:border-[#bd8b31] text-gray-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <button 
            onClick={handleSave}
            disabled={loading || !name.trim()}
            className="w-full bg-[#bd8b31] text-white py-3 rounded-xl font-bold disabled:opacity-50 shadow-lg shadow-[#bd8b31]/20 active:scale-[0.98] transition-all"
          >
            {loading ? "Saving..." : "Create Category"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCategoryModal;