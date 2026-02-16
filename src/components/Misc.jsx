import React, { useContext, useEffect, useState } from 'react'
import ElectronicsCardMain from './ElectronicsCardMain'
import MiscProductCard from "./MiscProductCard";
import MiscCreateModal from "./MiscCreateModal";
import MiscUpdateModal from "./MiscUpdateModal";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firestore';
import { MiscOpenContext, TaskContext } from './context/MiscContext';
import { useSession } from 'next-auth/react';
import { DeleteContext } from './context/CrudContext';
function Misc() {
    const { data:session } = useSession();
    const [miscId, setMiscId] = useState("");
    const [miscProducts, setMiscProducts] = useState([]);
    const [miscOpen, setmiscOpen] = useContext(MiscOpenContext);
    const [task, setTask]  = useContext(TaskContext);
    const [deleteOpen, setDeleteOpen] = useContext(DeleteContext)
    useEffect(() => {
        const fetchData = async () => {
          const miscSnapshot = await getDocs(collection(db, 'misc'));
          const miscData = miscSnapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            setMiscId(id);
            return { id, ...data };
          });
      
          setMiscProducts(miscData);
        };
      
        fetchData();
        console.log("misc products", miscProducts)
      }, [miscOpen, deleteOpen]);

      const toggleModal = () => {
        setmiscOpen(true);
        setTask("create")
      };

  return (
<div name="misc" className="flex justify-center">
  <MiscCreateModal />
  <MiscUpdateModal />
  <div className="block lg:mx-[60px] mt-[70px]">
    {/* Title and filters */}
    <div className="block space-y-[8px]">
    { session && (
          <div className="flex justify-center">

            <button onClick={toggleModal} className="bg-transparent border border-[#FFA800] rounded-[1000px] text-[#FFA800] text-[14px] font-[400] px-[24px] py-[12px]  hover:bg-[#FFA800] hover:text-gray-900 transition-all duration-400 ease-out">Add a Miscellenious Item</button>

          </div>

          )}
        <div className="flex justify-center">
            <p className="text-gray-900 text-[24px] font-[700]">Miscellenous</p>

        </div>

      {/* <FiltersNew /> */}
    </div>
    <div className="grid lg:grid-cols-3 gap-x-[28px] gap-y-[44.01px] mt-[40px]">


{/* { discount, title, price, was, image, id} */}


    {
        miscProducts.map((product) => (
            <MiscProductCard key={product.id} type="furniture" id={product.id} discount={product.discount} title={product.title} price={product.price} was={product.was&&product.was} image={product.images[0]} description={product.description} featured={product.featured} images={product.images} offer={product.offer}/>

        ))
    }
      {/* <MiscProductCard id="1234" discount="14" title="Ipad Pro Case" price="22,000" was="50,000" image="https://m.media-amazon.com/images/I/3145szSi9kL._AC_SY200_.jpg"/> */}

      {/* <ElectronicsCardMain discount="24" title="Ipad Pro Case" price="22,000" was="50,000"  image="https://m.media-amazon.com/images/I/31eQG-gVTXL._AC_SY200_.jpg"/> */}

     

    </div>
     
    </div>
  </div>

  )
}

export default Misc