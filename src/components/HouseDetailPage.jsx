// import { StarIcon, UploadIcon, SparklesIco, CheckIcon } from "@heroicons/react/solid"
// import { HomeIcon, SparklesIcon,EmojiHappyIcon, HeartIcon } from "@heroicons/react/outline"
import { GiHouse } from "react-icons/gi";
import { FaToilet, FaChair } from "react-icons/fa";
import Image from "next/image"
import MediumCard from "../components/MediumCard"
import { TbRulerMeasure } from "react-icons/tb";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { AiOutlineCheckCircle, AiOutlineClockCircle, AiFillHeart, AiFillStar } from 'react-icons/ai';
import { BsWhatsapp } from "react-icons/bs";
import { useState } from "react";

function HouseDetailPage({ house }) {
    const [selectedImage, setSelectedImage] = useState(house.images[0]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
      };
    return (

        // INSTALL AOS FOR SEARCH PAGE
        <div className="">
            {/* <Header /> */}
        <div className="lg:mx-6 rounded-2xl shadow-lg mt-10 p-5">
            {/* Top section */}
            <div className="py-3">
                <h3 className="text-2xl font-serif text-gray-700 font-bold py-3">{house.title}</h3>

                <div className="flex justify-between">
                    <div className="flex space-x-3">
                        {/* <StarIcon className="h-6 text-red-400"/> */}
                   

                        <div className="">
                            <p>Somewhere in Bujumbura</p>
                        </div>
                    </div>




                <div className="flex space-x-3">
                    <div className="flex space-x-2 items-center text-sm">
                        {/* <UploadIcon className="h-4"/> */}
                         <p>Share</p>
                    </div>

                <div className="flex space-x-2 items-center text-sm">
                    {/* <HeartIcon className="h-4"/> */}
                        <p>Save</p>
                </div>




            </div>
          
                </div>
                {/* 2 flexes */}
            </div>
          
            {/* Carousel for mobile */}
            <div className=" block lg:hidden px-[24px] pt-[100px]  lg:justify-center items-center bg-gray-100">


      {/* Left side */}
      <div className="lg:w-[500px] block ">
        <img className="object-cover h-[231px] w-[350px]  lg:h-[500px] lg:w-[100%]" src={selectedImage} alt="Selected Image" />

        <div className=" flex-col bg-white">
          <div className="flex space-x-[15px] pt-[20px] overflow-x-scroll">
            {house?.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                onClick={() => handleImageClick(image)}
                className="w-20 h-20 object-cover cursor-pointer"
              />
            ))}
          </div>


        </div>
        </div>

      


        {/* Description card */}

      
      </div>

            


            <section className="hidden lg:flex space-x-3 rounded-l-2xl lg:py-10 lg:px-10">

                    {/* Card sections */}

                {/* Left section */}
                <div className="relative w-[300px] h-[350px] lg:w-1/2 lg:h-[535px] py-4">
                    <Image className="rounded-l-2xl hover:opacity-75 object-cover" src={house.images?house.images[0]:""} objectFit="cover" layout="fill"/>
                </div>

                {/* Right section */}

                <div className="w-1/2">
                    <div className="flex-col space-y-4">
                        <div className="flex space-x-2">

                            <div className="relative w-1/2  py-4">
                                <Image className="hover:opacity-75 object-cover"src={house.images?house.images[1]:""} layout="fill" objectFit="cover"/>
                            </div>

                            <div className="relative w-1/2 h-64 py-4">
                                <Image className="rounded-r-2xl hover:opacity-75 object-cover" src={house.images?house.images[2]:""} layout="fill"/>
                            </div>

                        </div>




                        <div className="flex space-x-2">

                            <div className="relative w-1/2 h-64 py-4">
                                <Image className="hover:opacity-75 object-cover" src={house.images?house.images[3]:""} layout="fill"/>
                            </div>

                            <div className="relative w-1/2 h-64 py-4">
                                <Image className="rounded-r-2xl hover:opacity-75 object-cover" src={house.images?house.images[4]:""} layout="fill"/>
                            </div>

                        </div>
                    </div>
                </div>

                

            </section>

                {/* Change to flex */}
            <section className="block lg:flex lg:mx-8">

                <div className="flex-col justify-between lg:w-1/2 py-7 px-[5px] lg:px-7 shadow-lg rounded-2xl ">
                    <div className="flex justify-between ">
                        <div className="flex-col border-b">
                            <h1 className="text-2xl font-serif">Property Details</h1>
                            {/* <h1>2Bathrooms . 2 bedrooms </h1> */}

                        </div>

                        <div className="relative w-20 h-20 border-b" >
                        <Image className="bg-white rounded-full" src="https://cdn.discordapp.com/attachments/817048198022430761/1192528627535970314/20240104_124658.jpg?ex=65a967d4&is=6596f2d4&hm=f4df803f58bc37f0b5f80f01c1cff9269b7bed035986ac413f965249312cb604&" height={50} width={50} />
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 py-4">
                        <GiHouse className="h-[40px]"/>
                        <div>
                            <h1>Entire home</h1>
                            <h3 className="text-gray-700 font-serif">{house.description?house.description:""}</h3>

                        </div>
                        
                    </div>


                    <div className="flex items-center space-x-3 py-4">
                        <FaChair className="h-[40px]"/>
                        <div>
                            <h1>Fully Furnished</h1>
                            <h3 className="text-gray-700 font-serif"></h3>

                        </div>
                        
                    </div>

                    <div className="flex items-center space-x-3 py-4">
                        <TbRulerMeasure className="h-[40px]"/>
                        <div>
                            <h1>Spacious</h1>
                            <h3 className="text-gray-700 font-serif">The property is surrounded by a wall and has a sizable compound</h3>

                        </div>
                        
                    </div>


                   


                    {/* <p className="py-5 font-serif text-gray-700">
                        This  house is located in a safe neighborhood, and comes fully furnished
                    </p> */}

                    <h3 className="border-b cursor-pointer font-bold pb-5">Show more</h3>


                    <div className="flex-col">
                        {/* <div className="flex justify-start">
                            <h3 className="py-5 px-3 text-xl font-bold font-serif text-gray-500">Where you'll sleep</h3>
                        </div> */}

                        <div className="flex space-x-2 w-20  ">
                           



                        </div>

                    </div>
                </div>
                
                <div className="rounded-[4px] lg:w-[450px]  block  lg:hidden lg:shadow-lg pt-[10px] pb-[15px]  px-[8px] bg-white">
            <div className="flex justify-center space-x-[10px] items-center">
            <Image className="bg-white rounded-full" src="https://cdn.discordapp.com/attachments/817048198022430761/1192528627535970314/20240104_124658.jpg?ex=65a967d4&is=6596f2d4&hm=f4df803f58bc37f0b5f80f01c1cff9269b7bed035986ac413f965249312cb604&" height={50} width={50} />
                <div className="block space-y-[8px] align-middle">
                  <p className="text-[24px] font-[500] text-gray-900">${house.Price}</p>
                  <div className="bg-gray-100 px-[2px] py-[8px]  flex items-center space-x-[4px]">
                    <AiOutlineCheckCircle className="text-green-500 text-[30px]" />
                    <p className="text-gray-900 font-[700] text-[12px] w-[100px] text-center whitespace-nowrap">Verified Rental</p>
                  </div>

                </div>
            </div>

              <div className="flex items-center justify-center space-x-[4px]">
                  <AiFillStar className="text-yellow-500 text-[25px] mt-[8px]"/>
                  <AiFillStar className="text-yellow-500 text-[25px] mt-[8px]"/>
                  <AiFillStar className="text-yellow-500 text-[25px] mt-[8px]"/>
                  <AiFillStar className="text-yellow-500 text-[25px] mt-[8px]"/>
                  <AiFillStar className="text-yellow-500 text-[25px] mt-[8px]"/>


              </div>
            <div className="flex justify-center">
              <div className="block space-y-[20px]">
              <a target="_blank" href={`https://wa.me/+25769571109?text=Hello%20I%20would%20like%20more%20information%20about%20this%20${house.title}`}>
                 <button  className="h-[40px] w-[256px] text-gray-100 mx-[16px] mt-[25px]  text-[12px]  cursor-pointer bg-black hover:bg-white hover:text-gray-900 hover:border hover:border-black transform transition-all duration-300 ease-out flex justify-center items-center align-middle">Chat with Us<BsWhatsapp className="ml-[8px] text-[12px]"/></button>

                </a>

              </div>

             

              
            </div>


        </div>
                
        <div className="lg:ml-[40px] block space-y-[20px] ">
          {/* Top card */}
          <div className=" lg:shadow-lg  shadow-md flex justify-center  h-[150px] lg:w-[400px] pt-[20px] bg-white mx-[10px] ">
              <div className="block">
                <p className="text-gray-700 text-[32px] whitespace-nowrap text-center">Interested in this property?</p>
                <a target="_blank" href="https://wa.me/+25769571109">
                    <div className="flex justify-center">
                        <button className="h-[40px] w-[256px] text-[#F75D34] mx-[16px] bg-white border border-[#F75D34] text-[12px] mt-[16px] cursor-pointer hover:bg-[#F75D34] hover:text-gray-100 transform transition-all duration-300 ease-out">Make an Inquiry</button>

                    </div>

                </a>

              </div>
             
          </div>
          </div>
            
                    
        
      
                <div className="lg:w-1/2 hidden lg:sticky">
                    <div className="shadow-lg lg:mx-9  flex-col space-y-3 rounded-2xl lg:p-8">
                        <div className="flex justify-between border-b">
                            <h1 className="font-serif font-bold text-xl">${house.Price}/<span className="text-gray-600">month</span></h1>
                           
                            <div className="flex items-center space-x-2">
                                {/* <StarIcon className="h-5 text-red-400"/> */}
                                 <h3 className="font-serif font-bold">Available Immediately </h3>
                            </div>
                        </div>

                        <div className="flex space-x-5 justify-center ml-9">
                            <div className="flex-col  px-auto justify-center rounded-2xl px-5">
                                <h3 className="">First name</h3>
                                <input type="text" placeholder="First Name" className=" rounded-2xl focus:outline-none"/>
                            </div>

                            <div className="flex-col px-auto justify-center rounded-2xl px-5 border-b">
                                <div className="mx-auto">
                                    <h3 className="">Last Name</h3>
                                    <input type="text" placeholder="Last Name" className="rounded-2xl focus:outline-none"/>
                                </div>
                                
                            </div>

                            
                        </div>

                        <div className="flex justify-center border-b py-2">
                            <div className="flex-col">
                                <h3 className="font-serif font-semibold text-center">Email</h3>
                                <input className="border rounded-2xl focus:outline-none p-2" type="email" placeholder="Email Address"/>
                            </div>
                        </div>

                        <div className="flex justify-center">
                        <button className="rounded-lg bg-black hover:bg-white hover:text-black hover:border-2   text-white bg-red px-10 py-4 shadow-md font-bold my-3 hover:shadow-xl  transition-all duration-500 ease-out active:scale-90">Make Inquiry</button>
                        </div>


                    </div>
                </div>
            </section>

            </div>
        </div>
    )
}

export default HouseDetailPage
