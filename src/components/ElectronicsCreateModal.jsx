"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  FaChevronDown, 
  FaChevronUp, 
  FaMobileAlt, 
  FaLaptop, 
  FaHeadphones, 
  FaTv, 
  FaPlug,
  FaQuestionCircle 
} from "react-icons/fa";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firestore"; // Adjust path to your firebase config
import { useRouter } from "next/navigation";

// 1. THE ICON MAPPER (Keep this outside the component function)
const ICON_MAP = {
  FaMobileAlt: <FaMobileAlt />,
  FaLaptop: <FaLaptop />,
  FaHeadphones: <FaHeadphones />,
  FaTv: <FaTv />,
  FaPlug: <FaPlug />,
};

const getIcon = (name) => ICON_MAP[name] || <FaQuestionCircle />;

const ElectronicsSubcategories = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  // 2. FETCH FROM FIREBASE
  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const q = query(
          
          collection(db, "subcategories"), 
          where("parentCategory", "==", "electronics")
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSubcategories(data);
      } catch (err) {
        console.error("Error fetching subcategories:", err);
      }
    };
    fetchSubs();
  }, []);

  return (
    <section className="w-full space-y-4">
      {/* HERO CARD (Maintains your style) */}
      <div onClick={() => setIsExpanded(!isExpanded)} className="...">
         {/* ... Your existing Hero Image code ... */}
      </div>

      {/* DYNAMIC SUBCATEGORY ROW */}
      {isExpanded && (
        <div className="flex flex-wrap items-start gap-4 pt-2">
          {subcategories.map((subcat) => (
            <button
              key={subcat.id}
              onClick={() => router.push(`/electronics?subcategory=${subcat.id}`)}
              className="flex flex-col items-center gap-2 w-[70px] sm:w-[85px] group"
            >
              <div className="w-full aspect-square flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100 group-hover:border-blue-200 transition-all text-2xl">
                {/* 3. USING THE MAPPER HERE */}
                {getIcon(subcat.iconName)} 
              </div>

              <span className="text-[10px] font-bold text-gray-500 uppercase text-center leading-tight">
                {subcat.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default ElectronicsSubcategories;