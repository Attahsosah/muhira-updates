import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineClockCircle } from "react-icons/ai"
import { VscGear } from "react-icons/vsc";
import { BsFillFuelPumpFill } from "react-icons/bs";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CarContext, CarDataContext, CardIdContext, ModalContext, ModalDataContext, ModalIdContext } from './context/CarCardContext';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { DeleteContext, DeleteIdContext, DeleteNameContext, DeleteTypeContext, DescriptionContext, MakeContext, MileageContext, ModalImagesContext, ModelContext, PriceContext, TaskContext, TransmissionContext, TypeContext, YearContext } from './context/CrudContext';
import { useSession } from 'next-auth/react';
import Image from 'next/image';


function CarCardMain({type, title, image, price, fuel, mileage, transmission, id, model, images, delId, car, year,  }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [carId, setCardId] = useContext(CardIdContext);
    const [carData, setCarData] = useContext(CarDataContext);
    // Modal State
    const [modalOpen, setModalOpen] = useContext(ModalContext);
    const [modalData, setModalData] = useContext(ModalDataContext);
    const [make, setMake] = useContext(MakeContext);
    const [modalModel, setModalModel] = useContext(ModelContext);

    const [modalPrice, setModalPrice] = useContext(PriceContext);
    const [modalType, setModalType] = useContext(TypeContext);
    const [modalMileage, setModalMileage] = useContext(MileageContext);
    const [modalTransmission, setModalTransmission] = useContext(TransmissionContext);    
    const [modalId, setModalId] = useContext(ModalIdContext);
    const [deleteOpen, setDeleteOpen] = useContext(DeleteContext);
    const [deleteId, setDeleteId] = useContext(DeleteIdContext);
    const [modalImages, setModalImages] = useContext(ModalImagesContext);
    const [modalYear, setModalYear] = useContext(YearContext);
    const [deleteType, setDeleteType] = useContext(DeleteTypeContext);
    const [deleteName, setDeleteName] = useContext(DeleteNameContext)

    const [task, setTask] = useContext(TaskContext);

    // const [modalDescription, setModalDescription] = useContext(DescriptionContext);
    const onModalOpen = () => {
        setModalOpen(true);
        setModalData({type, title, image, price, fuel, mileage, transmission, id, model, images, year})
        setMake(title)
        setModalModel(model)
        setModalPrice(price)
        setModalType(type)
        setModalMileage(mileage);
        setModalTransmission(transmission);
        setModalId(id);
        setModalImages(images)
        setModalYear(car.year)
        setTask("edit")
        // setId(id)
        // setCar(car)
        console.log("Modal Opened....data passed is", title, model, price, id)
    }

    const onDeleteClick = () => {
        setDeleteOpen(true);
        setDeleteId(delId)
        console.log("Car Id for deletion is...", id)
    }
    const handleCardClick = () => {
        router.push(`/${id}`);

        setCardId(id)
        setCarData({type, title, image, price, fuel, mileage, transmission, id, model, images})
      };


    useEffect(() => {
        console.log("Type of task", task)
    },[task])
  return (
    <div className="block shadow-lg rounded-[18px] px-3 py-5" >
       
        <div className="relative">
            
            <Link href={`/${id}`}>
                <Image onClick={() => handleCardClick()} height={218.08} width={332.66} className="h-[218.08px] w-[332.66] scale-100  object-cover cursor-pointer" src={images&&images[0]}/>


            </Link>

            <div className="bg-[#262626] absolute bottom-[4px] left-[8px] h-[25px] w-[179.86px] flex justify-between items-center rounded-[6px]">
                {/* Left side */}
                <div className="flex space-x-[4px] items-center ml-[8px]">
                    <AiOutlineClockCircle className="h-[11px] w-[11px] text-gray-400" />
                    {/* <p className="text-[13px] text-white font-[500]">{car.timestamp}test</p> */}

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
                <div className="bg-[#5CA1FF] rounded-[4px] h-[19px] w-[73.39px] text-center pt-[2px] text-white text-[10px]">New</div>
                <p className="text-[#262626] text-[14px] font-[400]">{mileage} Kms</p>

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

                <div className="flex space-x-[10px] ">
                    { session && (
                  <>
                    <FiEdit onClick={() => onModalOpen()} className="text-green-400 text-[20px] cursor-pointer"/>
                    <MdDelete onClick={() => {onDeleteClick(); setDeleteType("Car"); setDeleteName("cars")}} className="text-red-400 text-[20px] cursor-pointer"/>
                  </>
                    )}
                   
                </div>

            </div>


            <Link href={`/${id}`}>
                <button  className=" h-[40px] w-[332.66px]  text-[#00360f] bg-white border bg-gradient-to-r  border-[#c69f41] text-[12px] mt-[16px] cursor-pointer hover:bg-[#c69f41] hover:text-gray-100 transform transition-all duration-300 ease-out">More Details</button>

            </Link>

        </div>
       
    </div>
   
  )
}

export default CarCardMain