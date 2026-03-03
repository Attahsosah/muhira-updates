"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Using react-icons
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n/I18nContext";

const subcategories = [
  { id: "mobile-phones", nameKey: "electronics.mobile", defaultName: "Mobile Phones", image: 'https://i.ibb.co/M5xTb8bp/subcat-mobile-phones.jpg' },
  { id: "computers", nameKey: "electronics.computers", defaultName: "Computers", image: 'https://i.ibb.co/Xkkm4Cmq/subcat-computers.jpg' },
  { id: "audio", nameKey: "electronics.audio", defaultName: "Audio", image: 'https://i.ibb.co/SXbkLYPW/subcat-audio.jpg' },
  { id: "tvs", nameKey: "electronics.tvs", defaultName: "TVs", image: 'https://i.ibb.co/MyXpZc79/subcat-tvs.jpg' },
  { id: "accessories", nameKey: "electronics.accessories", defaultName: "Accessories", image: 'https://i.ibb.co/4RX8Z79r/subcat-accessories.jpg' },
];

const ElectronicsSubcategories = () => {
  const { t } = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleRedirect = (id) => {
    router.push(`/misc?type=${id}`);
  };

  return (
    <section className="w-full space-y-4 px-2">
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
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 text-center px-4">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-1">
            {t("electronics.title", "Electronics")}
          </h2>
          
          <div className="flex items-center gap-2 bg-white text-black animate-pulse px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all group-hover:bg-[#bd8b31] group-hover:text-white">
            <span>
                {isExpanded 
                    ? t("electronics.viewLess", "View Less") 
                    : t("electronics.viewMore", "View More")}
            </span>
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
            transition={{ duration: 0.4 }}
            className="grid grid-cols-3 sm:flex sm:flex-wrap items-start justify-center gap-4 pt-4"
          >
            {subcategories.map((subcat, i) => (
              <motion.button
                key={subcat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => handleRedirect(subcat.id)}
                className="flex flex-col items-center gap-2 group mb-2"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-sm border border-gray-100 group-hover:border-[#bd8b31] group-hover:shadow-lg transition-all duration-300">
                  <img
                    src={subcat.image}
                    alt={subcat.defaultName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase text-center leading-tight tracking-widest group-hover:text-black transition-colors">
                  {t(subcat.nameKey, subcat.defaultName)}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ElectronicsSubcategories;