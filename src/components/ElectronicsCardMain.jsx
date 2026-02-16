"use client";

import React, { useContext } from 'react';
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../../firestore";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { 
  ElectronicsOpenContext, 
  TaskContext, 
  ElectronicsIdContext,
  ElectronicsTitleContext,
  ElectronicsPriceContext,
  ElectronicsSubcategoryContext,
  ElectronicsDescriptionContext,
  ElectronicsImagesContext,
  ElectronicsSpecsContext,
  ElectronicsDiscountContext,
  ElectronicsFeaturedContext,
  ElectronicsOfferContext,
  ElectronicsWasContext
} from './context/CrudContext';

function ElectronicsCardMain({ electronic, id }) {
  const { data: session } = useSession();

  // Context Setters (For Admin Modal)
  const [, setOpen] = useContext(ElectronicsOpenContext);
  const [, setTask] = useContext(TaskContext);
  const [, setDocId] = useContext(ElectronicsIdContext);
  const [, setTitle] = useContext(ElectronicsTitleContext);
  const [, setPrice] = useContext(ElectronicsPriceContext);
  const [, setSubcategory] = useContext(ElectronicsSubcategoryContext);
  const [, setDescription] = useContext(ElectronicsDescriptionContext);
  const [, setImages] = useContext(ElectronicsImagesContext);
  const [, setSpecs] = useContext(ElectronicsSpecsContext);
  const [, setDiscount] = useContext(ElectronicsDiscountContext);
  const [, setFeatured] = useContext(ElectronicsFeaturedContext);
  const [, setOffer] = useContext(ElectronicsOfferContext);
  const [, setWas] = useContext(ElectronicsWasContext);

  const loadAdminContext = () => {
    setDocId(id);
    setTitle(electronic.title || "");
    setPrice(electronic.price || "");
    setSubcategory(electronic.subcategory || "");
    setDescription(electronic.description || "");
    setImages(electronic.images || []); 
    setDiscount(electronic.discount || "");
    setFeatured(electronic.featured ?? true);
    setOffer(electronic.offer ?? true);
    setWas(electronic.was || "");
    setSpecs(electronic.specifications && electronic.specifications.length > 0 
      ? electronic.specifications 
      : [{ key: "", value: "" }]
    );
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    loadAdminContext();
    setTask("update");
    setOpen(true);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const confirmDelete = window.confirm(`Permanently delete "${electronic.title}"?`);
    if (confirmDelete) {
      try {
        if (electronic.images && electronic.images.length > 0) {
          const deletePromises = electronic.images.map((url) => {
            const imgRef = ref(storage, url);
            return deleteObject(imgRef).catch(() => console.log("Storage item already gone"));
          });
          await Promise.all(deletePromises);
        }
        await deleteDoc(doc(db, "electronics", id));
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  if (!electronic) return <div className="h-40 md:h-64 w-full bg-gray-50 animate-pulse rounded-2xl" />;

  return (
    <div className="group relative bg-white w-full rounded-xl md:rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      
      {/* IMAGE SECTION */}
      <div className="relative h-40 md:h-64 w-full bg-[#f8f9fa] overflow-hidden flex items-center justify-center p-2 md:p-4">
        {electronic.images && electronic.images.length > 0 ? (
          <img 
            src={electronic.images[0]} 
            alt={electronic.title} 
            className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">No Image</div>
        )}
        
        {session && (
          <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <button onClick={handleEdit} className="p-2 md:p-3 bg-white text-blue-600 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all">
              <FaEdit className="w-3 h-3 md:w-4 md:h-4" />
            </button>
            <button onClick={handleDelete} className="p-2 md:p-3 bg-white text-red-600 rounded-full shadow-lg hover:bg-red-600 hover:text-white transition-all">
              <FaTrashAlt className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="p-3 md:p-5 flex flex-col flex-grow">
        {/* 1. TITLE (Priority #1) */}
        <h3 className="text-gray-900 font-extrabold text-sm md:text-lg line-clamp-2 leading-tight mb-1">
          {electronic.title}
        </h3>

        {/* 2. SUBCATEGORY (Visual Tag) */}
        <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-[8px] md:text-[9px] w-fit font-black text-orange-500 uppercase tracking-tighter bg-orange-50 px-1.5 py-0.5 rounded">
                {electronic.subcategory || "Electronics"}
            </span>
        </div>
        
        {/* 3. PRICE (Using brand color for emphasis) */}
        <div className="flex items-baseline gap-2 mb-3">
          <p className="text-sm md:text-base font-bold text-[#bd8b31]">
            BIF {Number(electronic.price).toLocaleString()}
          </p>
          {electronic.was && (
            <p className="text-[10px] md:text-xs text-gray-400 line-through">
              BIF {Number(electronic.was).toLocaleString()}
            </p>
          )}
        </div>
        
        {/* 4. DESCRIPTION (Shortened to keep card compact) */}
        <p className="hidden md:block text-gray-500 text-xs line-clamp-2 mb-6 flex-grow leading-relaxed">
          {electronic.description}
        </p>

        {/* 5. BUTTON */}
        <Link 
          href={`/electronics/${id}`}
          style={{ backgroundColor: '#bd8b31' }}
          className="w-full py-2 md:py-3 mt-auto text-white rounded-lg md:rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center justify-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ElectronicsCardMain;