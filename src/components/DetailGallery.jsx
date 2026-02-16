import { useContext, useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineClockCircle } from 'react-icons/ai';
import { BsFillPinFill, BsWhatsapp } from 'react-icons/bs';
import { TbManualGearbox } from "react-icons/tb";
import OrderPlaceModal from './OrderPlaceModal';
import { useEffect } from 'react';
import RecommendedCard from './RecommendedCard';
import { FetchedCarsContext } from './context/CarCardContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firestore';
import Image from 'next/image';

function DetailGallery({ car, images, test, product }) {


    const [selectedImage, setSelectedImage] = useState(product?product.images[0]:"");
    const [cars, setCars] = useContext(FetchedCarsContext);
    const [counter, setCounter] = useState();
    const [open, setOpen] = useState(false);

    const handleImageClick = (image) => {
      setSelectedImage(image);
    };
  

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
    
      setOpen(false);
    };

    useEffect(() => {
      console.log("Product name", product)
    },[])

    useEffect(() => {
      const fetchData = async () => {
        const carsSnapshot = await getDocs(collection(db, 'cars'));
        const carsData = carsSnapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          // setCarId(id);
          return { id, ...data };
        });
    
        setCars(carsData);
        // setLoading(false);

      };    

      fetchData();
    
    },[])
    return (
      <div className=" lg:px-[24px] lg:pt-[100px] block lg:flex bg-gray-100 pt-[100px] ">

  {/* <OrderPlaceModal open={open} handleClose={handleClose}/> */}

        {/* Left side */}
        <div className="lg:w-[800px] block "> 
          <div className="flex justify-center lg:block ">
          <img className="object-cover h-[231px] w-[350px]  lg:h-[500px] lg:w-[100%]" src={selectedImage} alt="Selected Image" />

          </div>

  
          <div className=" flex-col bg-white mx-[10px]">
            <div className="flex space-x-[15px] pt-[20px] overflow-x-scroll">
              {product?.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  onClick={() => handleImageClick(image)}
                  className="lg:w-40 lg:h-40 w-[62px] h-[62px] ml-[25px] object-cover cursor-pointer"
                />
              ))}
            </div>


            <div className="block px-5 py-2">
              <h1 className="text-[20px] lg:text-[32px] text-gray-900 font-semibold ">{product.make} {product.model} {product.year&&product.year}</h1>

              <div className="flex items-center space-x-[16px] mt-[15px] whitespace-nowrap">
                  

                  <div className="flex items-center space-x-[5px]">
                      <BsFillPinFill className="text-[20px] text-gray-500" />
                      <p className="text-[15px] text-gray-500 font-[600]">Bujumbura</p>
                  </div>
              </div>

              <hr className="my-[15px]"/>
              
              <div className="flex space-x-[12px]">
                  <div className="flex space-x-[5px] items-center">
                    <TbManualGearbox className="text-[25px] text-gray-500 border  rounded-full px-[2px] py-[2px]"/>
                    <p className="text-[15px] text-gray-500 font-[600]">{product.transmission?product.transmission:"Automatic"}</p>

                  </div>

                  <div className="flex space-x-[5px] items-center">
                    <AiOutlineClockCircle className="text-[25px] text-gray-500 px-[2px] py-[2px]"/>
                    <p className="text-[15px] text-gray-500 font-[600]">{product.mileage} {test} Kms</p>

                  </div>
              </div>

              {/* <p className="mt-[15px] font-serif text-gray-700 leading-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p> */}

              
            
              <div className="bg-white px-[16px] py-[10px] mt-[10px]  lg:w-[250px] flex-col space-y-[12px] align-middle">
                  

                 
                  {/* Row start */}
                  <div className="flex justify-between items-center">
                      <div className="block space-y[8px]">
                          <p className="font-[500] font-serif text-[15px]">Make</p>
                          <p className="font-[400] text-gray-700 text-[12px]">{product.make}</p>
                      </div>

                      <div className="block space-y[8px]">
                          <p className="font-[500] font-serif text-[15px]">Model</p>
                          <p className="font-[400] text-gray-700 text-[12px]">{product.model}</p>
                      </div>
                  </div>

                  {/* Row start */}
                  <div className="flex justify-between items-center">
                      <div className="block space-y[8px]">
                          <p className="font-[500] font-serif text-[15px]">Year</p>
                          <p className="font-[400] text-gray-700 text-[12px]">{product.year?product.year:"N/A"}</p>
                      </div>

                      <div className="block space-y[8px]">
                          <p className="font-[500] font-serif text-[15px]">Colour</p>
                          <p className="font-[400] text-gray-700 text-[12px]">{product.colour?product.colour:"unavailable"}</p>
                      </div>
                  </div>


          

                  <div className="flex justify-between items-center ">
                      <div className="block space-y[8px]">
                          <p className="font-[500] font-serif text-[15px]">Registered</p>
                          <p className="font-[400] text-gray-700 text-[12px]">Yes</p>
                      </div>

                      <div className="block space-y[8px]">
                          <p className="font-[500] font-serif text-[15px]">Fuel--</p>
                          <p className="font-[400] text-gray-700 text-[12px]">{product.type&&product.type}</p>
                      </div>
                  </div>



              </div>
            </div>
          </div>
        


          {/* Description card */}

        
        </div>


        {/* Right side */}

        <div className="lg:ml-[40px] block space-y-[20px] ">
          {/* Top card */}
          <div className=" lg:shadow-lg  shadow-md flex justify-center  h-[150px] lg:w-[400px] pt-[20px] bg-white mx-[10px] ">
              <div className="block">
                <p className="text-gray-900 text-[32px] font-semibold whitespace-nowrap text-center">BiF {product.price}</p>
                <a target="_blank" href={`https://wa.me/+25769571109?text=Hello%20I%20would%20like%20more%20information%20about%20this%20${product.make}%20${product.model}%20${product.year&&product.year} listed on your site%20%0AThe link is https://www.gurexltd.com/${product.id}`}>
                <button className="h-[40px] w-[256px] text-[#F75D34] mx-[16px] bg-white border border-[#F75D34] text-[12px] mt-[16px] cursor-pointer hover:bg-[#F75D34] hover:text-gray-100 transform transition-all duration-300 ease-out">Make an offer</button>

                </a>

              </div>
             
          </div>


              {/* Bottom card */}
          <div className="rounded-[4px] lg:w-[400px]  block lg:shadow-lg pt-[10px] pb-[15px] px-[8px] bg-white">
              <div className="flex justify-center space-x-[10px] items-center">
              <Image className="bg-white rounded-full" src="https://cdn.discordapp.com/attachments/817048198022430761/1192528627535970314/20240104_124658.jpg?ex=65a967d4&is=6596f2d4&hm=f4df803f58bc37f0b5f80f01c1cff9269b7bed035986ac413f965249312cb604&" height={50} width={50} />

                  <div className="block space-y-[8px] align-middle">
                    <p className="text-[24px] font-[500] text-gray-900">Muhira Updates Verified</p>
                    <div className="bg-gray-100 px-[2px] py-[8px]  flex items-center space-x-[4px]">
                      <AiOutlineCheckCircle className="text-green-500 text-[30px]" />
                      <p className="text-gray-900 font-[700] text-[12px] w-[100px] text-center">Verified Seller</p>
                    </div>

                  </div>
              </div>

              <div className="flex justify-center">
                <div className="block space-y-[20px]">
                <a target="_blank" href={`https://wa.me/+25769571109?text=Hello%20I%20would%20like%20more%20information%20about%20this%20${product.make}${product.model}${product.year} listed on your site%20%0AThe link is https://www.gurexltd.com/${product.id}`}>
                    <div  className="h-[40px] w-[256px] text-gray-100 mx-[16px] mt-[25px]  text-[12px]  cursor-pointer bg-black hover:bg-white hover:text-gray-900 hover:border hover:border-black transform transition-all duration-300 ease-out flex items-center justify-center"><span>Chat with Us </span><BsWhatsapp className="ml-[8px] text-[12px]"/></div>

                  </a>
                </div>
                
              </div>


          </div>

          
        </div>
          <div className="block lg:hidden">
            <p className="text-[32px] font-[700] ml-[20px] text-gray-700 my-[20px]">Explore other Vehicles</p>
            <div className="flex justify-center">
              <div className="grid grid-cols-2 gap-[10px]  items-center align-middle mx-auto">
                    {cars.map((car) => (
                  <RecommendedCard key={car.id} title={car.make} subtitle={car.model} price={car.price} image={car.images[0]} link={car.id}/>


                    ))}
                </div>
          </div>
        </div>
       
      
        


       
      </div>
    );
}

export default DetailGallery