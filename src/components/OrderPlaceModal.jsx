import React, { useContext, useEffect, useState } from 'react'
// import  Modal  from '@mui /Modal';
// import Box from '@mui/material/Box';
import { CardIdContext } from './context/CarCardContext';
import { addDoc, collection, doc, getDocs, onSnapshot, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firestore';
import { useSession } from 'next-auth/react';
function OrderPlaceModal({ open, handleClose }) {

    const [carId, setCarId] = useContext(CardIdContext);
    const [orders, setOrders] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [userImage, setUserImage] = useState("");
    const { data: session } = useSession();

   
    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        boxShadow: 24,
      
      
      }


      const placeOrder = async (e) => {
        e.preventDefault();

        

        await addDoc(collection(db, 'cars', carId, 'orders'),{
            name,
            email,
            message,
            userImage:session.user.image,
            timestamp:serverTimestamp(),
        })

        console.log("order placed");
        setName("");
        setEmail("");
        setMessage("");
    }

    
    



  return (
    <div>
        {/* <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box 
            sx={style}
            className="bg-white text-gray-800 focus:outline-none"
            >

                <div className="bg-black/[85%] py-[5px] px-10 block">
                    <div className="flex justify-center">
                        <p className="text-gray-400 font-[500] text-[25px]">Enter your info here</p>
                    </div>
                    <form className="block">    
                        <div className="grid grid-cols-2 gap-x-[10px] gap-y-[15px]">
                            <input className="p-2 rounded-[8px] font-serif text-black font-[400]" placeholder="First name" value={name} onChange={(e) => setName(e.target.value) }/>
                            <input className="p-2 rounded-[8px] font-serif text-black font-[400]" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value) }/>


                        </div>  
                        <div className="flex justify-center ">
                            <textarea className="mt-[20px] rounded-[8px]" placeholder="Message(optional)" value={message} onChange={(e) => setMessage(e.target.value) }/>

                        </div>


                        <div className="flex justify-center mt-[30px]">
                         <button  onClick={placeOrder} type="submit" className="bg-green-900 h-[40px] w-[100px] text-gray-200 relative -bottom-[40%]">Place Inquiry</button>

                        </div>


                    </form>
                </div>
            </Box>

        </Modal> */}

{/* Modal end */}</div>
  )
}

export default OrderPlaceModal