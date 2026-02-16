import React from 'react'
import Image from "next/image";
import { easeIn, motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

function CarAccesoriesHero() {

  const [ref, inView] = useInView({
    triggerOnce: false,
  });

  const variants = {
    hidden: { opacity: 0 },
    visible: { scale:[1,2,2,3,1], opacity:1, y:0,  },
  };

  const radius = {
    rotate:{ borderRadius: ["20%","20%","50%","80%","20%"],}
  }

  const options = { 
    hidden:{opacity:0},
    visible:{scale:1, opacity:1,y:0,}
  };
  return (
    <div>
        <div className="absolute h-[100%] w-[100%]">
            <Image className="object-cover" src="https://cdn.discordapp.com/attachments/817048198022430761/1203422505595834449/pexels-pixabay-33488.jpg?ex=65d1098b&is=65be948b&hm=0384f2b104152d01e55da350391c8ff8a040383c485230ef820b40dee17e36fc&" fill   />

            <motion.div 
            initial={{
              opacity:0,
              x:-100
            }}

            animate={{
              opacity:1,
              x:0,
              
              borderRadius: ["20%","20%","50%","20%","40%","80%","20%","100%",],
            }}

            transition={{
              ease:easeIn,
              duration:6,
              delay:0.5
            }}
            className="relative block pt-[20px] align-middle bg-yellow-500 w-[100px] h-[100px] -bottom-[55%] -right-[70%] rounded-full">
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
            className=" -bottom-[] lg:-bottom-[20%] lg:-left-[30%] bg-gray-950 bg-opacity-50 border-r-8 border-r-yellow-500  ">
                <motion.p
                  ref={ref}
                  initial={{y:200}}
                  animate={inView ? 'visible':"hidden"}
                  variants={variants}
                  transition={{duration:5.0 , type:"spring"}}
                
                className="text-[40px] text-white lg:text-[50px] capitalize font-[700]">GREAT DEALS ON</motion.p>
              
                <motion.p
                  ref={ref}
                  initial={{opacit:0, y:-100}}
                  
                  animate={{scale:1, opacity:1,y:0,}}
                 
                  transition={{duration:5.0, type:"spring"}} className="text-[40px] text-yellow-500 lg:text-[50px] capitalize font-[700]">Car Accessories!
                  
                  </motion.p>

            </motion.div>
            <button className="bg-green-900 h-[40px] w-[100px] text-gray-200 relative -bottom-[150px] lg:-bottom-[40%]">Shop Now</button>
        </div>
    </div>
  )
}

export default CarAccesoriesHero