import React, { useEffect, useState } from 'react'
import Map from './Map';
import { MdLocationPin } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { GiChatBubble } from "react-icons/gi";
import { CiMail } from "react-icons/ci";
import { db } from '../../firestore';
import { addDoc, collection } from 'firebase/firestore';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';



function Contact() {
    const [sent, setSent] = useState(false);
    const [done, setDone] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const sendMessage = async () => {

        await addDoc(collection(db, 'gurexMessages'), {name, email,message});

        setName("")
        setEmail("")
        setMessage("")
        setDone(true);
        
    }

    useEffect(() => {
        AOS.init();
    },[])
  return (
    <section id="contact-us flex mx-auto">
    <div className="block md:flex ">

        <div className="order-2 md:order-1 bg-black opacity-50 block space-y-7 md:w-[500px] md:ml-20 ">
            {/* Left */}
            <div className="flex ml-20 pt-10 pb-5">
                <h5 className="text-[#bd8b31] text-2xl font-bold">CONTACT</h5>
            </div>

            <div className="flex space-x-2 ml-10 mr-20">
                <MdLocationPin className="text-[#00360f] h-6"/>

                
                <p className="text-[#bd8b31] text-sm ">Bujumbura, Burundi Mukaza Commune </p>
            </div>
                        {/* <p className="text-black text-sm ml-16 ">Rohero I DRC Avenue no 6</p> */}



          



            <div className="flex space-x-2 ml-10 mr-20">
                <IoIosCall className="text-black h-6"/>

                <p className="text-[#bd8b31] text-sm ">+257 69 57 11 09</p>
            </div>

            <div className="flex space-x-2 ml-10 mr-20">
                <GiChatBubble className="text-black h-6"/>

                <p className="text-[#bd8b31] text-sm ">SEND US A MESSAGE</p>
            </div>
                <div className="flex justify-center pb-10">
                    <div className="flex-col space-y-5">
                        <div className="flex-col space-y-2">
                            <p className="text-[#bd8b31] flex justify-center">Name</p>
                            <input value={name} onChange={(e) => setName(e.target.value)}className="shadow-lg px-10  md:px-10 text-black rounded-lg p-2 focus:scale-105 focus:outline-none  hover:border-coolYellow focus:border-coolYellow transform transition duration-300 ease-out" type="text" placeholder="Enter your name here" />
                        </div>


                        <div className="flex-col space-y-2">
                            <p className="text-[#bd8b31] flex justify-center">Email</p>
                            <input value={email} onChange={(e) => setEmail(e.target.value)}className="shadow-lg px-10  md:px-10 text-black rounded-lg p-2 focus:scale-105 focus:outline-none  hover:border-coolYellow focus:border-coolYellow transform transition duration-300 ease-out" type="email" placeholder="Enter your email  here"/>

                        </div>


                        <div className="flex-col space-y-2">
                            <p className="text-yellow-100 flex justify-center">Message</p>
                            <input value={message} onChange={(e) => setMessage(e.target.value)} className="shadow-lg px-10  md:px-10 text-black rounded-lg p-2 focus:scale-105 focus:outline-none  hover:border-coolYellow focus:border-coolYellow transform transition duration-300 ease-out" type="text" placeholder="Enter a message here"/>

                        </div>

                        <div className="flex-col group">
                            <div  onClick={sendMessage} className="flex justify-center items-center">
                                <button type="submit">
                                     <CiMail className="text-yellow-100 h-10 cursor-pointer"/>
                                </button>
                                <span className="text-[#003a0f] ml-3 cursor-pointer hidden group-hover:flex transform transition duration-500 ease-out">Send</span>
                            </div>
                        </div>

                        <div className={done ? "flex justify-center bg-green-600 text-black px-5 py-2":"hidden"}>
                             <h5>Thanks we&apos;ll get back to you!</h5>
                        </div>
                        
                    </div>
                    
                      
                </div>
           
        </div>

            {/* Right */}
            <div className="hidden lg:order-2 md:order-1 relative   lg:block  bg-black opacity-90 md:w-[500px]  "> 
                {/* <Map className="w-[500px] ml-[30px]"/> */}
                <div className='p-52 pt-[100px]'>
                         <Image className="relative w-[148px] animate-pulse bg-[#003a0f]  rounded-full " src="https://i.ibb.co/CbJfm8L/muhiralogo.jpg" height={50} width={50} />
                        <h1 data-aos='zoom-in-up' data-aos-duration='3000' className='flex text-[#bd8b31] pl-[24px] pt-2 text-[52px] font-sans'>M U H </h1>
                        <h1 data-aos='zoom-in-up' data-aos-duration='3000' className='flex text-[#bd8b31] pl-[30px] pt-2 text-[52px] font-sans'>I </h1>
                        <h1 data-aos='zoom-in-up' data-aos-duration='3000' className='flex text-[#bd8b31] pl-[30px] pt-2 text-[52px] font-sans'>R</h1>
                        <h1 data-aos='zoom-in-up' data-aos-duration='3000' className='flex text-[#bd8b31] pl-[30px] pt-2 text-[52px] font-sans'>A</h1>
                        <h1 data-aos='zoom-in-up' data-aos-duration='3000' className='flex text-white pl-[24px] pt-2 text-[20px] font-serif'>UPDATES</h1>
                        {/* <h1 className='block text-[#bd8b31] pl-[24px] pt-2 text-[30px]  font-sans'>U P D A T E S</h1> */}

                </div>
                

                
            </div>
    </div>

</section>
  )
}

export default Contact