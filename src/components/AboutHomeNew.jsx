import React from 'react'
import Image from "next/image";
function AboutHomeNew() {
  return (
    <div className="lg:flex lg:justify-between lg:mx-[60px] lg:mt-[32px]">
        <div className="block lg:w-[50%]">
            <p className="text-[32px] text-gray-700 font-[700] text-center z-30">ABOUT US</p>
            <div className="bg-yellow-400 h-[0.06em]  mx-auto"/>

            <p className="text-gray-900 font-serif leading-10 mt-[20px]">At Muhira market, we are not just an eCommerce store; we are your reliable partner in bringing the world of shopping to your fingertips. Based in the heart of Burundi, we understand the unique needs of our community, and we are on a mission to redefine the online shopping experience.</p>
            <button className="bg-green-900 h-[40px] w-[100px] text-gray-200 mt-[20px] flex mx-auto text-center px-auto py-auto">Shop Now</button>
        </div>

        <div className="relative lg:w-[40vw] h-[350px]">
            <div className="w-[100%] h-[100%] bg-black/50 absolute z-50"/>
            <Image className="object-cover bg-fixed" src="https://cdn.discordapp.com/attachments/817048198022430761/1166252141632028672/pexels-photomix-company-101808.jpg?ex=6549cff2&is=65375af2&hm=9e03ec3a397f40bc619e2d43093582e7c14eb2c27160c9d08deabc82038eda26&" fill={true} />

        </div>
        
    </div>
  )
}

export default AboutHomeNew