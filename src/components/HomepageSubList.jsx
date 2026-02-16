"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firestore"; 
import Link from "next/link";

const HomepageSubList = ({ parentCategory }) => {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const fetchSubs = async () => {
      if (!parentCategory) return;

      // REMOVED ALIAS LOGIC: 
      // We want 'accessories' to fetch 'accessories' subcategories
      // and 'electronics' to fetch 'electronics' subcategories.
      const q = query(
        collection(db, "subcategories"), 
        where("parentCategory", "==", parentCategory)
      );
      
      try {
        const snap = await getDocs(q);
        setSubs(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching homepage subs:", error);
      }
    };
    fetchSubs();
  }, [parentCategory]);

  return (
    <div className="flex flex-wrap gap-2 mt-3 px-2">
      {subs.slice(0, 4).map((sub) => (
        <Link
          key={sub.id}
          href={`/miscType/${parentCategory}?type=${sub.id}`}
          className="bg-white/20 backdrop-blur-md hover:bg-white hover:text-black text-[10px] font-bold text-white px-2 py-1 rounded-md transition-all border border-white/30 uppercase tracking-tighter"
        >
          {sub.name}
        </Link>
      ))}
    </div>
  );
};

export default HomepageSubList;