"use client";

import React, { useContext, useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react"; // Added for admin check
import ElectronicsCardsMain from "@/components/ElectronicsCardsMain";
import Navbar from "@/components/Navbar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firestore";
import { FaSearch, FaSlidersH, FaPlus } from "react-icons/fa";

import { SelectedTypeContext } from "@/components/context/MiscContext";
import { ElectronicsDataContext } from "@/components/context/CrudContext";
import ElectronicsUpdateModal from "@/components/ElectronicsUpdateModal";
import AddCategoryModal from "@/components/AddCategoryModal"; // NEW MODAL

function MiscContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const typeFromUrl = searchParams.get("type");
  
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useContext(SelectedTypeContext);
  const [electronics, setElectronics] = useContext(ElectronicsDataContext);
  const [dbSubcategories, setDbSubcategories] = useState([]);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false); // NEW STATE

  useEffect(() => {
    if (typeFromUrl) setSelectedType(typeFromUrl);
  }, [typeFromUrl, setSelectedType]);

  // Wrapped in a named function so it can be passed to the modal for refreshing
  const fetchSubs = async () => {
    const q = query(collection(db, "subcategories"), where("parentCategory", "==", "electronics"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDbSubcategories(data);
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  useEffect(() => {
    const fetchElectronics = async () => {
      const snapshot = await getDocs(collection(db, "electronics"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setElectronics(data);
    };
    fetchElectronics();
  }, [setElectronics]);

  const filteredElectronics = useMemo(() => {
    return electronics.filter((item) => {
      const matchesSearch = item.title?.toLowerCase().includes(search.toLowerCase());
      if (!selectedType || selectedType === "") return matchesSearch;
      const matchesType = item.subcategory === selectedType;
      return matchesSearch && matchesType;
    });
  }, [electronics, search, selectedType]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ElectronicsUpdateModal />
      
      {/* NEW CATEGORY MODAL */}
      <AddCategoryModal 
        isOpen={isCatModalOpen} 
        onClose={() => setIsCatModalOpen(false)} 
        onRefresh={fetchSubs} 
      />

      {/* 1. STATIC HEADER */}
      <div className="bg-white pt-28 pb-4">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Misc <span className="text-orange-500">&</span> Electronics
          </h1>
          <p className="text-gray-500 mt-2 font-medium text-sm md:text-base">Browse our collection.</p>
        </div>
      </div>

      {/* 2. STICKY SEARCH CONTAINER */}
      <div className="sticky top-[64px] z-[50] bg-white border-b border-gray-100 py-3 lg:static lg:bg-transparent lg:border-none lg:py-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative group lg:mt-4">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#bd8b31] transition-colors" />
            <input 
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-[#bd8b31]/10 focus:border-[#bd8b31] outline-none transition-all bg-gray-50 focus:bg-white text-sm"
            />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-4 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* 3. STICKY CATEGORY STRIP */}
          <aside className="lg:w-64 shrink-0">
            <div className="
              sticky top-[128px] lg:top-32 z-40 
              -mx-4 px-4 py-3 lg:p-5 
              bg-white/90 backdrop-blur-md border-b border-gray-200 lg:border lg:rounded-2xl lg:bg-white lg:backdrop-blur-none
              flex lg:flex-col items-center lg:items-start gap-3 overflow-x-auto no-scrollbar
            ">
              <div className="hidden lg:flex items-center gap-2 mb-4 text-gray-900 font-bold uppercase text-[10px] tracking-widest">
                <FaSlidersH />
                <span>Categories</span>
              </div>
              
              <div className="flex lg:flex-col gap-2 w-full">
                <button
                  onClick={() => setSelectedType("")}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    !selectedType 
                      ? "bg-[#bd8b31] text-white shadow-md" 
                      : "text-gray-500 bg-gray-100 lg:bg-transparent hover:bg-gray-200"
                  }`}
                >
                  All Items
                </button>

                {dbSubcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedType(sub.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      selectedType === sub.id 
                        ? "bg-[#bd8b31] text-white shadow-md" 
                        : "text-gray-500 bg-gray-100 lg:bg-transparent hover:bg-gray-200"
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}

                {/* ADMIN ONLY: ADD CATEGORY BUTTON */}
                {session && (
                  <button
                    onClick={() => setIsCatModalOpen(true)}
                    className="flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold text-orange-500 bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-all lg:mt-4"
                  >
                    <FaPlus size={10} /> Add Category
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* GRID AREA */}
          <section className="flex-1">
            {filteredElectronics.length > 0 ? (
              <ElectronicsCardsMain products={filteredElectronics} />
            ) : (
              <div className="bg-white border border-dashed border-gray-300 rounded-3xl py-20 text-center">
                <p className="text-gray-400 font-medium">No products found.</p>
                <button 
                   onClick={() => {setSelectedType(""); setSearch("")}} 
                   className="mt-4 text-orange-500 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default function MiscPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-gray-400">Loading Misc...</div>}>
      <MiscContent />
    </Suspense>
  );
}