"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "../components/ScrollReveal";
import ElectronicsSubcategories from "./ElectronicsSubcategories";
import AdvertisingSubcategories from "./AdvertisingSubcategories";
import SafetySubcategories from "./SafetySubcategories";
import { useI18n } from "@/i18n/I18nContext";

const Categories = () => {
  const { t } = useI18n();

  return (
    <div id="categories" className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {/* Electronics Section */}
          <ScrollReveal>
            <ElectronicsSubcategories />
          </ScrollReveal>

          {/* Advertising Equipment Section - Commented out */}
          {/* <ScrollReveal>
            <AdvertisingSubcategories />
          </ScrollReveal> 
          */}

          {/* Safety Equipment Section */}
          <ScrollReveal>
            <SafetySubcategories />
          </ScrollReveal>

          {/* Procurement Assistance Section */}
          <ScrollReveal>
            <Link href="/procurement">
              <div className="relative h-[180px] w-full cursor-pointer rounded-3xl overflow-hidden shadow-xl group transition-all duration-500 hover:scale-[1.01]">
                <Image
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
                  alt="Procurement Assistance"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 text-center px-4">
                  <h2 className="text-2xl font-black uppercase tracking-tighter mb-1">
                    {t("home.categories.procurement", "Procurement Assistance")}
                  </h2>
                  <div className="mt-2 bg-[#bd8b31] text-[9px] px-3 py-1 mb-2 font-black rounded-full uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">
                    {t("home.categories.procurementCTA", "Sourcing Solutions →")}
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Website Development */}
          <ScrollReveal>
            <Link href="/dev">
              <div className="relative h-[180px] w-full cursor-pointer rounded-3xl overflow-hidden shadow-xl group transition-all duration-500 hover:scale-[1.01]">
                <Image
                  src="https://i.ibb.co/Kcdrttjs/webdev.jpg"
                  alt="Website Development"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 text-center px-4">
                  <h2 className="text-2xl font-black uppercase tracking-tighter mb-1">
                    {t("home.categories.webdev", "Web Development")}
                  </h2>
                  <div className="mt-2 bg-[#bd8b31] text-[9px] px-3 py-1 mb-2 font-black rounded-full uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">
                    {t("home.categories.webdevCTA", "Build Your Vision →")}
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