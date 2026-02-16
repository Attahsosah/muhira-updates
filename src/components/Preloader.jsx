import React, { useContext, useEffect, useState } from "react";
import { BiRadar } from "react-icons/bi";
import { motion } from "framer-motion";
import Image from "next/image";
import { PageLoadedContext } from "./context/CarCardContext";

function Preloader() {
  const [loaded, setLoaded] = useContext(PageLoadedContext);

  const resetLoading = () => {
    setLoaded(true);
  };

    useEffect(() => {
      const timer = setTimeout(() => resetLoading(), 4000);
      return () => clearTimeout(timer);
    }, []);
  return (
    <div
      className={
        loaded
          ? "hidden"
          : "relative left-0 top-0 z-[60]  flex h-[100vh] w-screen items-center justify-center  overflow-hidden bg-black transition-all"
      }
    >
      <div className="flex-col">
        <div className="flex items-center">
          <motion.div
            initial={{
              opacity: 0,
              translateX: 500,
            }}
            animate={{
              opacity: 1,
              translateX: 0,
            }}
            transition={{
              duration: 1.5,
            }}
          >
            <Image className="bg-white rounded-full" src="https://i.ibb.co/tPzgSFkJ/mu-Logo.jpg" height={200} width={200} />
          </motion.div>
          {/* <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 2,
              delay: 1,
            }}
            className="text-white font-serif text-[35px] ml-[5px]"
          >
            MU  <span className="text-yellow-400">HIRA</span>

          </motion.p>
          <br></br>
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 2,
              delay: 1,
            }}
            className=" text-white font-serif text-[23px] ml-[5px]"
          >
            UPDATES

          </motion.p> */}
          
        </div>

        {/* <div className="mt-10 flex justify-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1.5,
            }}
            className="text-gray-100 font-serif text-[16px] text-center animate-pulse mx-auto ml-[35px]"
          >
Making Every Click Count.          </motion.p>
        </div> */}
      </div>
    </div>
  );
}

export default Preloader;