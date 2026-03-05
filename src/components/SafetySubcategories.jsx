"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronDown, FaChevronUp, FaShieldAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firestore"; 
import { useI18n } from "@/i18n/I18nContext";

const SafetySubcategories = () => {
  const { t } = useI18n(); 
  const [isExpanded, setIsExpanded] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchRealSubs = async () => {
      setLoading(true);
      try {
        // Ensure this matches the parentCategory you set in the AddCategoryModal
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

    if (isExpanded && subcategories.length === 0) {
      fetchRealSubs();
    }
  }, [isExpanded, subcategories.length]);

  const handleRedirect = (id) => {
    router.push(`/miscType/safety?type=${id}`);
  };

  return (
    <section className="w-full space-y-4 px-2">
      {/* HERO CARD */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative h-[160px] w-full cursor-pointer rounded-[2.5rem] overflow-hidden shadow-2xl group transition-all duration-500 hover:scale-[1.01] border-4 border-white"
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
            <span>
              {isExpanded 
                ? t("electronics.viewLess", "View Less") 
                : t("electronics.viewMore", "View More")}
            </span>
            {isExpanded ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
          </div>
        </div>
      </div>

      {/* DYNAMIC ICON GRID */}
      {isExpanded && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 pt-4 animate-in fade-in slide-in-from-top-4 duration-500">
          {loading ? (
             <>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-gray-100 animate-pulse rounded-[2rem]" />
                ))}
             </>
          ) : subcategories.length > 0 ? (
            subcategories.map((subcat) => {
              // Extract the image URL (checking both 'image' and 'imageUrl' just in case)
              const displayImage = subcat.image || subcat.imageUrl;

              return (
                <button
                  key={subcat.id}
                  onClick={() => handleRedirect(subcat.id)}
                  className="flex flex-col items-center group"
                >
                  <div className="relative w-full aspect-square bg-white rounded-[2rem] border-2 border-gray-50 flex items-center justify-center overflow-hidden shadow-sm transition-all group-hover:border-[#bd8b31] group-hover:shadow-lg group-hover:-translate-y-1 active:scale-95">
                    {displayImage ? (
                      <img 
                        src={displayImage} 
                        alt={subcat.name} 
                        className="w-full h-full object-contain p-4" 
                        onError={(e) => { e.target.style.display = 'none'; }} // Hide if link is broken
                      />
                    ) : (
                      <FaShieldAlt className="text-gray-200 text-3xl group-hover:text-[#bd8b31]/20 transition-colors" />
                    )}
                  </div>

                  <span className="mt-3 text-[9px] font-black text-gray-500 uppercase tracking-tighter text-center leading-tight group-hover:text-black">
                    {subcat.name}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="col-span-full py-10 text-center">
               <p className="text-[10px] font-black uppercase text-gray-300 tracking-widest">
                  {t("search.noItems", "No categories listed yet")}
               </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default SafetySubcategories;