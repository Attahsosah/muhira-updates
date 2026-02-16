import React from 'react'
import Image from "next/image";
import { easeIn, motion } from "framer-motion";
import { FaArrowDown, FaChevronDown } from "react-icons/fa6";

function ElectronicsHero() {
  return (
    <div className="h-[70vh] lg:h-[80vh]">
        <div className="absolute h-[100%] w-[100%] ">
            <Image className="object-cover bg-fixed" src="https://i.ibb.co/tJJGx8m/pexels-junior-teixeira-1064069-2047905.jpg" fill   />

            <motion.div 
            initial={{
              opacity:0,
              x:-100
            }}

            animate={{
              opacity:1,
              x:0
            }}

            transition={{
              ease:easeIn,
              duration:1.5,
              delay:0.5
            }}
            className="relative block pt-[20px] align-middle bg-yellow-500 w-[100px] h-[100px]  -bottom-[75%] sm:bottom-[65%] lg:-bottom-[55%] -right-[70%] rounded-full z-[15]">
                <p className="text-center font-serif font-[600] ">New</p>
                <p className="text-center font-serif font-[400]">Arrivals!</p>

            </motion.div>

            <motion.div
            initial={{
              opacity:0,
              y:-1
            }}
            animate={{
              opacity:1,
              y:1
            }}

            transition={{
              ease:easeIn,
              duration:1.5
            }}
            className="relative -bottom-[10%] lg:-bottom-[20%] lg:-left-[30%]  z-[15]">
                <p className="text-gray-200 text-[40px] lg:text-[50px] capitalize font-[700]">CHECK OUT OUR </p>
                <p className="text-yellow-500 text-[40px] lg:text-[50px] capitalize font-[700] mt-[40px] lg:mt-[0px]">LATEST ARRIVALS!</p>

            </motion.div>
            <a href="#categories" className="z-[30]" >
              <FaChevronDown className="z-[30] text-gray-100 animate-pulse text-[60px] relative -bottom-[38%] lg:-bottom-[40%] mx-auto"/>

            </a>
            <a className="z-[15]" href="#categories">

              {/* <div className="relative block pt-[20px] align-middle bg-green-900 w-[50px] h-[50px] -bottom-[40%] mx-auto  rounded-full z-[15] text-center">  <FaArrowDown className="text-white ml-[5%]"/></div> */}
            </a>
        </div>
        <div className="relative w-[100%] h-[100%] bg-black/[50%] z-[10]"/>
    </div>
  )
}

export default ElectronicsHero