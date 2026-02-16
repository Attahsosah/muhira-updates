import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { BathroomsContext, RealEstateIdContext, RealEstateImagesContext, RealEstateOpenContext, RoomsContext, TaskContext, TitleContext } from './context/RealEstateContext';
import { DeleteContext, DeleteIdContext, DeleteNameContext, DeleteTypeContext, DescriptionContext, PriceContext, TypeContext } from './context/CrudContext';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firestore';
import { FaMapPin } from "react-icons/fa";

function HouseCard({ realEstateTitle,realEstateDescription, realEstatePrice, realEstateLocation, images, id, realEstateBedrooms, realEstateBathrooms, house}) {
    const router = useRouter();

    
    const [realEstateImages, setrealEstateImages] = useContext(RealEstateImagesContext);
    const [realEstateOpen, setrealEstateOpen] = useContext(RealEstateOpenContext);
    const [realEstateId, setrealEstateId] = useContext(RealEstateIdContext);
    
    const [title, setTitle] = useContext(TitleContext);
    const [type, setType] = useContext(TypeContext);
    const [price, setPrice] = useContext(PriceContext);
    const [rooms, setRooms] = useContext(RoomsContext);
    const [bathrooms, setBathrooms] = useContext(BathroomsContext);
  
  
  
    const [description, setDescription] = useContext(DescriptionContext);
  
    // const [task, setTask] = useState("create");
  
    const [deleteOpen, setDeleteOpen] = useContext(DeleteContext);
    const [deleteType, setDeleteType] = useContext(DeleteTypeContext);
    const [deleteName, setDeleteName] = useContext(DeleteNameContext);
    const [deleteId, setDeleteId] = useContext(DeleteIdContext);
    const [task, setTask] = useContext(TaskContext)
    const handleCardClick = () => {
        router.push(`/houses/${id}`);

        // setCardId(id)
        // setCarData({type, title, image, price, fuel, mileage, transmission, id, model, images})
      };

      const onEditClick = () => {
        setrealEstateOpen(true);

        setTitle(realEstateTitle);
        setDescription(realEstateDescription)
        

        // title:title,
        //         description:description,
               
        //         price,
        //         type,
        //         rooms,
        //         bathrooms,
        //         images:realEstateImages,
        setrealEstateId(id)
        setTask("update")
      }

      const onDeleteClick = async () => {
        setDeleteOpen(true);
        setDeleteType("House");
        setDeleteName("houses");
        setDeleteId(id);
        console.log("deleteId", id)

        // try {
        //     const deleteRef = doc(db, 'houses', deleteId);
        //     await deleteDoc(deleteRef);
          
        //     console.log('Document successfully deleted!');
        //   } catch (error) {
        //     console.error('Error deleting document:', error);
        //   }
        }
        useEffect(() => {
            console.log("description", realEstateDescription)
        },[realEstateOpen])
  return (
    <div className="w-[332.66px]  shadow-lg rounded-[8px] block px-[15px] pb-[15px] hover:shadow-2xl cursor-pointer transition-all duration-500 ease-out">
       <img onClick={() => handleCardClick()} className="w-full h-[218.08px] object-cover " src={images[0]} alt="Electronics image"/>

        <div className="flex items-center space-x-[8px]">
            {/* <div className="bg-red-600 py-1 px-2 mt-[10px]">
                <p className="text-white">{discount}% Off</p>
            </div> */}
            <p className="text-green-600 tex-[20px] font-[500] flex justify-end">{type}</p>
        </div>

        <div className="mt-[18px] block ">
            <p className="text-gray-700 font-[700]">{realEstateTitle} </p>
            <div className="flex space-x-[10px mt-[10px]">
                <div className="block space-y-[15px]">
                <p className="text-black font-[400] text-sm">Price: {house.price}</p>

                    <p className="text-black font-[400] text-sm">Type: {house.type}</p>

                </div>

                {/* <p>Was <s className="text-strikethrough">{was}</s></p> */}

                    <div className="flex ml-[30px]">
                        <FiEdit onClick={onEditClick}  className="text-green-400 text-[20px] cursor-pointer"/>
                        <MdDelete onClick={onDeleteClick} className="text-red-400 text-[20px] cursor-pointer"/>

                    </div>
                   
            </div>

            <div className="flex space-x-[10px] mt-[8px]">
                <p className=" text-sm text-gray-500 font-[300]">{realEstateBedrooms?realEstateBedrooms:""} Rooms |</p>
                {
                realEstateBathrooms && (
                                <p className=" text-sm text-gray-500 font-[300]">{realEstateBathrooms?realEstateBathrooms:""} Bathrooms |</p>

                )
                }

                <div className="flex space-x-[10px] items-center">
                    <FaMapPin className="text-red-500 text-[12px]"/>
                    <p className=" text-sm text-gray-500 font-[300]">{house.location?house.location:"Send Inquiry"} | </p>

                </div>
               
                {/* <p className=" text-sm text-gray-500 font-[300]">Full Compound |</p> */}


            </div>

        </div>
        <div className="flex justify-center">
                <a href={`/houses/${id}`}>
                    <button  className=" h-[40px] px-[5px]  text-[#00360f] bg-white border border-[#c69f41]  text-[12px] mt-[16px] cursor-pointer hover:bg-[#c69f41] active:scale-105 hover:text-gray-100 transform transition-all duration-300 ease-out">View More</button>

                </a>
        </div>

    </div>
  )
}

export default HouseCard