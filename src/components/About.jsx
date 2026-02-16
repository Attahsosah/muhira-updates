import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../firestore';
import { MdDelete, MdEdit } from "react-icons/md";
import { SectionContentContext, SectionDataContext, SectionModalContext } from './context/OrderContext';

function About() {

  const [sections, setSections] = useState([]);
  const [sectionModalOpen, setSectionModalOpen] = useContext(SectionModalContext);
  const [sectionData, setSectionData] = useContext(SectionDataContext);
  const [sectionContent, setSectionContent] = useContext(SectionContentContext)
  useEffect(() => {

 const getSections = async () => {
    const sectionsSnapshot = await getDocs(collection(db, "pageSections"));
    const sectionList = sectionsSnapshot.docs.map((doc) => doc.data());
    setSections(sectionList);
    console.log("Sections succesfully fetched....they are", sections)

  };

  getSections();

  },[])

  useEffect(() => {
    const data = {}

    sections.filter(section => section.name === "about").map( item => {
      setSectionData(item)
      setSectionContent(item.content)

    })

    console.log("Section Data", sectionData)

  
    },[])
  return (
    <div className=" mt-[30px] pb-[20px]  bg-hero-img-2 bg-fixed lg:mx-[60px] relative z-[0]">

        <div className="w-[100%] h-[100%] bg-black/50 absolute -z-[1]"/>
        <div className="block ">
                <p className="text-[32px] text-white font-[700] text-center z-30">ABOUT US</p>
                <div className="bg-yellow-400 h-[0.06em] w-[50%] mx-auto"/>

                <div className="lg:w-[700px] flex justify-center items-center mx-auto ">
                  {sections.filter(section => section.name === "about").map( item => (
                  
                  <>
                  <p className="text-white font-serif leading-10 mt-[20px] text-center p-4">{item.content}</p>

                  <MdEdit onClick={() => setSectionModalOpen(true)}className="text-green-400 text-[60px] ml-[10px] cursor-pointer" />

                  </>
                  ))}


                </div>
        

                <button className="bg-[#bd8b31]  text-gray-200 mt-[20px] flex mx-auto text-center px-[10px] py-[15px] rounded-md">Shop Now</button>


        </div>

    </div>
  )
}

export default About