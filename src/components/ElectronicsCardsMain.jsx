"use client";

import React, { useContext } from 'react';
import ElectronicsCardMain from "./ElectronicsCardMain";
import { useSession } from 'next-auth/react';
import { 
  ElectronicsOpenContext, 
  TaskContext,
  ElectronicsTitleContext,
  ElectronicsPriceContext,
  ElectronicsDescriptionContext,
  ElectronicsImagesContext,
  ElectronicsSubcategoryContext,
  ElectronicsSpecsContext
} from './context/CrudContext';

function ElectronicsCardsMain({ products }) {
  const { data: session } = useSession();
  const [, setElectronicsOpen] = useContext(ElectronicsOpenContext);
  const [, setTask] = useContext(TaskContext);

  const [, setTitle] = useContext(ElectronicsTitleContext);
  const [, setPrice] = useContext(ElectronicsPriceContext);
  const [, setDescription] = useContext(ElectronicsDescriptionContext);
  const [, setImages] = useContext(ElectronicsImagesContext);
  const [, setSubcategory] = useContext(ElectronicsSubcategoryContext);
  const [, setSpecs] = useContext(ElectronicsSpecsContext);

  const handleAddClick = () => {
    setTitle("");
    setPrice("");
    setDescription("");
    setImages([]);
    setSubcategory("");
    setSpecs([{ key: "", value: "" }]);
    setTask("create"); 
    setElectronicsOpen(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:px-4 py-6 md:py-10">
      {/* Header Actions */}
      <div className="flex flex-col items-center mb-6 md:mb-10">
        {session && (
          <button 
            onClick={handleAddClick}
            className="border-2 border-[#F75D34] text-[#bd8b31] px-6 md:px-10 py-2.5 md:py-3 rounded-full font-bold text-sm md:text-base hover:bg-[#bd8b31] hover:border-[#bd8b31] hover:text-white transition-all shadow-md active:scale-95"
          >
            + Add Electronic Item
          </button>
        )}
      </div>

      {/* Grid Layout: Updated for 2 columns on mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 w-full">
        {products && products.length > 0 ? (
          products.map((item) => (
            <div key={item.id} className="flex justify-center h-full"> 
              <ElectronicsCardMain
                id={item.id}
                electronic={item}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
            No items found in this selection.
          </div>
        )}
      </div>
    </div>
  );
}

export default ElectronicsCardsMain;