import React, { useContext, useState, useEffect } from 'react'
import { FetchCarsDataContext, FetchedCarsContext } from './context/CarCardContext';
import CarCardsMain from './CarCardsMain';
import { collection, getDocs, subcollection } from 'firebase/firestore';
import { db } from '../../firestore';
import { OpenContext } from './context/CrudContext';


function CarsPageComponent() {
    // const {fetchCarsData, cars, loading} = useContext(FetchCarsDataContext);

    // useEffect(() => {
    //     fetchCarsData();
    //     console.log("cars", cars,"loading", loading)
    // },[cars])
    const [cars, setCars] = useContext(FetchedCarsContext);
    const [loading, setLoading] = useState(true);
    const [carId, setCarId] = useState(0);
    const [open, setOpen] = useContext(OpenContext);


    useEffect(() => {
        const fetchCarsData = async () => {
            const carsSnapshot = await getDocs(collection(db, 'cars'));
            const carsData = carsSnapshot.docs.map((doc) => {
              const data = doc.data();
              const id = doc.id;
              setCarId(id);
              return { id, ...data };
            });
        
            setCars(carsData);
            setLoading(false);
            console.log("Fetched data", cars)
          };

          fetchCarsData();
    },[open])
   
  return (
    <div className="mt-[70px]" >
            
    
            <CarCardsMain />

     
</div>  
  )
}

export default CarsPageComponent