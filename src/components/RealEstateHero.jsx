import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function RealEstateHero() {
  return (
    <div className="bg-hero-img bg-cover text-white py-16 px-4 relative h-[100%] w-[100%] ">
            {/* <Image className="object-cover z-0" src="https://cdn.discordapp.com/attachments/817048198022430761/1166252141632028672/pexels-photomix-company-101808.jpg?ex=6549cff2&is=65375af2&hm=9e03ec3a397f40bc619e2d43093582e7c14eb2c27160c9d08deabc82038eda26&" fill   /> */}
    <div className="absoute  top-0 max-w-screen-xl mx-auto text-center z-10">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-700 font-serif">Find Your Dream Home</h1>
      <p className="text-lg mb-8 text-yellow-600">Discover the perfect property for you.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a className="bg-white text-black active:border-b-2 hover:bg-[#00360f] transition-all duration-500 ease-out hover:text-white py-2 px-4 rounded-md block">
            Rentals
          </a>
          <a className="bg-white text-black active:border-b-2 hover:bg-[#00360f] transition-all duration-500 ease-out hover:text-white py-2 px-4 rounded-md block">
            Houses for Sale
          </a>
          <a className="bg-white text-black active:border-b-2 hover:bg-[#00360f] transition-all duration-500 ease-out hover:text-white py-2 px-4 rounded-md block">
            Sell a house
          </a>
      </div>
    </div>
  </div>
  )
}

export default RealEstateHero