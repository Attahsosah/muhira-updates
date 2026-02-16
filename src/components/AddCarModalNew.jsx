import React, { useContext, useEffect, useState } from 'react'
import { MakeContext, MileageContext, ModalImagesContext, ModelContext, OpenContext, PriceContext, TransmissionContext, TypeContext, YearContext } from "./context/CrudContext";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { FetchedCarsContext, ModalIdContext } from "@/components/context/CarCardContext";
import { useSession } from "next-auth/react";
import { db, storage } from "../../firestore";
function AddCarModalNew() {
    const [open, setOpen] = useContext(OpenContext);
    const [modalModel, setModalModel] = useContext(ModelContext);
    const [make, setMake] = useState("");
    const [fileUploadClicked, setFileUploadClicked] = useState(false);

    const [model, setModel] = useState("d")
    const [price, setPrice] = useState("")
    const [type, setType] = useState("")
    const [mileage, setMileage] = useState("")
    const [transmission, setTransmission] = useState("")
    const [images, setImages] = useState("");
    const [year, setYear] = useState("");
    const [color, setColor] = useState("");
    


    const [modalId, setModalId] = useContext(ModalIdContext);
    const [uploaded, setUploaded] = useState(false);

    const { data: session } = useSession();


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
      
        setOpen(false);
      };

      const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
      
      
      }
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
            return getDownloadURL(snapshot.ref);
          });
    
          const downloadUrls = await Promise.all(downloadUrlsPromises);
    
          setImages((prevImages) => [...prevImages, ...downloadUrls]);
          setUploaded(true);

        } catch (error) {
          console.error("Error uploading imageds:", error);
        }
      };


      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const carRef = await addDoc(collection(db, "cars"), {
            // type,
            make,
            model,
            images,
            transmission,
            mileage,
            price,
            type,
            color,
            username:session.user?.username,
            // id: uuidv4(),
            timestamp:serverTimestamp()
    
          });
          console.log("Car added with images:", carRef.images);
          setMake("");
          setModel("");
          setYear("");
          setPrice("");
          setImages([]);
          setMileage("");
          setType("");
          setColor("");
          setTransmission("")
          setOpen(false);
          setFileUploadClicked(false)
        } catch (error) {
          console.error("Error adding car:", error);
        //   setUploading(false);
        }
      };
    
    //   useEffect(() => {
    //     if(uploading){
    //       console.log("Uploading", uploading)
    //     }else{
    //       console.log("Uploading done")
    //     }
    //   }, []);


    useEffect(() => {
      console.log("Images uploaded finally.,.,.,.,..,.,", uploaded)
    },[uploaded])


  return (

        <>
          {/* <button
            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setOpen(true)}
          >
            Open regular modal
          </button> */}
          {open ? (
            <>
              <div
                className="justify-center items-center flex  fixed inset-0 z-50 outline-none focus:outline-none mx-[10px]"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold ml-[5px]">
                        Add a Car
                      </h3>
                    
                    </div>
                    {/*body*/}
                    <div className="relative p-6 block space-y-[20px]">
                        <div className="flex space-x-[4px]">
                            <input className="rounded-[4px] border border-gray-500 text-center" placeholder="Make"  value={make}
                        onChange={(e) => setMake(e.target.value) }/>
                            <input className="rounded-[4px] border border-gray-500 text-center" placeholder="Model"  value={model}
                        onChange={(e) => setModel(e.target.value) }/>

                        </div>

                        <div className="flex space-x-[4px]">
                            <input className="rounded-[4px] border border-gray-500 text-center" value={mileage} placeholder="mileage" onChange={(e) => setMileage(e.target.value)} />
                            <input className="rounded-[4px] border border-gray-500 text-center" value={year} placeholder="year" onChange={(e) => setYear(e.target.value)} />

                        </div>

                        <div className="flex space-x-[4px]">
                            <input className="rounded-[4px] border border-gray-500 text-center" value={transmission} placeholder="transmission" onChange={(e) => setTransmission(e.target.value)} />
                            <input  className="rounded-[4px] border border-gray-500 text-center" value={price} onChange={(e) => setPrice(e.target.value) } placeholder="Price"/>

                        </div>

                        <div className="flex space-x-[4px]">
                            <input className="rounded-[4px] border border-gray-500 text-center" value={type} placeholder="Fuel Type" onChange={(e) => setType(e.target.value)} />
                            <input  className="rounded-[4px] border border-gray-500 text-center" value={color} onChange={(e) => setColor(e.target.value) } placeholder="Colour"/>

                        </div>
                        

                        <div className="flex justify-center">
                            <textarea className="shadow-lg px-10 bg-transparent md:px-10 text-gray-200 rounded-lg p-2 focus:scale-105 focus:outline-none  hover:border-coolYellow focus:border-coolYellow transform transition duration-300 ease-out" type="text" placeholder="Enter a Description here"/>

                        </div>

                        <div className="flex justify-center ">
                            <input
                            onClick={() => setFileUploadClicked(true)}
                            type="file"
                            id="images"
                            name="images"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            />                        


                        </div>
                        


                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      {fileUploadClicked ? (<>
                        <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Close
                      </button>
                      <button
                  className={fileUploadClicked ? "bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ":"bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"}
                  type="button"
                  onClick={handleSubmit}
                >
                    {fileUploadClicked&&!uploaded ? "Uploading....":"Save Changes"}
                </button>
                      </>): (
                        <>
                        <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setOpen(false)}
                      >
                        Close
                      </button>

                      {
                        !fileUploadClicked && (
<button
                  className={fileUploadClicked ? "bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 animate-pulse":"bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"}
                  type="button"
                  onClick={handleSubmit}
                >
                    {fileUploadClicked&&!uploaded ? "Uploading....":"Save Changes"}
                </button>
                        )
                      }
                      
                        </>
                      )}
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

export default AddCarModalNew