"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firestore"; 

const SafetySubcategories = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch real subcategories from Firestore where parent is 'safety'
  useEffect(() => {
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
        console.error("Error fetching real safety subcategories:", error);
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
    <section className="w-full space-y-4">
      {/* HERO CARD */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative h-[180px] w-full cursor-pointer rounded-3xl overflow-hidden shadow-xl group transition-all duration-500 hover:scale-[1.01]"
      >
        <Image
          fill
          src="https://i.ibb.co/rGC9q5pk/Safety.jpg"
          alt="Safety Equipment"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 text-center px-4">
          <span className="text-[10px] bg-[#bd8b31] text-white px-3 py-1 rounded-full font-black uppercase tracking-widest mb-2 animate-pulse">
            Workplace Protection
          </span>
          
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-1">
            Safety Gear
          </h2>
          
          <div className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all group-hover:bg-[#bd8b31] group-hover:text-white shadow-lg">
            <span>{isExpanded ? "View Less" : "Explore Safety"}</span>
            {isExpanded ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
          </div>
        </div>
      </div>

      {/* DYNAMIC REAL SUBCATEGORY GRID */}
      {isExpanded && (
        <div className="flex flex-wrap items-start justify-center gap-3 pt-2 animate-in fade-in slide-in-from-top-4 duration-500">
          {loading ? (
             <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 w-20 bg-gray-100 animate-pulse rounded-xl" />
                ))}
             </div>
          ) : subcategories.length > 0 ? (
            subcategories.map((subcat) => (
              <button
                key={subcat.id}
                onClick={() => handleRedirect(subcat.id)}
                className="bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm hover:border-[#bd8b31] hover:shadow-md transition-all group"
              >
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover:text-black">
                  {subcat.name}
                </span>
              </button>
            ))
          ) : (
            <p className="text-[10px] font-black uppercase text-gray-400">No categories listed yet</p>
          )}
        </div>
      )}
    </section>
  );
};

export default SafetySubcategories;