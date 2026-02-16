import React, { useContext, useState } from 'react'
import { AiOutlineClockCircle } from "react-icons/ai"
import { VscGear } from "react-icons/vsc";
import { BsFillFuelPumpFill } from "react-icons/bs";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CarDataContext, CardIdContext } from './context/CarCardContext';
import { db } from '../../firestore';
import { doc, deleteDoc } from "firebase/firestore";
import  Modal  from '@mui/material/Modal';
import Box from '@mui/material/Box';

function CarCardAdmin({type, title, image, price, fuel, mileage, transmission, id, model, images }) {

    const router = useRouter();

    const [carId, setCardId] = useContext(CardIdContext);
    const [carData, setCarData] = useContext(CarDataContext);

    const [open, setOpen] = useState(false);
  
    const [updateMake, setUpdateMake] = useState("");
    const [updateModel, setUpdateModel] = useState("");
    const [updatePrice, setUpdatePrice] = useState("");
    const [updateYear, setUpdateYear] = useState("");
    const [updateTransmission, setUpdateTransmission] = useState("");





    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        boxShadow: 24,
      
      
      }
    

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
      
        setOpen(false);
      };

    const deleteAd = async () => {
        const adRef = doc(db, "cars", id)
        await deleteDoc(adRef)

        console.log("Advertisement succesfully deleted with id", id)
      }


    const handleCardClick = () => {
        router.push(`/${id}`);

        setCardId(id)
        setCarData({type, title, image, price, fuel, mileage, transmission, id, model, images})
      };


     
  return (
<div className="block shadow-lg rounded-[18px] px-3 py-5">

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
                        value={updateMake}
                        onChange={(e) => setUpdateMake(e.target.value) }
                        />


                    <input
                        type="text"
                        id="make"
                        placeholder="Car model"
                        name="model"
                        value={updateModel}
                        onChange={(e) => setUpdateModel(e.target.value) }
                        />


                    <input value={year} placeholder="year" onChange={(e) => setUpdateYear(e.target.value)}/>

                    <input value={transmission} placeholder="transmission" onChange={(e) => setUpdateTransmission(e.target.value)}/>
                    <input value={mileage} placeholder="mileage" onChange={(e) => seUpdatetMileage(e.target.value)}/>
                    <input value={price} placeholder="price" onChange={(e) => setUpdatePrice(e.target.value)}/>

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
                </div>            </Box>

        </Modal>
        <div className="relative">
            
            <Link href={`/${id}`}>
                {/* <img onClick={() => handleCardClick()} className="h-[218.08px] w-[332.66px] object-cover cursor-pointer" src={images[0]}/> */}

            </Link>

            <div className="bg-[#262626] absolute bottom-[4px] left-[8px] h-[25px] w-[179.86px] flex justify-between items-center rounded-[6px]">
                {/* Left side */}
                <div className="flex space-x-[4px] items-center ml-[8px]">
                    <AiOutlineClockCircle className="h-[11px] w-[11px] text-gray-400" />
                    <p className="text-[13px] text-white font-[500]">{type}</p>

                </div>


                {/* Right side */}

                <div className="mr-[7.85px]">
                    <p className="text-[14px] text-white font-[500]">BIF {price}</p>
                </div>

            </div>

            
        </div>


        <div className="block">
            {/* Bottom details */}
            
            <p className="text-[16px] font-[700] text-[#262626] mt-[15px]">{title} {model}</p>

            <div className="flex space-x-[6.89px]">

            </div>

            <div className="flex items-center mt-[10px] space-x-[12px]">

                <div className="mt-[4px] flex items-center space-x-[8px]">
                    <VscGear className="text-gray-500 text-[20px]"/>
                    <p className="text-[#262626] text-[14px] font-[600]">{transmission}</p>
                </div>

                <div className="flex items-center space-x-[8px]">
                    <BsFillFuelPumpFill className="text-red-600 text-[20px]"/>
                    <p className="text-[#262626] text-[14px] font-[600]">{fuel}</p>


                </div>

            </div>


            <div className="flex justify-center space-x-[15px]">
                <button onClick={() => setOpen(true)} className=" h-[40px]  px-[8px] text-[#599016] bg-white border border-[#599016] text-[12px] mt-[16px] cursor-pointer hover:bg-[#599016] hover:text-gray-100 transform transition-all duration-300 ease-out">Edit</button>
                <button onClick={() => deleteAd()} className=" h-[40px]  px-[8px] text-[#F75D34] bg-white border border-[#F75D34] text-[12px] mt-[16px] cursor-pointer hover:bg-[#F75D34] hover:text-gray-100 transform transition-all duration-300 ease-out">Delete</button>

            </div>


        </div>
    </div>
      )
}

export default CarCardAdmin