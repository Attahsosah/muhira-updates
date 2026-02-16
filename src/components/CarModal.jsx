import React, { useContext, useEffect, useState } from 'react'
import  Modal  from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { CarContext, ModalColorContext, ModalContext, ModalDataContext, ModalIdContext } from './context/CarCardContext';
import { MakeContext, MileageContext, ModalImagesContext, ModelContext, PriceContext, TransmissionContext, TypeContext, YearContext } from './context/CrudContext';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../firestore';

function CarModal() {

    const [modalOpen, setModalOpen] = useContext(ModalContext);
    const [modalData, setModalData] = useContext(ModalDataContext);

    const [make, setMake] = useContext(MakeContext);
    const [car, setCar] = useContext(CarContext)
    const [modalModel, setModalModel] = useContext(ModelContext);
    const [modalPrice, setModalPrice] = useContext(PriceContext);
    const [modalYear, setModalYear] = useContext(YearContext);
    const [modalImages, setModalImages] = useContext(ModalImagesContext)
    const [modalType, setModalType] = useContext(TypeContext);
    const [modalColor, setModalColor] = useContext(ModalColorContext);
    const [modalMileage, setModalMileage] = useContext(MileageContext);
    const [modalTransmission, setModalTransmission] = useContext(TransmissionContext);    
    const [modalId, setModalId] = useContext(ModalIdContext);

    const [fileUploadClicked, setFileUploadClicked] = useState(false);

    const [type, setType] = useState("");
    const [imagesUploaded, setImagesUploaded] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
      
        setModalOpen(false);
      };

      const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
      
      
      }

      const submitForm = async () => {
        const carRef = doc(db, "cars", modalId);

        await updateDoc(carRef, {
            make,model:modalModel, price:modalPrice, images:modalImages, transmission:modalTransmission, mileage:modalMileage, type:modalType
        });

        setModalOpen(false)
        console.log("Form submitted")
      }
     
      useEffect(() => {
        console.log("Images uploaded? or no.///./ mhersm", imagesUploaded)
      },[])

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
          console.log("URLs", downloadUrls)
          setImagesUploaded(true);
          console.log("Images succesfully uploaded?", imagesUploaded)
    
          setModalImages((prevImages) => [...prevImages, ...downloadUrls]);
        } catch (error) {
          console.error("Error uploading images:", error);
        }
      };
      useEffect(() => {
        console.log("Uploaded", imagesUploaded)
      },[imagesUploaded])
  return (
    <>
    {/* <button
      className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
      onClick={() => setOpen(true)}
    >
      Open regular modal
    </button> */}
    {modalOpen ? (
      <>
        <div
          className="flex justify-center  fixed inset-0 z-50 outline-none focus:outline-none mx-[10px]"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl text-center font-semibold ml-[5px]">
                  Update a Car 
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setModalOpen(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 block space-y-[20px]">
                  <div className="flex space-x-[4px]">
                      <input className="rounded-[4px] border border-gray-500 text-center" placeholder="Make"  value={make}
                  onChange={(e) => setMake(e.target.value) }/>
                      <input className="rounded-[4px] border border-gray-500 text-center" placeholder="Model"  value={modalModel}
                  onChange={(e) => setModalModel(e.target.value) }/>

                  </div>

                  <div className="flex space-x-[4px]">
                      <input className="rounded-[4px] border border-gray-500 text-center" value={modalMileage} placeholder="mileage" onChange={(e) => setModalMileage(e.target.value)} />
                      <input className="rounded-[4px] border border-gray-500 text-center" value={modalYear} placeholder="year" onChange={(e) => setModalYear(e.target.value)} />

                  </div>

                  <div className="flex space-x-[4px]">
                      <input className="rounded-[4px] border border-gray-500 text-center" value={modalTransmission} placeholder="transmission" onChange={(e) => setModalTransmission(e.target.value)} />
                      <input className="rounded-[4px] border border-gray-500 text-center" value={modalPrice} placeholder="Price" onChange={(e) => setModalPrice(e.target.value)} />


                  </div>

                  <div className="flex space-x-[4px]">
                      <input className="rounded-[4px] border border-gray-500 text-center" value={modalType} placeholder="Fuel Type" onChange={(e) => setModalType(e.target.value)} />
                      <input className="rounded-[4px] border border-gray-500 text-center" value={modalColor} placeholder="Colour" onChange={(e) => setModalColor(e.target.value)} />


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
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </button>
                <button
                  className={fileUploadClicked ? "bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 animate-pulse":"bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"}
                  type="button"
                  onClick={submitForm}
                >
                    {fileUploadClicked&&!imagesUploaded ? "Uploading....":"Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    ) : null}
  </>
    )
}

export default CarModal