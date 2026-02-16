"use client";

import React, { useContext, useEffect, useState, useMemo } from 'react';
import Navbar from "@/components/Navbar";
import { useSession } from 'next-auth/react';
import { 
  MiscOpenContext, 
  SelectedTypeContext, 
  TaskContext 
} from '@/components/context/MiscContext';
import { DeleteContext } from '@/components/context/CrudContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firestore';
import MiscProductCard from '@/components/MiscProductCard';
import MiscCreateModal from '@/components/MiscCreateModal';
import MiscUpdateModal from '@/components/MiscUpdateModal';
import AddCategoryModal from '@/components/AddCategoryModal'; 
import { useRouter } from 'next/router';
import { FaSearch, FaSlidersH, FaPlus } from "react-icons/fa";

function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  const { category } = router.query; 

  const [miscProducts, setMiscProducts] = useState([]);
  const [dbSubcategories, setDbSubcategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);

  const [miscOpen, setmiscOpen] = useContext(MiscOpenContext);
  const [task, setTask] = useContext(TaskContext);
  const [deleteOpen] = useContext(DeleteContext);
  const [selectedType, setSelectedType] = useContext(SelectedTypeContext);

  // --- ALIAS & TYPO LOGIC ---
  // This maps the clean URL to the specific spelling in your Firestore
  const dbType = useMemo(() => {
    if (category === "accessories") {
      // Logic: You want 'accessories' page to show 'electronics' items 
      // OR items currently misspelled as 'accesories' in the DB.
      // We will default to 'accesories' since that's what your screenshot shows.
      return "accesories"; 
    }
    return category;
  }, [category]);

  // 1. CLEANUP
  useEffect(() => {
    setSelectedType(""); 
    setSelectedBrand("");
  }, [category, setSelectedType]);

  // 2. Fetch Subcategories
  // Note: Your subcategories in DB must also use "accessories" or "accesories" consistently
  const fetchSubs = async () => {
    if (!category) return;
    const q = query(collection(db, "subcategories"), where("parentCategory", "==", category));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDbSubcategories(data);
  };

  useEffect(() => {
    fetchSubs();
  }, [category]);

  // 3. Fetch Products
  useEffect(() => {
    const fetchData = async () => {
      const miscSnapshot = await getDocs(collection(db, 'misc'));
      const miscData = miscSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMiscProducts(miscData);
    };
    fetchData();
  }, [miscOpen, deleteOpen]);

  // 4. Extract Brands
  const availableBrands = useMemo(() => {
    if (!selectedType) return [];
    return [...new Set(miscProducts
      .filter(item => item.subcategory === selectedType && item.brand)
      .map(item => item.brand))];
  }, [miscProducts, selectedType]);

  // 5. Filter Grid - Now searches for 'accesories' (the typo) or 'electronics'
  const filteredItems = useMemo(() => {
    return miscProducts.filter(item => {
      // Check for 'electronics' OR the misspelled 'accesories'
      const isTargetType = item.type === dbType || (category === "accessories" && item.type === "electronics");
      
      const matchesSearch = item.title?.toLowerCase().includes(search.toLowerCase());
      const matchesSub = !selectedType || item.subcategory === selectedType;
      const matchesBrand = !selectedBrand || item.brand === selectedBrand;
      
      return isTargetType && matchesSearch && matchesSub && matchesBrand;
    });
  }, [miscProducts, dbType, category, search, selectedType, selectedBrand]);

  const toggleModal = () => {
    setmiscOpen(true);
    setTask("create");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Passing dbType ensures new items are saved with the DB-consistent typo */}
      <MiscCreateModal pageCategory={dbType} />
      <MiscUpdateModal pageCategory={dbType} />
      
      <AddCategoryModal 
        isOpen={isCatModalOpen} 
        onClose={() => setIsCatModalOpen(false)} 
        onRefresh={fetchSubs}
        parentCategory={category} 
      />

      <div className="bg-white pt-28 pb-4 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 capitalize tracking-tight">
            {category === "accessories" ? "Advertising" : category} <span className="text-[#bd8b31]">&</span> Misc
          </h1>
          
          <div className="mt-6 relative group">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#bd8b31]" />
            <input 
              type="text"
              placeholder={`Search in ${category}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-[#bd8b31]/10 focus:border-[#bd8b31] outline-none transition-all bg-gray-50 focus:bg-white text-sm"
            />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
                      <aside className="lg:w-64 shrink-0">
                <div className="sticky top-32 p-5 bg-white border rounded-2xl flex flex-col gap-3">
                  <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold uppercase text-[10px] tracking-widest">
                    <FaSlidersH /> <span>Subcategories</span>
                  </div>
                  
                  <button
                    onClick={() => {setSelectedType(""); setSelectedBrand("")}}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${!selectedType ? "bg-[#bd8b31] text-white shadow-md" : "text-gray-500 bg-gray-100 hover:bg-gray-200"}`}
                  >
                    All Items
                  </button>

                  {dbSubcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {setSelectedType(sub.id); setSelectedBrand("")}}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${selectedType === sub.id ? "bg-[#bd8b31] text-white" : "text-gray-500 bg-gray-100 hover:bg-gray-200"}`}
                    >
                      {sub.name}
                    </button>
                  ))}

                  {/* RE-INSERTED ADD CATEGORY BUTTON */}
                  {session && (
                    <button
                      onClick={() => setIsCatModalOpen(true)}
                      className="flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 mt-4 hover:bg-orange-100 transition-colors"
                    >
                      <FaPlus size={10} /> Add Category
                    </button>
                  )}
                </div>
              </aside>

          <section className="flex-1">
            {session && (
              <button 
                onClick={toggleModal} 
                className="w-full mb-8 border-2 border-dashed border-[#bd8b31]/40 text-[#bd8b31] py-4 rounded-2xl font-bold hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
              >
                <FaPlus /> Add new product
              </button>
            )}

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((product) => (
                <MiscProductCard 
                  key={product.id} 
                  {...product} 
                  type={dbType} 
                  category={category} 
                  image={product.images?.[0]} 
                />
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="py-24 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
                <p className="text-gray-400 font-medium">No products found. (Checked for: {dbType} & electronics)</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Page;