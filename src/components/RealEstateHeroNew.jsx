import React from 'react'
import Image from "next/image";
function RealEstateHeroNew() {
  return (
    <div>
        <div className="absolute h-[100%] w-[100%]">
            <Image className="object-cover" src="https://cdn.discordapp.com/attachments/817048198022430761/1176942333737046066/pexels-pixabay-276514.jpg?ex=6570b3f6&is=655e3ef6&hm=74e7f1cec88f45609da229957398a0c067d04107f805206230b0359e62a23c45&" fill   />

           <div className="relative bg-gray-500/70 py-[10px] px-[20px] w-[250px] -bottom-[40%] left-[30px]">
                
                <p className="font-[200] text-white text-[32px] tracking-wider">Find Y O U R Next Home </p>
                <p className="mt-[15px] font-[200] text-white text-[20px] tracking-wide">For the right Price</p>

                <hr className="bg-white h-[0.02em] mt-[10px]"/>
           </div>

           <button className="relative top-[300px] bg-black text-white px-[5px] py-[12px] tracking-wider font-[200] font-serif hover:bg-white hover:text-black transition-all duration-400 ease-out cursor-pointer ">VIEW LISTINGS</button>

        </div>

    </div>
  )
}

export default RealEstateHeroNew