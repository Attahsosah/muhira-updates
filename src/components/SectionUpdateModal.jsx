import React, { useContext, useEffect, useState } from 'react'
import { SectionContentContext, SectionDataContext, SectionModalContext } from './context/OrderContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firestore';

function SectionUpdateModal() {

    const [sectionModalOpen,setSectionModalOpen] = useContext(SectionModalContext);
    const [sectionData, setSectionData] = useContext(SectionDataContext);
    const [sectionContent, setSectionContent] = useContext(SectionContentContext)

    const submitForm = async () => {
        const sectionRef = doc(db, "pageSections", sectionData.id);
        await updateDoc(sectionRef, {
            content:sectionContent
        });
    }

    useEffect(() => {
        // setSectionContent(sectionData.content)

        console.log("Section Data", sectionContent)
    },[])
  return (
    <div>
        {sectionModalOpen ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit Section
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setSectionModalOpen(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 block ">
                    
                  <div className="flex justify-center">
                      <textarea  value={sectionContent} onChange={(e) => setSectionContent(e.target.value) }className="shadow-lg px-10 bg-transparent md:px-10 text-gray-00 rounded-lg p-2 focus:scale-105 focus:outline-none  hover:border-coolYellow focus:border-coolYellow transform transition duration-300 ease-out h-[400px]" type="text" placeholder="Enter a Description here"/>

                  </div>

                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setSectionModalOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={submitForm}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  )
}

export default SectionUpdateModal