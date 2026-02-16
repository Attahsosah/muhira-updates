import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { BsMenuButton } from "react-icons/bs";
import { GiCarKey } from "react-icons/gi";
import { FaCar, FaHelmetSafety, FaHouse, FaMobile } from "react-icons/fa6";
import { LiaAirFreshenerSolid } from "react-icons/lia";

import { SelectedTypeContext } from "./context/MiscContext";
import { useRouter } from "next/router";

const Navbar = ({ link }) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState();

 const [scrolled, setScrolled] = useState(false);

 const [selectedType, setSelectedType] = useContext(SelectedTypeContext);

const router = useRouter();
// Done

  const handleCategoryClick = (selectedType) => {
    // Set the category in the component state or context if needed
    // ...

    // Use the router to navigate to the corresponding page
    router.push(`/miscType/${selectedType}`);
  };

  const showStar = () =>{
    if(window.scrollY>60){
        setScrolled(true)
    }
    else{
        setScrolled(false)   
    }
}

useEffect(() => {
  // Redeploy
  console.log("Session details", session?.user.name)
},[])

useEffect(function mount() {
    function onScroll() {
      console.log("scroll!");
    }

    window.addEventListener('scroll', showStar);

    return function unMount() {
      window.removeEventListener("scroll", showStar);
      // shut it .
    };
  });
  return (
    <div>

      {/* Large screen navbar */}
      <nav className={!scrolled ? "hidden lg:flex bg-black fixed top-0 z-[150] w-full  transition-all duration-500 ease-out":"hidden lg:flex bg-black/90 fixed top-0 z-[150] w-full transition-all duration-500 ease-out"}>
        <div className="container mx-auto px-4 ">
          <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-[#bd8b31] font-bold text-xl cursor-pointer p-2">

            <div className="flex items-center space-x-[8px]">
            <Image className="bg-white rounded-full " src="https://i.ibb.co/tPzgSFkJ/mu-Logo.jpg" height={50} width={50} />
               <p className="text-[#bd8b31] font-bold ">Muhira Updates </p> 
            </div>
          </Link>



          {/* Search bar */}
            {/* <div className="flex items-center space-x-[8px]">
              <input  placeholder="Search for anything you need" className="p-2 px-5 h-full width-6 flex-grow rounded flex-shrink rounded-l-md focus:outline-none" type="text" />
                    <AiOutlineSearch className="h-12 p-4 text-white"/>
            </div> */}
            <div className="flex">
              <Link
                href="/"
                className="text-gray-300 hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/carsmain"
                className="text-gray-300 hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Cars
              </Link>
            

              <Link
                href="/houses"
                className="text-gray-300 hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Houses
              </Link>




              {/* {
                !session && (
            <Link href="/api/auth/signin">
              <p
                className="text-gray-300 hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </p>
              </Link>
                )
              } */}
              
            
              {
                session && (
            <Link href="/api/auth/signin">
              <p
                onClick={() => signOut()}
                className="text-gray-300 hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </p>
              </Link>
                )
              }


           

            {session && (
              <Link href="/dashboard">
                  {/* <img className="h-[32px] w-[32px] rounded-full ml-[5px]" src={session?.user.image} /> */}

              </Link>
            )}

            
            
            </div>
          </div>
        </div>
      </nav>

            {/* Small screen Navbar */}
      <nav className="block lg:hidden fixed w-[100%] z-[130] top-0">
            <div className=" flex justify-between  py-[0px] px-[5px] w-[100%] bg-black">
              <Link href="/">
                <Image className="bg-white rounded-full" src="https://i.ibb.co/CbJfm8L/muhiralogo.jpg" height={50} width={50} />

              </Link>



              <h1 className="text-[#bd8b31] font-bold text-3xl">MUHIRA <h1 className="text-white">UPDATES</h1> </h1> 
             
            { !open && <AiOutlineMenu onClick={() => setOpen(!open)} className="text-gray-200 text-[50px] cursor-pointer"/>}
              { open && <AiOutlineClose onClick={() => setOpen(!open)} className="text-gray-200 text-[50px] cursor-pointer"/>}
            </div>
            
              <div className={open ? "h-screen w-[100%] bg-black pt-[60px] block transition-all duration-500 ease-in-out my-auto z-[50]":"hidden"}>
                <div className="flex justify-center mt-[5vh]">
                  <div className="block space-y-[50px]">
                    <div onClick={() => setOpen(false)} >
                      <Link href="/" className="flex ">
                        <FaHouse className="text-white text-lg  " />
                        <p className="text-gray-100 pl-[6px]">Home</p>

                      </Link>
                    </div>
                 
                    {/* <div onClick={() => setOpen(false)}>
                    

                      <Link href="/carsmain" className="flex ">
                      <FaCar  className="text-gray-400 text-lg  " />
                        <p className="text-gray-100 pl-[6px]">Vehicles</p>
                      </Link>
                    </div> */}

                    <div className="flex">

                        <Link href="/misc" className="flex ">

                        <FaMobile  className="text-gray-500 text-xl active:text-yellow-500 "/>

                        <p className="text-gray-100 pl-[6px]">Electronics</p>
                        </Link>


                    </div>
                  
                    <div onClick={() => handleCategoryClick("safety")} className="flex">
                     <FaHelmetSafety className="text-yellow-500 text-lg  " />

                      <p className="text-gray-100  pl-[6px]">Safety Equipment</p>
                    </div>
                    {/* <Link> */}
                    <div onClick={() => handleCategoryClick("accesories")} className="flex">

                    <LiaAirFreshenerSolid   className="text-green-900 text-xl  "/>

                    <p className="text-gray-100 pl-[6px]">Advertising Equipment</p>

                    </div>

                     
                      {/* <div className="flex ">
                        <Link href="/houses">
                          <FaHouse />

                          <p className="text-gray-100 pl-[6px] space-y-1"> Real Estate</p>
                      </Link>

                      </div> */}
                      {/* <div>

                      
                      <Link href="/#categories">


                      <p className="text-gray-100">About</p>
                    </Link>

                  </div> */}

                    {/* </Link> */}

                  
                    {/* <div onClick={() => setOpen(false)}>
                      <Link href="/api/auth/signin">
                        <p className="text-gray-100">Login</p>

                      </Link>
                    </div> */}

                  </div>
                </div>
              </div>

      </nav>

      
    </div>
    
  );
};

export default Navbar;
