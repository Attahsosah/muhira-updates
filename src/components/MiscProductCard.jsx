import { useRouter } from 'next/router';
import { useContext } from 'react';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { 
  MiscDescriptionContext, 
  MiscDiscountContext, 
  MiscFeaturedContext, 
  MiscIdContext, 
  MiscImagesContext, 
  MiscOfferContext, 
  MiscOpenContext, 
  MiscPriceContext, 
  MiscTitleContext, 
  MiscWasContext, 
  TaskContext,
  MiscTypeContext,       // Added
  MiscSubcategoryContext // Added
} from "./context/MiscContext";
import { DeleteContext, DeleteIdContext, DeleteNameContext, DeleteTypeContext } from './context/CrudContext';
import { useSession } from 'next-auth/react';

function MiscProductCard({ 
    discount, 
    title, 
    price, 
    was, 
    image, 
    id, 
    type, 
    description, 
    featured, 
    images, 
    offer, 
    category,
    subcategory // Added prop from Firestore
}) {
    const router = useRouter();
    const { data: session } = useSession();
    
    // Contexts for Updating
    const [, setmiscOpen] = useContext(MiscOpenContext);
    const [, setTask] = useContext(TaskContext);
    const [, setmiscTitle] = useContext(MiscTitleContext);
    const [, setmiscDescription] = useContext(MiscDescriptionContext);
    const [, setmiscDiscount] = useContext(MiscDiscountContext);
    const [, setmiscFeatured] = useContext(MiscFeaturedContext);
    const [, setmiscOffer] = useContext(MiscOfferContext);
    const [, setmiscPrice] = useContext(MiscPriceContext);
    const [, setmiscWas] = useContext(MiscWasContext);
    const [, setmiscImages] = useContext(MiscImagesContext);
    const [, setmiscId] = useContext(MiscIdContext);
    const [, setMiscType] = useContext(MiscTypeContext);               // Added
    const [, setMiscSubcategory] = useContext(MiscSubcategoryContext); // Added

    // Delete functionality state
    const [, setDeleteOpen] = useContext(DeleteContext);
    const [, setDeleteId] = useContext(DeleteIdContext);
    const [, setDeleteType] = useContext(DeleteTypeContext);
    const [, setDeleteName] = useContext(DeleteNameContext);

    const handleCardClick = () => {
        router.push(`/misc/${id}`);
    };

    const onModalOpen = (e) => {
        e.stopPropagation(); 
        
        // Populate standard fields
        setmiscTitle(title);
        setmiscDescription(description);
        setmiscDiscount(discount);
        setmiscFeatured(featured);
        setmiscImages(images);
        setmiscOffer(offer);
        setmiscPrice(price);
        setmiscWas(was);
        setmiscId(id);

        // Populate Category and Subcategory fields
        setMiscType(type);               // Ensures the dropdown shows 'Electronics' or 'Advertising'
        setMiscSubcategory(subcategory); // Ensures the dropdown selects 'Helmets'
        
        setTask("updateMiscellenious");
        setmiscOpen(true);
    };

    const onDeleteClick = (e) => {
        e.stopPropagation();
        setDeleteOpen(true);
        setDeleteType("Misc Category Item");
        setDeleteName("misc");
        setDeleteId(id);
    };

    return (
        <div 
            onClick={handleCardClick}
            className="w-full shadow-md rounded-xl overflow-hidden bg-white hover:shadow-2xl cursor-pointer transition-all duration-500 ease-out flex flex-col h-full"
        >
            <div className="relative w-full pt-[75%] bg-gray-50"> 
                <img 
                    className="absolute top-0 left-0 w-full h-full object-contain p-4" 
                    src={image} 
                    alt={title}
                />
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-green-600 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                        {category || type}
                    </span>
                    
                    {session && (
                        <div className="flex gap-3">
                            <FiEdit 
                                onClick={onModalOpen} 
                                className="text-blue-500 hover:text-blue-700 transition-colors text-lg"
                            />
                            <MdDelete 
                                onClick={onDeleteClick} 
                                className="text-red-500 hover:text-red-700 transition-colors text-lg"
                            />
                        </div>
                    )}
                </div>

                <p className="text-gray-800 font-bold text-sm md:text-base line-clamp-2 min-h-[2.5rem]">
                    {title}
                </p>

                <div className="mt-auto pt-3">
                    <p className="text-[#bd8b31] font-extrabold text-sm md:text-lg">
                        BIF {Number(price).toLocaleString()}
                    </p>
                    
                    <button className="w-full mt-3 py-2 text-[#bd8b31] border border-[#bd8b31] rounded-lg text-xs font-bold hover:bg-[#bd8b31] hover:text-white transition-all">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MiscProductCard;