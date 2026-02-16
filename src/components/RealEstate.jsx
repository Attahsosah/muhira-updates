import React, { useContext, useEffect, useState, forwardRef } from 'react'
import HouseCard from "./HouseCard"
import RealEstateCreateModal from "./RealEstateCreateModal";
import RealEstateUpdateModal from "./RealEstateUpdateModal";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firestore';
import { RealEstateOpenContext, TaskContext } from './context/RealEstateContext';
import { useSession } from 'next-auth/react';
import { DeleteContext, DeleteIdContext, DeleteNameContext, DeleteTypeContext, DoneContext } from './context/CrudContext';
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})


function RealEstate() {
  const { data: session } = useSession()
    const [houses, setHouses] = useState([]);
    const [housesId, setHousesId] = useState("");
    const [realEstateOpen, setrealEstateOpen] =  useContext(RealEstateOpenContext);
    const [task, setTask] = useContext(TaskContext);
    const [deleteOpen, setDeleteOpen] = useContext(DeleteContext);
    const [deleteType, setDeleteType] = useContext(DeleteTypeContext);
    const [deleteName, setDeleteName] = useContext(DeleteNameContext);
    const [deleteId, setDeleteId] = useContext(DeleteIdContext);
    const [done, setDone] = useContext(DoneContext);
  const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return
      }
  
      setOpen(false)
    }
  
    useEffect(() => {
        const fetchData = async () => {
          const houseSnapshot = await getDocs(collection(db, 'houses'));
          const houseData = houseSnapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            setHousesId(id);
            return { id, ...data };
          });
      
          setHouses(houseData);
        };
      
        fetchData();
        console.log("houses", "deleteId", deleteId, deleteType, deleteName)
      }, [realEstateOpen, deleteOpen]);

      useEffect(() => {
        console.log("Houses", houses)
      },[houses])
      
  return (
    <div name="houses" className="flex justify-center mt-[20px] ml-[20px] ">
      {/* <RealEstateCreateModal /> */}
      {/* <RealEstateUpdateModal /> */}

      <Snackbar open={done} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Your email was succesfully sent. I will reply to you as soon as
          possible!
        </Alert>
      </Snackbar>
         <div className="block">
            <p className="text-gray-900 text-[24px] font-[700] text-center">Real Estate</p>
            <div className="block space-y-[8px]">
      { session && (
        <div className="flex justify-center">
            <button onClick={() => {setrealEstateOpen(true); setTask("create");}} className="bg-transparent border border-[#FFA800] rounded-[1000px] text-[#FFA800] text-[14px] font-[400] px-[24px] py-[12px]  hover:bg-[#FFA800] hover:text-gray-900 transition-all duration-400 ease-out">Add a House</button>

        </div>

          )}
          </div>
            
            <div className=" py-[52px] lg:grid grid-cols-2 gap-[20px] block">
              {houses.map((house) => (
                <div key={house?.id}>
                    <HouseCard  id={house.id} house={house} realEstateTitle={house?.title} images={house?.images} realEstateDescription={house?.description} realEstatetype={house?.type} realEstatebathrooms={house?.bathrooms} realEstateBedrooms={house?.rooms} realEstatePrice={house?.price}/>

                </div>
            ))}

        </div>
        </div>
        
    </div>
  
  )
}

export default RealEstate