"use client";

import React, { useContext, useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ElectronicsCardsMain from "@/components/ElectronicsCardsMain";
import Navbar from "@/components/Navbar";
import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firestore";
import { FaSearch, FaSlidersH, FaPlus } from "react-icons/fa";
import { FiEdit2, FiTrash2 } from "react-icons/fi"; // Added for editing/deleting

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
  const [editCategoryData, setEditCategoryData] = useState(null); // State for editing category

  useEffect(() => {
    if (typeFromUrl) setSelectedType(typeFromUrl);
  }, [typeFromUrl, setSelectedType]);

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

  // Handle opening the modal in "Edit" mode
  const handleEditCategory = (e, sub) => {
    e.stopPropagation(); // Prevents selecting the category while trying to edit
    setEditCategoryData(sub);
    setIsCatModalOpen(true);
  };

  // Handle deleting a category
  const handleDeleteCategory = async (e, subId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this category? Items inside will lose their category link.")) {
      try {
        await deleteDoc(doc(db, "subcategories", subId));
        fetchSubs(); // Refresh the list
      } catch (error) {
        console.error("Error deleting subcategory:", error);
      }
    }
  };

  const filteredElectronics = useMemo(() => {
    return electronics.filter((item) => {
      const searchTerm = search.toLowerCase();
      const matchesSearch = 
        item.title?.toLowerCase().includes(searchTerm) ||
        item.brand?.toLowerCase().includes(searchTerm) ||
        item.description?.toLowerCase().includes(searchTerm);

      if (!selectedType || selectedType === "") return matchesSearch;
      return matchesSearch && item.subcategory === selectedType;
    });
  }, [electronics, search, selectedType]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ElectronicsUpdateModal />
      
      <AddCategoryModal 
        isOpen={isCatModalOpen} 
        onClose={() => {
          setIsCatModalOpen(false);
          setEditCategoryData(null);
        }} 
        onRefresh={fetchSubs}
        parentCategory="electronics" 
        editData={editCategoryData} // Pass the data here to enable Edit mode
      />

      <div className="bg-white pt-28 pb-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight uppercase">
            Misc <span className="text-[#bd8b31]">&</span> Electronics
          </h1>

          <div className="mt-6 relative group max-w-2xl mx-auto lg:mx-0">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#bd8b31] transition-colors" />
            <input 
              type="text"
              placeholder="Search by brand, model, or specs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 outline-none focus:border-[#bd8b31] focus:ring-4 focus:ring-[#bd8b31]/5 transition-all bg-gray-50 text-sm font-bold"
            />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-4 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-32 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-black/5 flex lg:flex-col gap-3 overflow-x-auto no-scrollbar">
              
              <button
                onClick={() => setSelectedType("")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  !selectedType ? "bg-black text-[#bd8b31]" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  <FaSlidersH size={12} />
                </div>
                <span className="text-[10px] font-black uppercase">All Items</span>
              </button>

              {dbSubcategories.map((sub) => (
                <div key={sub.id} className="relative group/cat">
                  <button
                    onClick={() => setSelectedType(sub.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      selectedType === sub.id ? "bg-black text-[#bd8b31]" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-white overflow-hidden flex items-center justify-center shadow-sm shrink-0">
                      {sub.image ? (
                        <img src={sub.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-[8px] font-bold opacity-20 uppercase tracking-tighter">No Image</div>
                      )}
                    </div>
                    <span className="text-[10px] font-black uppercase text-left leading-tight pr-8">
                      {sub.name}
                    </span>
                  </button>

                  {/* ADMIN ACTION BUTTONS FOR CATEGORIES */}
                  {session?.user?.isAdmin && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover/cat:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => handleEditCategory(e, sub)}
                        className="p-1.5 bg-white shadow-md rounded-md text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <FiEdit2 size={10} />
                      </button>
                      <button 
                        onClick={(e) => handleDeleteCategory(e, sub.id)}
                        className="p-1.5 bg-white shadow-md rounded-md text-red-600 hover:bg-red-600 hover:text-white transition-all"
                      >
                        <FiTrash2 size={10} />
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {session?.user?.isAdmin && (
                <button
                  onClick={() => {
                    setEditCategoryData(null);
                    setIsCatModalOpen(true);
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-orange-600 bg-orange-50 border-2 border-dashed border-orange-200 mt-4 hover:bg-orange-100 transition-colors"
                >
                  <FaPlus size={12} />
                  <span className="text-[10px] font-black uppercase">Add Category</span>
                </button>
              )}
            </div>
          </aside>

          <section className="flex-1">
            {filteredElectronics.length > 0 ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <ElectronicsCardsMain products={filteredElectronics} />
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-[2.5rem] py-24 text-center">
                <p className="text-gray-400 font-black uppercase text-sm tracking-widest px-4">
                  {search ? `No results for "${search}"` : "This category is empty"}
                </p>
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-gray-400 uppercase tracking-widest">Loading...</div>}>
      <MiscContent />
    </Suspense>
  );
}