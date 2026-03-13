"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronDown, FaChevronUp, FaShieldAlt } from "react-icons/fa";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; 
import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firestore"; 
import { useI18n } from "@/i18n/I18nContext";
import AddCategoryModal from "@/components/AddCategoryModal";
import FirebaseImage from "@/components/FirebaseImage";

const SafetySubcategories = () => {
  const { t } = useI18n(); 
  const { data: session } = useSession();
  const [isExpanded, setIsExpanded] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  
  const router = useRouter();

  const fetchRealSubs = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "subcategories"), 
        where("parentCategory", "==", "safety")
      );
      const snap = await getDocs(q);
      const fetchedSubs = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubcategories(fetchedSubs);
    } catch (error) {
      console.error("Error fetching safety subcategories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isExpanded && subcategories.length === 0) {
      fetchRealSubs();
    }
  }, [isExpanded, subcategories.length]);

  const handleRedirect = (id) => {
    router.push(`/miscType/safety?type=${id}`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (confirm("Delete this category? This cannot be undone.")) {
      try {
        await deleteDoc(doc(db, "subcategories", id));
        setSubcategories(prev => prev.filter(item => item.id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const openEditModal = (e, subcat) => {
    e.stopPropagation();
    setEditData(subcat);
    setIsModalOpen(true);
  };

  return (
    <section className="w-full space-y-4 px-2">
      <AddCategoryModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        onRefresh={fetchRealSubs}
        parentCategory="safety"
        editData={editData}
      />

      {/* HERO CARD */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative h-[160px] w-full cursor-pointer rounded-[2.5rem] overflow-hidden shadow-2xl group transition-all duration-500 hover:scale-[1.01]"
      >
        <Image
          fill
          src="https://i.ibb.co/rGC9q5pk/Safety.jpg"
          alt="Safety Equipment"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-[#bd8b31]/10 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 text-center px-4">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-2 italic">
            {t("home.categories.safety", "Safety Gear")}
          </h2>
          
          <div className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all group-hover:bg-[#bd8b31] group-hover:text-white shadow-xl">
            <span>{isExpanded ? "View Less" : "View More"}</span>
            {isExpanded ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
          </div>
        </div>
      </div>

      {/* DYNAMIC ICON GRID */}
      {isExpanded && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 pt-4 animate-in fade-in slide-in-from-top-4 duration-500">
          {loading ? (
             [1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 animate-pulse rounded-[2rem]" />
             ))
          ) : subcategories.length > 0 ? (
            subcategories.map((subcat) => (
              <div key={subcat.id} className="relative group flex flex-col items-center">
                
                {/* ADMIN ACTIONS OVERLAY - Boosted z-index */}
                {session?.user?.isAdmin && (
                  <div className="absolute top-2 right-2 z-30 flex gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <button 
                      onClick={(e) => openEditModal(e, subcat)}
                      className="p-2 bg-white/95 backdrop-blur shadow-xl rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <FiEdit2 size={10} />
                    </button>
                    <button 
                      onClick={(e) => handleDelete(e, subcat.id)}
                      className="p-2 bg-white/95 backdrop-blur shadow-xl rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-all"
                    >
                      <FiTrash2 size={10} />
                    </button>
                  </div>
                )}

                <button
                  onClick={() => handleRedirect(subcat.id)}
                  className="w-full flex flex-col items-center"
                >
                  {/* Updated Container: Removed padding and changed to object-cover */}
                  <div className="relative w-full aspect-square bg-white rounded-[2rem] border-2 border-gray-50 flex items-center justify-center overflow-hidden shadow-sm transition-all group-hover:border-[#bd8b31] group-hover:shadow-lg group-hover:-translate-y-1 active:scale-95">
                    {subcat.image || subcat.imageUrl ? (
                      <FirebaseImage
                        src={subcat.image || subcat.imageUrl}
                        path={subcat.imagePath}
                        alt={subcat.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        fallback={<FaShieldAlt className="text-gray-200 text-3xl group-hover:text-[#bd8b31]/20 transition-colors" />}
                      />
                    ) : (
                      <FaShieldAlt className="text-gray-200 text-3xl group-hover:text-[#bd8b31]/20 transition-colors" />
                    )}
                    {/* Hover Overlay for better contrast */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>

                  <span className="mt-3 text-[9px] font-black text-gray-500 uppercase tracking-tighter text-center leading-tight group-hover:text-black">
                    {subcat.name}
                  </span>
                </button>
              </div>
            ))
          ) : null}
        </div>
      )}
    </section>
  );
};

export default SafetySubcategories;