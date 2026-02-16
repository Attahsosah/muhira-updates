"use client";

import { addDoc, collection } from "firebase/firestore";
import { forwardRef, useContext, useEffect, useState } from "react";
import { db } from "../../firestore";
import MuiAlert from '@mui/material/Alert';
import { NewsletterOpenContext, SnackBarContext, SubmittedContext } from "./context/MiscContext";
import Image from "next/image";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Newsletter() {
    const [email, setEmail] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useContext(SnackBarContext);
    const [, setOpen] = useContext(NewsletterOpenContext); // Removed unused variable
    const [submitted, setSubmitted] = useContext(SubmittedContext);

    const addEmail = async () => {
        if (!email) return;
        try {
            await addDoc(collection(db, 'emails'), { email });
            setOpen(false);
            setSnackbarOpen(true);
            setSubmitted(true);
            setEmail('');
            console.log("Email successfully added!");
        } catch (error) {
            console.error("Error adding email:", error);
        }
    };

    return (
        <div id="newsletter" className="md:flex mb-5">
            <div className="bg-black bg-opacity-75 rounded-[4px] lg:px-20 md:pt-16 px-[8px] py-16 md:pb-10 flex-col mt-36 z-auto w-[80vw] mx-[30px]">
                
                <div className="flex justify-center">
                    <Image 
                        className="bg-white rounded-full" 
                        src="https://i.ibb.co/wwxhMbg/IMG-5257.jpg" 
                        height={50} 
                        width={50} 
                        alt="Muhira Logo" 
                    />
                </div>

                <div className="flex justify-center">
                    <h1 className="text-yellow-600 text-[24px] lg:text-3xl font-serif font-extrabold text-center uppercase tracking-wider">
                        Join Our Mailing List
                    </h1>
                </div>

                <div className="flex justify-center">
                    <p className="text-gray-200 font-serif text-[12px] font-[400] mt-5 lg:text-sm leading-6 text-center">
                        Sign up for our newsletter to remain up to date with the latest news on commerce in Burundi!
                    </p>
                </div>

                <div className="flex justify-center mt-10">
                    <input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-1 bg-transparent font-serif md:w-[300px] text-gray-100 border-b border-white focus:outline-none focus:border-coolYellow transform transition duration-300 ease-out" 
                        type="email" 
                        placeholder="Enter your email here"
                    />
                </div>
                
                <div className="flex justify-center mt-10">
                    <button  
                        onClick={addEmail} 
                        className="bg-white text-black border border-coolYellowFocus p-3 hover:bg-transparent font-serif font-extrabold hover:text-coolYellow transform transition duration-300 ease-out active:scale-90"
                    >
                        SUBMIT
                    </button>
                </div>
            </div>  
        </div>
    );
}

export default Newsletter;