import { useState, useEffect } from 'react';
import { AiOutlineCheckCircle, AiFillHeart, AiFillStar } from 'react-icons/ai';
import { BsWhatsapp } from "react-icons/bs";
import PayPalButton from "./PayPalButton";
import Image from 'next/image';

function MiscDetailPage({ product }) {
    // State for the gallery
    const [selectedImage, setSelectedImage] = useState(product?.images ? product.images[0] : "");
    const [toggled, setToggled] = useState(false);

    // Sync selected image if product changes
    useEffect(() => {
        if (product?.images) {
            setSelectedImage(product.images[0]);
        }
    }, [product]);

    // Format currency helper
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US').format(price);
    };

    if (!product) return <div className="p-20 text-center">Loading product...</div>;

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Main Container */}
            <div className="max-w-7xl mx-auto px-4 pt-24 lg:pt-32 flex flex-col lg:flex-row gap-8">
                
                {/* LEFT SIDE: Image Gallery & Description */}
                <div className="flex-1 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Main Image Display */}
                        <div className="aspect-square w-full relative bg-white flex items-center justify-center p-4">
                            <img 
                                className="max-h-full max-w-full object-contain transition-all duration-500" 
                                src={selectedImage} 
                                alt={product.title} 
                            />
                        </div>

                        {/* Thumbnail Strip */}
                        <div className="p-4 border-t border-gray-50">
                            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                                {product?.images?.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(image)}
                                        className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all 
                                            ${selectedImage === image ? 'border-[#bd8b31]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={image} className="w-full h-full object-cover" alt={`Preview ${index}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Description Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Product Description</h3>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                            {product.description || "No description provided for this item."}
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE: Purchase & Seller Info */}
                <div className="lg:w-[400px] space-y-6">
                    {/* Primary Product Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 relative">
                        <button className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-50 transition-colors">
                            <AiFillHeart className="text-2xl text-gray-300 hover:text-red-500 transition-colors" />
                        </button>

                        <div className="mb-6">
                            {/* Handle the "accesories" typo here professionally */}
                            <span className="text-[#bd8b31] text-[10px] font-black uppercase tracking-[0.2em]">
                                {product.type === 'accesories' ? 'Advertising' : (product.type || 'Electronics')}
                            </span>
                            <h1 className="text-3xl font-black text-gray-900 mt-2 uppercase">
                                {product.title}
                            </h1>
                        </div>

                        <div className="flex flex-col mb-8">
                            <div className="flex items-baseline gap-3">
                                <p className="text-3xl font-black text-gray-900">
                                    BIF {formatPrice(product.price)}
                                </p>
                                {product.was && (
                                    <p className="text-lg text-gray-400 line-through">
                                        BIF {formatPrice(product.was)}
                                    </p>
                                )}
                            </div>
                            {product.discount && (
                                <span className="text-green-600 text-xs font-bold mt-1">
                                    You save {product.discount}%
                                </span>
                            )}
                        </div>

                        {!toggled ? (
                            <div className="space-y-3">
                                <a 
                                    target="_blank" 
                                    rel="noreferrer"
                                    href={`https://wa.me/+25769571109?text=Hello%20I%20would%20like%20more%20information%20about%20this%20${product.title}`}
                                    className="w-full flex items-center justify-center gap-3 bg-[#bd8b31] text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#a1772a] transition-all shadow-lg shadow-[#bd8b31]/20"
                                >
                                    Make Inquiry
                                </a>
                                <button 
                                    onClick={() => setToggled(true)}
                                    className="w-full text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:text-gray-900 transition-colors"
                                >
                                    Show Checkout Options
                                </button>
                            </div>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <PayPalButton />
                                <button onClick={() => setToggled(false)} className="w-full text-center text-xs mt-4 text-gray-400">Cancel</button>
                            </div>
                        )}
                    </div>

                    {/* Seller Verification Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-100">
                                <Image src="https://i.ibb.co/tPzgSFkJ/mu-Logo.jpg" height={48} width={48} alt="Logo" />
                            </div>
                            <div>
                                <p className="font-black text-gray-900 uppercase text-sm">Muhira Updates Official</p>
                                <div className="flex items-center gap-1 text-green-600">
                                    <AiOutlineCheckCircle />
                                    <span className="text-[10px] font-bold uppercase">Verified Company</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-1 mb-6 text-yellow-400">
                            {[...Array(5)].map((_, i) => <AiFillStar key={i} />)}
                        </div>

                        <a 
                            target="_blank" 
                            rel="noreferrer"
                            href={`https://wa.me/+25769571109?text=Hello%20I%20would%20like%20to%20chat%20about%20${product.title}`}
                            className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-800 transition-all"
                        >
                            <BsWhatsapp className="text-base" /> Chat with Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MiscDetailPage;