import InfoCard from './InfoCard';


function Hero() {
  

  return (
    <div className="relative w-full mt-[] lg:mt-[50px] ">
        <img className="h-[80vh] w-full object-cover" src="https://i.ibb.co/tJJGx8m/pexels-junior-teixeira-1064069-2047905.jpg"/>

        <InfoCard />

        <div className="hidden  lg:block absolute top-[100px] right-0 lg:right-[290px]">
            <p className=" text-yellow-500 font-[700] text-[50px]"> Your Supply Chain Management in one minute.
</p>
            <div className=" absolute right-[200px] top-[200px] bg-yellow-400 h-[40px]  w-[40px] p-5 rounded-full text-gray-900">
                NEW!
            </div>
            <p className=" text-gray-100  text-[50px] font-[700]">IMPORT AND DOMESTIC!</p>


        </div>
    </div>
  )
}

export default Hero