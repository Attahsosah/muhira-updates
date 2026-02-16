"use client";
import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ElectronicsCardMain from "../components/ElectronicsCardMain";
import { ElectronicsDataContext } from '../components/context/CarCardContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firestore';
function ElectronicsHome() {
    const [electronics, setElectronics] = useContext(ElectronicsDataContext);
    const [electronicsId, setElectronicsId] = useState("");


    useEffect(() => {
        const fetchData = async () => {
          const electronicsSnapshot = await getDocs(collection(db, 'electronics'));
          const electronicsData = electronicsSnapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            setElectronicsId(id);
            return { id, ...data };
          });
      
          setElectronics(electronicsData);
        };
      
        fetchData();
        console.log("electronics", electronics)
      }, []);
    return (
    <div>
        <Navbar />
{/* discount, title, price, was, image, id */}

<div className="grid lg:grid-cols-3 gap-x-[28px] gap-y-[44.01px] mt-[100px]">

{
        electronics.map((electronic) => (
          <div key={electronic.id}>
            <ElectronicsCardMain  discount="20" title={electronic.title} description={electronic.description} price={electronic?.price} was="50,000" image={electronic.images[0]} />

          </div>
        ))
      }

      </div>

    </div>
  )
}

export default ElectronicsHome