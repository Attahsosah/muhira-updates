"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ElectronicsSubcategories = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const subcategories = [
    { id: "mobile-phones", name: "Mobile Phones", icon: "📱" },
    { id: "computers", name: "Computers", icon: "💻" },
    { id: "audio", name: "Audio", icon: "🎧" },
    { id: "tvs", name: "TVs", icon: "📺" },
    { id: "accessories", name: "Accessories", icon: "🔌" },
  ];

  const handleRedirect = (id) => {
    router.push(`/misc?type=${id}`);
  };

  return (
    <section className="w-full space-y-4 px-2">
      {/* HERO CARD WITH CALL TO ACTION */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative h-[180px] w-full cursor-pointer rounded-3xl overflow-hidden shadow-xl group transition-all duration-500 hover:scale-[1.01]"
      >
        <Image
          fill
          src="https://i.ibb.co/2YtkYYJs/Electronics.jpg"
          alt="Electronics"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 text-center px-4">
          {/* <span className="text-[10px] bg-[#bd8b31] text-white px-3 py-1 rounded-full font-black uppercase tracking-widest mb-2 ">
            New Tech Arrivals
          </span> */}
          
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-1">
            Electronics
          </h2>
          
          
          <div className="flex items-center gap-2 bg-white text-black animate-pulse px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all group-hover:bg-[#bd8b31] group-hover:text-white">
            <span>{isExpanded ? "View Less" : "View More"}</span>
            {isExpanded ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
          </div>
        </div>
      </div>

      {/* DYNAMIC SUBCATEGORY ROW */}
      {isExpanded && (
        <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-start justify-center gap-4 pt-4 animate-in fade-in slide-in-from-top-4 duration-500">
          {subcategories.map((subcat) => (
            <button
              key={subcat.id}
              onClick={() => handleRedirect(subcat.id)}
              className="flex flex-col items-center gap-2 group mb-2"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100 group-hover:border-[#bd8b31] group-hover:shadow-lg group-hover:shadow-[#bd8b31]/20 transition-all duration-300 text-3xl">
                <span className="group-hover:scale-125 transition-transform duration-300">
                    {subcat.icon}
                </span>
              </div>
              <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase text-center leading-tight tracking-widest group-hover:text-black transition-colors">
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