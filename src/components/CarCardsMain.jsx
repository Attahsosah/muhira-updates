"use client";
 import React, { useContext, useEffect, useState } from 'react';
import CarCardMain from './CarCardMain';
import Filters from './Filters';
import FiltersNew from "./FiltersNew";
import { collection, getDocs, subcollection } from 'firebase/firestore';
import { db } from '../../firestore';
import { CardIdContext, FetchedCarsContext,FetchCarsDataContext, FilteredCarsContext, MakeFilterContext, ModalContext, ModelFilterContext, PriceRangeFilterContext, SearchingContext, YearFilterContext } from './context/CarCardContext';
import AddCarModal from "./AddCarModal";
import AddCarModalNew from "./AddCarModalNew"
import RecommendedCard from "./RecommendedCard";
import CarModal from "./CarModal";
import { DeleteContext, OpenContext, TaskContext } from './context/CrudContext';
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useSession } from 'next-auth/react';
function CarCardsMain() {
  const { data: session } = useSession();

  const [cars, setCars] = useContext(FetchedCarsContext);

  // const [cars, setCars] = useState([])
  const [open, setOpen] = useContext(OpenContext);

  const [deleteOpen, setDeleteOpen] = useContext(DeleteContext);

  const [filteredCars, setFilteredCars] = useContext(FilteredCarsContext);

const [makeFilter, setMakeFilter] = useContext(MakeFilterContext);
const [modelFilter, setModelFilter] = useContext(ModelFilterContext);
const [yearFilter, setYearFilter] = useContext(YearFilterContext);
const [priceRange, setPriceRange] = useContext(PriceRangeFilterContext);

const [searching, setSearching] = useContext(SearchingContext);
const [orders, setOrders] = useState([]);
const [carId, setCarId] = useContext(CardIdContext);
const [loading, setLoading] = useState(true);

const [modalOpen, setModalOpen] = useContext(ModalContext);
const [task, setTask] = useContext(TaskContext);

// const fetchCarsData = useContext(FetchCarsDataContext);




const toggleModal = () => {
  setOpen(true);
  setTask("create")
};


useEffect(() => {
  

  // fetchCarsData();
  console.log("orders", cars)
if(cars.length > 0){
  setLoading(true);
  console.log("loading", loading)
}
else{
  setLoading(false)
  console.log("loading", loading)

}

}, [modalOpen, open, deleteOpen]);



  useEffect(() => {
    console.log("make filter", makeFilter)
  },[makeFilter, deleteOpen])
  
  
  
  return (
    <div name="cars" className="flex justify-center">
      <div className="block lg:mx-[60px] mt-[20px]">
        <div className="flex justify-center">
          { session && (
            <button onClick={toggleModal} className="bg-transparent border border-[#FFA800] rounded-[1000px] text-[#FFA800] text-[14px] font-[400] px-[24px] py-[12px]  hover:bg-[#FFA800] hover:text-gray-900 transition-all duration-400 ease-out">Add a Car</button>

          )}
        </div>

      {/* <AddCarModal /> */}
      <AddCarModalNew />
        
        {/* Title and filters */}
        <div className="hidden lg:block space-y-[8px]">
          <p className="text-gray-900 text-[24px] font-[700]">Arrivals</p>
          <Filters />

          {/* <FiltersNew /> */}
        </div>

        <div className="grid grid-cols-2 lg:hidden gap-[30px]">
          {
            cars?.map((car) => (
              <RecommendedCard key={car.id} title={car.make} subtitle={car.model} price={car.price} image={car.images[0]} link={car.id}/>

            ))
          }
        </div>
        <div className="hidden lg:grid lg:grid-cols-3 gap-x-[28px] gap-y-[44.01px] mt-[30px]">
          
          <CarModal />
          <ConfirmDeleteModal />
          {
          !searching ?
          cars?.map((car) => (
            <CarCardMain
              
              key={car?.id}
              title={car?.make}
              model={car?.model}
              transmission={car?.transmission}
              year={car?.year}
              mileage={car?.mileage}
              image={car?.image}
              fuel={car?.type}
              images={car?.images}
              type={car?.type}
              price={car?.price}
              id={car?.id}
              carId={carId}
              delId={carId}
              car={car}
            />
          )):(
            filteredCars?.map((car) => (
              <CarCardMain
              key={car.id} // Remember to provide a unique key for each item in the list
              title="Jerp"
              model={car.model}
              transmission={car.transmission}
              year={car.year}
              mileage={car.mileage}
              image={car.image}
              images={car.images}
              type={car.type}
              price={car.price}
              id={car.id}
            />
            ))
          )
        }
        </div>
      </div>
    </div>

  );
}

export default CarCardsMain;


