import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../firestore';
import { MdEdit } from "react-icons/md";
// We use curly braces here because these contexts likely return objects
import { SectionContentContext, SectionDataContext, SectionModalContext } from './context/OrderContext';

function About() {
  const [sections, setSections] = useState([]);
  
  // FIX: Destructure as objects { } instead of arrays [ ] 
  // if your Context Provider looks like value={{ data, setData }}
  const { setSectionModalOpen } = useContext(SectionModalContext) || {};
  const { setSectionData } = useContext(SectionDataContext) || {};
  const { setSectionContent } = useContext(SectionContentContext) || {};

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
    // Find the specific "about" section
    const aboutSection = sections.find(section => section.name === "about");
    
    if (aboutSection) {
      // Safely check if setters exist before calling them
      if (typeof setSectionData === 'function') setSectionData(aboutSection);
      if (typeof setSectionContent === 'function') setSectionContent(aboutSection.content);
    }
  }, [sections, setSectionData, setSectionContent]);

  return (
    <div className="mt-[30px] pb-[40px] bg-hero-img-2 bg-fixed lg:mx-[60px] relative z-[0] min-h-[400px]">
      <div className="w-[100%] h-[100%] bg-black/50 absolute -z-[1]"/>
      
      <div className="block pt-[40px]">
        <p className="text-[32px] text-white font-[700] text-center z-30 tracking-widest uppercase">About Us</p>
        <div className="bg-yellow-400 h-[0.06em] w-[150px] mx-auto mb-6"/>

        <div className="lg:w-[700px] flex justify-center items-center mx-auto mb-10">
          {sections.filter(section => section.name === "about").map((item, index) => (
            <React.Fragment key={index}>
              <p className="text-white font-serif leading-10 text-center p-4 text-[18px]">
                {item.content}
              </p>
              <MdEdit 
                onClick={() => setSectionModalOpen && setSectionModalOpen(true)}
                className="text-green-400 text-[40px] ml-[10px] cursor-pointer hover:scale-110 transition-transform" 
              />
            </React.Fragment>
          ))}
        </div>

        {/* COUNTRIES SECTION */}
        <div className="mt-[60px] border-t border-white/10 pt-10">
          <p className="text-[#bd8b31] text-center text-[12px] font-black uppercase tracking-[0.3em] mb-6">
            Global Presence
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20">
            {['UAE', 'China', 'Burundi'].map((country) => (
              <div key={country} className="group flex flex-col items-center">
                <span className="text-white text-[22px] font-black tracking-tighter uppercase transition-colors group-hover:text-[#bd8b31]">
                  {country}
                </span>
                <div className="bg-[#bd8b31] h-[3px] w-full mt-1 scale-x-75 group-hover:scale-x-100 transition-transform" />
              </div>
            ))}
          </div>
          
          <p className="text-gray-400 text-center text-[10px] mt-8 uppercase tracking-widest font-bold">
            Muhira Updates &copy; 2026
          </p>
        </div>
      </div>
    </div>
  )
}

export default About;