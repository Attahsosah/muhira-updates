import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db, auth } from '../../firestore'; // Ensure auth is exported from your firestore.js
import { onAuthStateChanged } from 'firebase/auth';
import { MdEdit } from "react-icons/md";
import { SectionContentContext, SectionDataContext, SectionModalContext } from './context/OrderContext';

function About() {
  const [sections, setSections] = useState([]);
  const [user, setUser] = useState(null); // Track authenticated user
  
  const { setSectionModalOpen } = useContext(SectionModalContext) || {};
  const { setSectionData } = useContext(SectionDataContext) || {};
  const { setSectionContent } = useContext(SectionContentContext) || {};

  // Listen for Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  useEffect(() => {
    const getSections = async () => {
      try {
        const sectionsSnapshot = await getDocs(collection(db, "pageSections"));
        const sectionList = sectionsSnapshot.docs.map((doc) => doc.data());
        setSections(sectionList);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };
    getSections();
  }, []);

  useEffect(() => {
    const aboutSection = sections.find(section => section.name === "about");
    if (aboutSection) {
      if (typeof setSectionData === 'function') setSectionData(aboutSection);
      if (typeof setSectionContent === 'function') setSectionContent(aboutSection.content);
    }
  }, [sections, setSectionData, setSectionContent]);

  return (
    <div className="relative overflow-hidden bg-[#0a0a0a] py-20 lg:px-[60px]">
      <div className="absolute inset-0 bg-hero-img-2 bg-fixed bg-cover opacity-30 blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center mb-16" data-aos="fade-up">
          <span className="text-[#bd8b31] text-xs font-black uppercase tracking-[0.5em] mb-4">Discovery</span>
          <h2 className="text-white text-5xl md:text-6xl font-black tracking-tighter uppercase">
            Our <span className="text-[#bd8b31]">Story</span>
          </h2>
          <div className="h-[3px] w-20 bg-[#bd8b31] mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: DECORATIVE BRANDING */}
          <div className="hidden lg:block lg:col-span-4 relative" data-aos="fade-right">
             <div className="absolute -top-20 -left-10 text-[200px] font-black text-white/5 select-none">M</div>
             <div className="border-l-2 border-[#bd8b31] pl-8 py-4">
                <p className="text-white text-2xl font-serif italic leading-relaxed">
                  &quot;Excellence is not an act, but a habit.&quot;
                </p>
                <p className="text-[#bd8b31] mt-4 font-bold tracking-widest uppercase text-xs">&#8212; Muhira Updates</p>
             </div>
          </div>

          {/* RIGHT: THE CONTENT CARD */}
          <div className="lg:col-span-8 group relative" data-aos="fade-left">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden">
              
              {/* AUTHENTICATION CHECK: Only show Edit if user is logged in */}
              {user && (
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity z-20">
                   <MdEdit 
                    onClick={() => setSectionModalOpen && setSectionModalOpen(true)}
                    className="text-white text-3xl cursor-pointer hover:scale-110 transition-transform p-1 bg-black/40 rounded-full" 
                  />
                </div>
              )}

              {sections.filter(section => section.name === "about").map((item, index) => (
                <div key={index} className="relative">
                  <p className="text-gray-200 font-serif text-lg md:text-xl leading-[2.2] first-letter:text-6xl first-letter:font-bold first-letter:text-[#bd8b31] first-letter:mr-3 first-letter:float-left">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER: GLOBAL PRESENCE */}
        <div className="mt-24" data-aos="zoom-in">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-[1px] flex-1 bg-white/10" />
            <p className="text-[#bd8b31] text-[10px] font-black uppercase tracking-[0.4em]">Global Presence</p>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            {['UAE', 'China', 'Burundi'].map((country) => (
              <div key={country} className="group cursor-default">
                <p className="text-white text-3xl font-black tracking-tighter uppercase transition-all group-hover:text-[#bd8b31] group-hover:tracking-widest">
                  {country}
                </p>
                <div className="bg-[#bd8b31] h-[2px] w-0 group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-500 text-[9px] uppercase tracking-[0.5em] font-bold">
               &bull; Muhira Updates  
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default About;