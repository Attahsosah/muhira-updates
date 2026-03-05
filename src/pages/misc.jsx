"use client";

import React, { useContext, useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ElectronicsCardsMain from "@/components/ElectronicsCardsMain";
import Navbar from "@/components/Navbar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firestore";
import { FaSearch, FaSlidersH, FaPlus } from "react-icons/fa";

import { SelectedTypeContext } from "@/components/context/MiscContext";
import { ElectronicsDataContext } from "@/components/context/CrudContext";
import ElectronicsUpdateModal from "@/components/ElectronicsUpdateModal";
import AddCategoryModal from "@/components/AddCategoryModal";

function MiscContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const typeFromUrl = searchParams.get("type");
  
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useContext(SelectedTypeContext);
  const [electronics, setElectronics] = useContext(ElectronicsDataContext);
  const [dbSubcategories, setDbSubcategories] = useState([]);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);

  useEffect(() => {
    if (typeFromUrl) setSelectedType(typeFromUrl);
  }, [typeFromUrl, setSelectedType]);

  const fetchSubs = async () => {
    // Note: We use "electronics" because you use misc as electronics
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
      
      // CRITICAL: We compare subcategory field to the selected ID
      const matchesType = item.subcategory === selectedType; 
      return matchesSearch && matchesType;
    });
  }, [electronics, search, selectedType]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ElectronicsUpdateModal />
      
      <AddCategoryModal 
        isOpen={isCatModalOpen} 
        onClose={() => setIsCatModalOpen(false)} 
        onRefresh={fetchSubs}
        parentCategory="electronics" 
      />

      <div className="bg-white pt-28 pb-4">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight uppercase">
            Misc <span className="text-[#bd8b31]">&</span> Electronics
          </h1>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-4 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-32 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-black/5 flex lg:flex-col gap-3 overflow-x-auto no-scrollbar">
              
              {/* ALL ITEMS BUTTON */}
              <button
                onClick={() => setSelectedType("")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  !selectedType ? "bg-black text-[#bd8b31]" : "bg-gray-50 text-gray-500"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  <FaSlidersH size={12} />
                </div>
                <span className="text-[10px] font-black uppercase">All Items</span>
              </button>

              {/* SUBCATEGORY BUTTONS */}
              {dbSubcategories.map((sub) => (
                <button
                  key={sub.id}
                  // RESTORED: Using sub.id to ensure filtering works
                  onClick={() => setSelectedType(sub.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    selectedType === sub.id ? "bg-black text-[#bd8b31]" : "bg-gray-50 text-gray-500"
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-white overflow-hidden flex items-center justify-center shadow-sm">
                    {sub.image ? (
                      <img src={sub.image} alt="" className="w-full h-full object-contain p-1" />
                    ) : (
                      <div className="text-[8px] font-bold opacity-20">MU</div>
                    )}
                  </div>
                  <span className="text-[10px] font-black uppercase text-left leading-tight">
                    {sub.name}
                  </span>
                </button>
              ))}

              {session && (
                <button
                  onClick={() => setIsCatModalOpen(true)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-orange-600 bg-orange-50 border-2 border-dashed border-orange-200 mt-4"
                >
                  <FaPlus size={12} />
                  <span className="text-[10px] font-black uppercase">Add Category</span>
                </button>
              )}
            </div>
          </aside>

          <section className="flex-1">
            {filteredElectronics.length > 0 ? (
              <ElectronicsCardsMain products={filteredElectronics} />
            ) : (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-[2.5rem] py-24 text-center">
                <p className="text-gray-400 font-black uppercase text-sm">No items found</p>
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-gray-400">Loading...</div>}>
      <MiscContent />
    </Suspense>
  );
}