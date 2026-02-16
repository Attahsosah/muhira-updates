import React from 'react'

function RealEstateCard() {
  return (
<div className="w-[332.66px]  shadow-lg rounded-[8px] block px-[15px] pb-[15px] hover:shadow-2xl cursor-pointer transition-all duration-500 ease-out">
       {/* <img  className="w-full h-[218.08px] object-cover " src={image} alt="Electronics image"/> */}

        
        <div className="flex justify-center">

                <button  className=" h-[40px] px-[5px]  text-[#F75D34] bg-white border border-[#F75D34] text-[12px] mt-[16px] cursor-pointer hover:bg-[#F75D34] hover:text-gray-100 transform transition-all duration-300 ease-out">Add to Cart</button>
        </div>
        
    </div>  )
}

export default RealEstateCard