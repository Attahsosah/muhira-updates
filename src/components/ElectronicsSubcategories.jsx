"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiChevronDown, FiChevronUp, FiEdit2, FiTrash2 } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firestore";
import { useI18n } from "@/i18n/I18nContext";
import AddCategoryModal from "@/components/AddCategoryModal";
import FirebaseImage from "@/components/FirebaseImage";

const ElectronicsSubcategories = () => {
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
        where("parentCategory", "==", "electronics")
      );
      const snap = await getDocs(q);
      const fetchedSubs = snap.docs.map(d => {
        const data = d.data();
        return { 
          id: d.id, 
          ...data,
          // Support all possible field naming conventions for the URL
          displayImage: data.imageUrl || data.image || "" 
        };
      });
      setSubcategories(fetchedSubs);
    } catch (error) {
      console.error("Error fetching electronics subcategories:", error);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch whenever the section expands to ensure admin changes are visible
  useEffect(() => {
    if (isExpanded) {
      fetchRealSubs();
    }
  }, [isExpanded]);

  const handleRedirect = (id) => {
    router.push(`/misc?type=${id}`);
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
        parentCategory="electronics"
        editData={editData}
      />

      {/* HERO CARD */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative h-[180px] w-full cursor-pointer rounded-3xl overflow-hidden shadow-xl group transition-all duration-500 hover:scale-[1.01]"
      >
        <Image
          fill
          src="https://i.ibb.co/2YtkYYJs/Electronics.jpg"
          alt="Electronics"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 text-center px-4">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-1">
            {t("electronics.title", "Electronics")}
          </h2>
          <div className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all group-hover:bg-[#bd8b31] group-hover:text-white">
            <span>{isExpanded ? "View Less" : "View More"}</span>
            {isExpanded ? <FiChevronUp size={10} /> : <FiChevronDown size={10} />}
          </div>
        </div>
      </div>

      {/* SUBCATEGORY GRID */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="grid grid-cols-3 sm:flex sm:flex-wrap items-start justify-center gap-4 pt-4"
          >
            {loading ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 animate-pulse rounded-2xl" />
              ))
            ) : (
              subcategories.map((subcat, i) => (
                <motion.div
                  key={subcat.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative flex flex-col items-center gap-2 group mb-4"
                >
                  {session?.user?.isAdmin && (
                    <div className="absolute -top-1 -right-1 z-30 flex gap-1 opacity-0 group-hover:opacity-100 transition-all scale-75 sm:scale-100">
                      <button
                        onClick={(e) => openEditModal(e, subcat)}
                        className="p-1.5 bg-white shadow-xl rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <FiEdit2 size={12} />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, subcat.id)}
                        className="p-1.5 bg-white shadow-xl rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-all"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => handleRedirect(subcat.id)}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-sm border border-gray-100 group-hover:border-[#bd8b31] group-hover:shadow-lg transition-all duration-300 bg-white">
                      <FirebaseImage
                        // Keyed by ID + ImageURL to force reset on edit
                        key={`${subcat.id}-${subcat.displayImage}`}
                        src={subcat.displayImage}
                        path={subcat.imagePath} 
                        alt={subcat.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        fallback={
                          <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300 text-xl">📱</div>
                        }
                      />
                    </div>
                    <span className="text-[9px] font-black text-gray-500 uppercase text-center leading-tight tracking-tighter group-hover:text-black w-16 sm:w-20 truncate">
                      {subcat.name}
                    </span>
                  </button>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ElectronicsSubcategories;