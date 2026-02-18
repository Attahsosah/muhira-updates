import React from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "../components/ScrollReveal";
import ElectronicsSubcategories from "./ElectronicsSubcategories";
import AdvertisingSubcategories from "./AdvertisingSubcategories";
import SafetySubcategories from "./SafetySubcategories";

const Categories = () => {
  return (
    <div id="categories" className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-7xl">
        {/* Adjusted gap to 10 to allow room for expanded subcategory grids */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {/* Electronics Section */}
          <ScrollReveal>
            <ElectronicsSubcategories />
          </ScrollReveal>

          {/* Advertising Equipment Section */}
          <ScrollReveal>
            <AdvertisingSubcategories />
          </ScrollReveal>

          {/* Safety Equipment Section */}
          <ScrollReveal>
            <SafetySubcategories />
          </ScrollReveal>

          {/* Website Development - Kept as a direct link as it's a separate service */}
          <ScrollReveal>
            <Link href="/dev">
              <div className="relative h-[180px] w-full cursor-pointer rounded-3xl overflow-hidden shadow-xl group transition-all duration-500 hover:scale-[1.01]">
                <Image
                  src="https://i.ibb.co/tJJGx8m/pexels-junior-teixeira-1064069-2047905.jpg"
                  alt="Website Development"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 text-center px-4">
                   <span className="text-[10px] bg-[#bd8b31] text-white px-3 py-1 rounded-full font-black uppercase tracking-widest mb-2">
                    Digital Services
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tighter mb-1">
                    Web Development
                  </h2>
                  <div className="mt-2 text-[9px] font-black uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">
                    Build Your Vision →
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>

        </div>
      </div>
    </div>
  );
};

export default Categories;