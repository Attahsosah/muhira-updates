"use client";

import DashboardChart from "@/components/DashboardChart";
import MetricCard from "@/components/MetricCard";
import Navbar from "@/components/Navbar";

import React, { useState, useEffect, useContext } from "react";
import { db, storage } from "../../firestore";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { FetchedCarsContext } from "@/components/context/CarCardContext";
import { useSession } from "next-auth/react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { VscGear } from "react-icons/vsc";
import CarCardMain from "../components/CarCardMain";
import  Modal  from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CarCardAdmin from "./CarCardAdmin";
import { FilteredCarsContext } from "./context/CarCardContext";
const CarDetailAdmin = () => {

    const [cars, setCars] = useContext(FetchedCarsContext);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [transmission, setTransmission] = useState("");
  const [mileage, setMileage] = useState("");
  const [price, setPrice] = useState("");

  const [filteredCars, setFilteredCars] = useContext(FilteredCarsContext);
  const { data: session } = useSession();


  const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    boxShadow: 24,
  
  
  }

  
  useEffect(() => {
    const getCars = async () => {
      const carsSnapshot = await getDocs(collection(db, "cars"));
      const carsList = carsSnapshot.docs.map((doc) => doc.data());
      setCars(carsList);
      console.log("cars", cars);
    };

    getCars();
  }, [cars]);

  

  useEffect(() => {
    console.log("Images", images);
  }, [images]);
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
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
        return getDownloadURL(snapshot.ref);
      });

      const downloadUrls = await Promise.all(downloadUrlsPromises);

      setImages((prevImages) => [...prevImages, ...downloadUrls]);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };
  const toggleModal = () => {
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      const carRef = await addDoc(collection(db, "cars"), {
        // type,
        make,
        model,
        year,
        images,
        transmission,
        mileage,
        price,
        username:session.user?.username,
        id: uuidv4(),
        timestamp:serverTimestamp()

      });
      console.log("Car added with images:", carRef.images);
      setMake("");
      setModel("");
      setYear("");
      setImages([]);
      setUploading(false);
    } catch (error) {
      console.error("Error adding car:", error);
      setUploading(false);
    }
  };

  useEffect(() => {
    if(uploading){
      console.log("Uploading", uploading)
    }else{
      console.log("Uploading done")
    }
  }, [uploading]);


  // useEffect(() => {
  //   const fetchCars = async () => {
  //     const carsCollection = collection(db, 'cars');

  //     const carsQuery = query(carsCollection, where('username', '==', session.user?.username));

  //     const carsSnapshot = await getDocs(carsQuery);
  //     const carsData = carsSnapshot.docs.map((doc) => doc.data());

  //     // Process the fetched cars data

  //     setFilteredCars(carsData);
  //     console.log("Filtered cars", filteredCars)
  //   };

  //   fetchCars();

  // }, [session]);
  
  return (
    <div>
        <Navbar link="dashboard"/>

        <p className="text-center text-[40px] font-[500] mt-[100px]">My Ads</p>
        <button className="mt-[100px]" onClick={toggleModal}>Add Car</button>

        {/* Modal start */}
    
        <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box 
            sx={style}
            className="bg-white text-gray-800 focus:outline-none "
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
                        value={model}
                        onChange={(e) => setModel(e.target.value) }
                        />


                    <input value={year} placeholder="year" onChange={(e) => setYear(e.target.value)}/>

                    <input value={transmission} placeholder="transmission" onChange={(e) => setTransmission(e.target.value)}/>
                    <input value={mileage} placeholder="mileage" onChange={(e) => setMileage(e.target.value)}/>
                    <input value={price} placeholder="price" onChange={(e) => setPrice(e.target.value)}/>

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


    {
        filteredCars.map((car) => (
            <div key={car.id} className="grid grid-cols-2 w-[50vw]">
                <CarCardAdmin key={car.id} title={car.make} images={car.images} fuel={car.fuel} mileage={car.mileage} transmission={car.transmission} id={car.id} model={car.model} price={car.price}/>


            </div>
        ))
    }
    </div>
  );
}

export default CarDetailAdmin