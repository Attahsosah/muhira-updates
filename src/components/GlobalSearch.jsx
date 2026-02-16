"use client";

import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "../../firestore";
import { useRouter } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";

const GlobalSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();

  const subcategoryMap = {
    "mobile": "mobile-phones",
    "phones": "mobile-phones",
    "cellphone": "mobile-phones",
    "laptop": "computers",
    "pc": "computers",
    "computer": "computers",
    "screen": "tvs",
    "television": "tvs",
    "tv": "tvs",
    "helmet": "helmets",
    "advertising": "accesories", 
    "electronics": "electronics"
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (val) => {
    setSearchTerm(val);
    if (val.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setIsOpen(true);

    try {
      const keywords = val.toLowerCase().trim().split(/\s+/);
      const matchedIds = keywords
        .map(kw => subcategoryMap[kw])
        .filter(id => id !== undefined);

      const collections = ["cars", "houses", "misc"];
      let combinedResults = [];

      for (const colName of collections) {
        const snap = await getDocs(query(collection(db, colName), limit(80)));
        const data = snap.docs.map(doc => ({
          id: doc.id,
          col: colName,
          ...doc.data()
        }));
        
        const filtered = data.filter(item => {
          const title = item.title?.toLowerCase() || "";
          const desc = item.description?.toLowerCase() || "";
          const itemSubcat = item.subcategory?.toLowerCase() || "";
          const itemType = item.type?.toLowerCase() || "";

          const matchesSubcatId = matchedIds.some(id => itemSubcat.includes(id) || itemType.includes(id));
          const matchesKeywords = keywords.every(kw => 
            title.includes(kw) || 
            desc.includes(kw) || 
            itemSubcat.includes(kw) ||
            itemType.includes(kw)
          );

          return matchesSubcatId || matchesKeywords;
        });

        combinedResults = [...combinedResults, ...filtered];
      }

      setResults(combinedResults);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToProduct = (item) => {
    setIsOpen(false);
    setSearchTerm("");
    const path = item.col === "misc" ? `/misc/${item.id}` : `/${item.col}/${item.id}`;
    router.push(path);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-4xl mx-auto px-4 -mt-10 z-[70]">
      <div className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <FiSearch className="text-[#bd8b31] text-xl" />
        </div>
        <input
          type="text"
          className="w-full bg-white h-20 pl-16 pr-12 rounded-3xl shadow-2xl outline-none text-gray-800 text-lg font-semibold border-4 border-transparent focus:border-[#bd8b31]/20 transition-all placeholder:text-gray-400"
          placeholder="Search for Mobile Phones, Toyota, Apartments..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {searchTerm && (
          <button onClick={() => {setSearchTerm(""); setIsOpen(false);}} className="absolute inset-y-0 right-6 flex items-center">
            <FiX className="text-gray-400 hover:text-red-500 transition-colors" size={24} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-24 left-4 right-4 bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="px-8 py-5 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">
                  {loading ? "Searching..." : `${results.length} results for &quot;${searchTerm}&quot;`}
                </h3>
             </div>
          </div>

          <div className="p-8 overflow-x-auto flex gap-6 no-scrollbar bg-white">
            {results.length > 0 ? (
              results.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => navigateToProduct(item)}
                  className="min-w-[180px] max-w-[180px] group cursor-pointer flex-shrink-0"
                >
                  <div className="aspect-[4/5] rounded-[24px] bg-gray-50 overflow-hidden mb-4 border border-gray-100 group-hover:border-[#bd8b31] group-hover:shadow-2xl group-hover:shadow-[#bd8b31]/10 transition-all duration-500">
                    <img 
                      src={item.images?.[0] || item.image} 
                      alt={item.title || "Product Image"} 
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="px-1">
                    <span className="text-[9px] font-black text-[#bd8b31] uppercase tracking-widest block mb-1">
                      {item.subcategory || item.col}
                    </span>
                    <p className="text-[13px] font-bold text-gray-900 truncate leading-tight mb-1">{item.title}</p>
                    <p className="text-[12px] font-black text-gray-900">BIF {Number(item.price).toLocaleString()}</p>
                  </div>
                </div>
              ))
            ) : !loading && (
              <div className="w-full py-16 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-gray-900 font-bold">No items found</p>
                <p className="text-gray-400 text-sm mt-1">Try searching for &quot;Electronics&quot;, &quot;Cars&quot; or &quot;Houses&quot;</p>
              </div>
            )}
            
            {loading && (
               <div className="flex gap-6 w-full">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="min-w-[180px] h-64 bg-gray-50 animate-pulse rounded-[24px]" />
                 ))}
               </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;