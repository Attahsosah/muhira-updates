import React, { useContext, useEffect, useState } from "react";
// import DetailGallery from "../../../components/DetailGallery";
import dynamic from "next/dynamic";
import { db } from "../../firestore";

// const MyComponent = dynamic(() => import("../../components/DetailGallery"));

import { collection, doc, getDoc } from "firebase/firestore";
import {
  CarDataContext,
  CardIdContext,
} from "@/components/context/CarCardContext";
import DetailGallery from "@/components/DetailGallery";
import Navbar from "@/components/Navbar";
import OrderPlaceModal from "./OrderPlaceModal";


function DetailPage({ test, product }) {
    const [carId, setCarId] = useContext(CardIdContext);
  const [car, setCar] = useState({});
  const [carData, setCarData] = useContext(CarDataContext);
  // useEffect(() => {
    
  //   const getData = async (carId) => {
  //     const carSnapshot = await getDoc(doc(db, "cars", carId));
  //     if (carSnapshot.exists()) {
  //       setCar(carSnapshot.data());
  //     } else {
  //       console.log("Car doesn't exist");
  //     }
  //   };

  //   return () => {
  //     if(carData){
  //       getData()
  //     }
  //       };
  // }, []);

  // useEffect(() => {
  //   console.log("help me", carData);
  // }, []);

  return (
    <div className="">
        <Navbar />

      {carData && (
        <div className=" lg:mt-[0px]"
        >
 <DetailGallery
      car={carData}
      make={carData.make}
      images={carData.images}
      test={test}
      product={product}
    />
        </div>
       
      )}
    
    </div>
  )
}

export default DetailPage