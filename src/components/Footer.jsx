import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Map from "./Map";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="block bg-black">
<div className="lg:flex block justify-between px-[20px] lg:py-[26px] lg:px-[26px] w-[100%]  py-[15px] mt-[50px] ">
            

            {/* Left Side */}
            <div className="flex justify-center">
                <div className="block lg:ml-[34px]">
                    <p className="font-serif text-[40px] font-[300] text-yellow-600 text-center">M U H I R A  <br></br> <span className='text-gray-200'>U P D A T E S</span></p>

                    <div className="mt-[32px]">
                        <p className=" text-gray-200 text-[16px] font-bold"> Address : Bujumbura, Burundi</p>
                        <p className="font-[300] text-gray-200 text-[16px]"> Commune : Mukaza Rohero,</p>
                        <p className="font-[300] text-gray-200 text-[16px]"> Chaussé du Prince Louis Rwagasore, <br /> Galerie Idéale E34</p>
                       

                        <p className="mt-[30px] text-gray-200 text-[16px] font-bold">Tel: +257 69 57 11 09</p>
                        <p className="text-gray-200 text-[16px] font-bold">Email: muhiraupdates@gmail.com</p>


                    {/* The heart of Africa, Bujumbura-Burundi, commune: Mukaza, Quarter : Rohero I, DRC Avenue no 6 */}

                    </div>

                    {/* <p className="text-white text-sm font-serif">
                © Muhira Updates 2024. All Rights Reserved
                </p> */}
                </div>
            </div>
           


            {/* Right side */}
            {/* Social Media Links */}
        <div className='sm: px-20 py-6 md:'>
            <p className="font-serif text-[20px] font-[300] text-yellow-600 text-center">F O L L O W  <br></br> <span className='text-gray-200'>U S </span></p>

          <div className="flex space-x-4 mt-3">
            <a href="https://www.facebook.com/profile.php?id=61558517173326&mibextid=ZbWKwL" className="text-gray-400 hover:text-blue-500 text-3xl"><FaFacebookF /></a>
            <a href="https://www.instagram.com/muhiraupdates?igsh=aWQyMXV5djRnaXRw" className="text-gray-400 hover:text-pink-500 text-3xl"><FaInstagram /></a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-blue-600 text-3xl"><FaLinkedinIn /></a>
          </div>
        </div>

            <div className="h-[250px] w-[300px] lg:w-[450px] flex justify-center mx-auto mt-[20px] lg:mt-0">
                <Map />
            </div>
        {/* 
          <div className="flex justify-center">
            <p className="text-white text-sm font-serif">
                © Muhira Updates 2024. All Rights Reserved
            </p>
        </div>
        */}
        </div>
        <p className="text-center font-[400] text-white pb-6">© Muhira  Updates Ltd. 2023-2025. All Rights Reserved  </p>
        </footer>
        
       
    )
}

export default Footer