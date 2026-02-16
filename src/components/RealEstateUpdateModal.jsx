

import { addDoc, collection, doc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { FetchedCarsContext, ModalIdContext } from "@/components/context/CarCardContext";
import { useSession } from "next-auth/react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { VscGear } from "react-icons/vsc";
import CarCardMain from "../components/CarCardMain";
import  Modal  from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CarCardAdmin from "./CarCardAdmin";
import { FilteredCarsContext } from "./context/CarCardContext";
// import { MiscDescriptionContext, MiscDiscountContext, MiscFeaturedContext, MiscImagesContext, MiscOfferContext, MiscOpenContext, MiscPriceContext, MiscTitleContext, MiscWasContext, TaskContext } from "./context/MiscContext";
import { useContext, useState } from "react";
import { db, storage } from "../../firestore";
import { BathroomsContext, PriceContext, RealEstateIdContext, RealEstateImagesContext, RealEstateOpenContext, RoomsContext, TitleContext, TypeContext, TaskContext } from "./context/RealEstateContext";
import { DescriptionContext } from "./context/CrudContext";


// import { db, storage } from "../../firestore";
function RealEstateUpdateModal() {
   const { data: session } = useSession();
//    export const TitleContext = createContext();
//    export const TypeContext = createContext();
//    export const PriceContext = createContext();
//    export const RoomsContext = createContext();
//    export const BathroomsContext = createContext();

const [title, setTitle] = useContext(TitleContext);
  const [type, setType] = useContext(TypeContext);
  const [price, setPrice] = useContext(PriceContext);
  const [rooms, setRooms] = useContext(RoomsContext);
  const [bathrooms, setBathrooms] = useContext(BathroomsContext);

  const [realEstateImages, setrealEstateImages] = useContext(RealEstateImagesContext);
  const [realEstateOpen, setrealEstateOpen] = useContext(RealEstateOpenContext);
  const [realEstateId, setrealEstateId] = useContext(RealEstateIdContext);
  const [task, setTask] = useContext(TaskContext)


  const [description, setDescription] = useContext(DescriptionContext);

   

    const handleSubmit = async (e) => {
        const housesRef = doc(db, "houses", realEstateId);

        e.preventDefault();
            // setUploading(true);
            await updateDoc(housesRef, {
                title:title,
                // description:description,
               
                price,
                type,
                rooms,
                bathrooms,
                username:session.user?.username,    
                });
    
            setrealEstateOpen(false)
            console.log("Form submitted")
          
    
    
      };
      
    const handleImageUpload = async (e) => {
        const files = e.target.files;
        const storageRef = ref(storage);
    
        try {
          const uploadPromises = Array.from(files).map((file) => {
            const fileRef = ref(storageRef, file.name);
            return uploadBytes(fileRef, file);
          });
    
          const uploadSnapshots = await Promise.all(uploadPromises);
    
          const downloadUrlsPromises = uploadSnapshots.map((snapshot) => {
            return getDownloadURL(snapshot.ref); c
          });
    
          const downloadUrls = await Promise.all(downloadUrlsPromises);
          console.log("images", downloadUrls)
    
          setrealEstateImages((prevImages) => [...prevImages, ...downloadUrls]);
        } catch (error) {
          console.error("Error uploading images:", error);
        }
      };

  return (

        <>
          {/* <button
            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setOpen(true)}
          >
            Open regular modal
          </button> */}
          {realEstateOpen && task==="update" ? (
            <>
              <div
                className="justify-center items-center flex  fixed inset-0 z-50 outline-none focus:outline-none mx-[10px]"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex  justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold ml-[5px] text-center">
                        Update a House 
                      </h3>
                     
                    </div>
                    {/*body*/}
                    <div className="relative p-6 block space-y-[20px]">
                        <div className="flex space-x-[8px]">
                            <input className="rounded-[4px] border border-gray-500 text-center" placeholder="Title" value={title} 
                            onChange={(e) => setTitle(e.target.value) }  
                        />

                        <input className="rounded-[4px] border border-gray-500 text-center" placeholder="Price" value={price} 
                            onChange={(e) => setPrice(e.target.value) }  
                        />

                           

                        </div>
                        

                        <div className="flex space-x-[8px] ">
                            <input className="rounded-[4px] border border-gray-500 text-center" placeholder="Type(Rental or For sale)" value={type} 
                            onChange={(e) => setType(e.target.value) }  
                        />

                        <input className="rounded-[4px] border border-gray-500 text-center" placeholder="Number of rooms" value={rooms} 
                            onChange={(e) => setRooms(e.target.value) }  
                        />

                           

                        </div>

                        <div className="flex space-x-[8px] ">
                            <input className="rounded-[4px] border border-gray-500 text-center" placeholder="Number of bathrooms" value={bathrooms} 
                            onChange={(e) => setBathrooms(e.target.value) }  
                        />

                      
                           

                        </div>

                       

                            
                           

                 
                         


                       

                        <div className="flex justify-center">
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="shadow-lg px-10 bg-transparent md:px-10 text-gray-700 rounded-lg p-2 focus:scale-105 focus:outline-none  hover:border-coolYellow focus:border-coolYellow transform transition duration-300 ease-out" type="text" placeholder="Enter a Description here"/>

                        </div>

                        {/* <div className="flex justify-center ">
                            <input
                            type="file"
                            id="images"
                            name="images"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            />                        


                        </div> */}
                        


                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setrealEstateOpen(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleSubmit}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
           ) : null}
        </>
      );
    
    
}

export default RealEstateUpdateModal