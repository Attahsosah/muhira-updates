import React from 'react'
import CarCard from './CarCard'

function CardSection() {

    // Make this component reusable by using props.
  return (
    <div className="hidden shadow-lg pb-[30px] rounded-[2px] lg:mx-[60px] lg:block  mt-[80px] overflow-x-scroll ">
        
        {/* Top title */}
        <p className="text-[#24272C] text-[23px] font-[500] mt-[20px] ml-[24px]">Our new arrivals</p>


        {/* Car cards (replace images later) */}
        <div className="flex justify-center">
        <div className="block align-middle lg:flex space-y-[20px] lg:space-y-0 lg:space-x-[20px] mt-[10.5px] lg:mx-[24px]">
          
          <CarCard title="Suzuki Swift" price="BIF 30M - 235M" image="https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Swift/7820/1675862859794/front-left-side-47.jpg" />
          <CarCard title="MG Comet EV" price="BIF 30M - 235M" image="https://stimg.cardekho.com/images/carexteriorimages/630x420/MG/Comet-EV/9391/1682077644177/front-left-side-47.jpg" />
          <CarCard title="Maruti Baleno" price="BIF 30M - 235M" image="https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Baleno/8674/1675858584706/front-left-side-47.jpg" />
          <CarCard title="Tata Tiago" price="BIF 30M - 235M" image="https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Tiago/7338/Tata-Tiago-XE/1660901953609/front-left-side-47.jpg" />



      </div>
        </div>
        
    </div>
  )
}

export default CardSection