import { useState, useEffect } from 'react';
import { 
  AiOutlineCheckCircle, 
  AiOutlineClockCircle, 
  AiFillHeart, 
  AiFillStar 
} from 'react-icons/ai';
import { BsWhatsapp, BsFillPinFill } from "react-icons/bs";
import { TbManualGearbox } from "react-icons/tb";
import OrderPlaceModal from './OrderPlaceModal';
import PayPalButton from "./PayPalButton";
import RecommendedCard from "./RecommendedCard";

function DetailGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(product?.images ? product.images[0] : "");
  const [open, setOpen] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleImageClick = (image) => setSelectedImage(image);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  useEffect(() => {
    if (product?.images) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  return (
    <div className="block bg-gray-50 pb-20">
      {/* Top Section: Images & Price */}
      <div className="px-[24px] pt-[100px] block lg:flex lg:justify-center items-start bg-gray-100 pb-10">
        <OrderPlaceModal open={open} handleClose={handleClose} />

        {/* Left: Gallery */}
        <div className="lg:w-[500px] block">
          <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-center">
            <img className="object-contain h-[231px] w-[350px] lg:h-[500px] lg:w-[100%]" src={selectedImage} alt="Selected" />
          </div>
          <div className="flex-col bg-white mt-4 rounded-xl p-2 shadow-sm">
            <div className="flex space-x-[15px] pt-[20px] overflow-x-scroll scrollbar-hide">
              {product?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  onClick={() => handleImageClick(image)}
                  className={`w-20 h-20 object-fill cursor-pointer rounded-lg border-2 ${selectedImage === image ? 'border-[#bd8b31]' : 'border-transparent'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="lg:ml-[40px] block space-y-[20px] relative mt-10 lg:mt-0">
          <AiFillHeart className="absolute top-[30px] right-[30px] text-[18px] text-gray-700 hover:text-[#F75D34] transition-all duration-500 cursor-pointer z-10" />
          
          <div className="rounded-[4px] lg:shadow-lg flex justify-center lg:py-[20px] lg:w-[450px] pt-[20px] bg-white">
            <div className="block w-full px-6 text-center">
              <p className="text-gray-900 text-[32px] font-[400]">{product?.title}</p>
              <hr className="py-[10px] my-2"/>
              <p className="font-[500] text-[24px] mb-4">Bif {product?.price}</p>

              {!toggled && (
                <button onClick={() => setToggled(true)} className="h-[40px] w-[256px] text-[#F75D34] border border-[#F75D34] text-[12px] mb-4 hover:bg-[#F75D34] hover:text-white transition-all">
                  Buy now
                </button>
              )}
              {toggled && <div className="pb-4"><PayPalButton /></div>}
            </div>
          </div>

          {/* Seller Info */}
          <div className="rounded-[4px] lg:w-[450px] block lg:shadow-lg pt-[10px] pb-[15px] px-[8px] bg-white border border-gray-100">
            <div className="text-center space-y-4">
              <p className="text-[24px] font-[500] text-gray-900">Muhira Updates Official</p>
              <div className="bg-gray-100 px-4 py-2 inline-flex items-center space-x-2 rounded">
                <AiOutlineCheckCircle className="text-green-500 text-[24px]" />
                <p className="text-gray-900 font-[700] text-[12px]">Verified Company</p>
              </div>
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => <AiFillStar key={i} className="text-yellow-500 text-[25px]" />)}
              </div>
              <a target="_blank" href={`https://wa.me/+25769571109?text=Interested in ${product?.title}`}>
                <button className="h-[40px] w-[256px] bg-black text-white text-[12px] hover:bg-white hover:text-black border border-black transition-all flex justify-center items-center mx-auto">
                  Chat with Us <BsWhatsapp className="ml-2"/>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* NEW: Specs & Description */}
      <div className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-bold mb-4">Description</h3>
          <div className="bg-white p-8 rounded-xl border border-gray-100 text-gray-600 whitespace-pre-wrap">
            {product?.description || "No description available."}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">Specifications</h3>
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            {product?.specifications?.length > 0 ? (
              <table className="w-full">
                <tbody>
                  {product.specifications.map((spec, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-4 text-[10px] font-black text-gray-400 uppercase w-1/3">{spec.key}</td>
                      <td className="p-4 text-gray-900 font-medium">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <div className="p-10 text-center text-gray-400">No specs listed.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailGallery;