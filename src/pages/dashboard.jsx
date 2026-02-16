
// import DashboardChart from "@/components/DashboardChart";
// import MetricCard from "@/components/MetricCard";
import React, { useState, useEffect } from "react";
import { db, storage } from "../../firestore";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import DashboardHome from "../components/DashboardHome";
function page() {
 
  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   const storageRef = ref(storage);
  //   const fileRef = ref(storageRef, file.name);

  //   try {
  //     await uploadBytes(fileRef, file);
  //     const downloadUrl = await getDownloadURL(fileRef);
  //     setImages((prevImages) => [...prevImages, downloadUrl]);
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  // };

  return (
    <div className="block">
            <Navbar />
     
     <DashboardHome />
      
    </div>
  );
}

export default page;
