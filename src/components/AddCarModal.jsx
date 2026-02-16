import React, { useState, useEffect, useContext } from "react";
import { db, storage } from "../../firestore";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
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
import { MakeContext, MileageContext, ModalImagesContext, ModelContext, OpenContext, PriceContext, TransmissionContext, TypeContext } from "./context/CrudContext";

function AddCarModal() {
    const [make, setMake] = useContext(MakeContext);
    const [modalModel, setModalModel] = useContext(ModelContext);
    const [modalPrice, setModalPrice] = useContext(PriceContext);
    const [modalType, setModalType] = useContext(TypeContext);
    const [modalMileage, setModalMileage] = useContext(MileageContext);
    const [modalTransmission, setModalTransmission] = useContext(TransmissionContext);    
    const [modalId, setModalId] = useContext(ModalIdContext);
    const [modalImages, setModalImages] = useContext(ModalImagesContext);
    const [uploading, setUploading] = useState(false);

    const [open, setOpen] = useContext(OpenContext);
    const { data: session } = useSession();
  const [imagesUploaded, setImagesUploaded] = useState(false);

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
    
          setModalImages((prevImages) => [...prevImages, ...downloadUrls]);
          setImagesUploaded(true)
        } catch (error) {
          console.error("Error uploading images:", error);
        }
      };


      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          setUploading(true);
          const carRef = await addDoc(collection(db, "cars"), {
            // type,
            make,
            model:modalModel,
            images:modalImages,
            transmission:modalTransmission,
            mileage:modalMileage,
            price:modalPrice,
            username:session.user?.username,
            id: uuidv4(),
            timestamp:serverTimestamp()
    
          });
          console.log("Car added with images:", carRef.images);
          setMake("");
          setModalModel("");
        //   setYear("");
          setModalImages([]);
          setUploading(false);
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
      console.log("Images uploaded", imagesUploaded)
    },[])
  return (
<Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box 
            sx={style}
            className="bg-white text-gray-800 focus:outline-none w-[100%]"
            >

                <div className=" py-[5px] px-10 block">
                    <div className="flex justify-center">
                        <p className="text-gray-700 font-[500] text-[25px]">Enter your info here</p>
                    </div>

                  
                    <form className="block">    
                        <div className="grid grid-cols-2 gap-x-[10px] gap-y-[15px]">

                        <input
                        type="text"
                        id="make"
                        placeholder="Car Make"
                        name="make"
                        value={make}
                        onChange={(e) => setMake(e.target.value) }
                        />


                    <input
                        type="text"
                        id="make"
                        placeholder="Car model"
                        name="model"
                        value={modalModel}
                        onChange={(e) => setModalModel(e.target.value) }
                        />


                    <input value={modalType} placeholder="year" onChange={(e) => setModalType(e.target.value)}/>

                    <input value={modalTransmission} placeholder="transmission" onChange={(e) => setModalTransmission(e.target.value)}/>
                    <input value={modalMileage} placeholder="mileage" onChange={(e) => setModalMileage(e.target.value)}/>
                    <input value={modalPrice} placeholder="price" onChange={(e) => setModalPrice(e.target.value)}/>

                        <input
                        type="file"
                        id="images"
                        name="images"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        />                        


                        </div>  
                      


                        <div className="flex justify-center mt-[30px]">
                         <button  onClick={handleSubmit} type="submit" className="bg-green-900 h-[40px] w-[100px] text-gray-200 relative -bottom-[40%]">Place Inquiry</button>

                        </div>


                    </form>
                </div>
            </Box>

        </Modal>
    )
}

export default AddCarModal