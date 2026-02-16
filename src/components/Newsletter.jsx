// import NewsletterForm from "./NewsletterForm"
import { addDoc, collection } from "firebase/firestore";
import { forwardRef, useContext, useEffect, useState } from "react";
import { db } from "../../firestore";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { NewsletterOpenContext, SnackBarContext, SubmittedContext } from "./context/MiscContext";
import Image from "next/image";


const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  
function Newsletter() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useContext(SnackBarContext);
    const [done, setDone] = useState(false);
    const [open, setOpen] = useContext(NewsletterOpenContext);
    const [submitted, setSubmitted] = useContext(SubmittedContext);

//   const handleClick = () => {
//     setOpen(true);
//   };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

  };

   const addEmail = async () => {
    await addDoc(collection(db, 'emails'), {email});
    setOpen(false);
    setSnackbarOpen(true);
    setSubmitted(true);
    console.log("Email succesfully added!")

    
};



    // const addEmail = (e) => {
    //     e.preventDefault()
    //     db.collection('newsletter').add({
    //         email:email,
    //     })

    //     console.log('email succesfullly added to firebase database!')
    //     setOpen(true);
    //     setEmail('');

    // }
      
    // console.log(email)


    const handleAdd = (e) =>{
        // The default in this case is the page reloading.
        console.log("done....added")

    }

    useEffect(() => {
        console.log("submitted", submitted)
    },[submitted])
    return (
        <div id="newsletter" className="md:flex mb-5">


  

            <div className=" bg-black bg-opacity-75 rounded-[4px] lg:px-20 md:pt-16 px-[8px] py-16 md:pb-10 flex-col  mt-36 z-auto   w-[80vw] mx-[30px]">
                {/* <img className="-z-[10] h-auto absolute w-auto" src="https://cdn.discordapp.com/attachments/839784544798638090/1105585019411505233/pexels-pixabay-164634.jpg" alt="newsletter background image"/> */}
                <div className=" flex justify-center">
                  <Image className="bg-white rounded-full " src="https://i.ibb.co/wwxhMbg/IMG-5257.jpg" height={50} width={50} />

                </div>
                <div className="flex justify-center">

                    <h1 className="text-yellow-600 text-[24px] lg:text-3xl font-serif font-extrabold text-center">JOIN OUR MAILING LIST</h1>

                </div>

                <div className="flex justify-center">
                    <p className="text-gray-200 font-serif text-[12px] font-[400] mt-5 lg:text-sm leading-6">Sign up for our newsletter to remain up to date with the latest news on commerce in Burundi!</p>
                </div>

                <div className="flex justify-center mt-10">
                    <input value={email} onChange={(e) => setEmail(e.target.value)}className="p-1 bg-transparent font-serif md:w-[300px] text-gray-100 border-b border-white focus:outline-none focus:border-coolYellow transform transition duration-300 ease-out " type="email" placeholder="Enter your email here"/>
                </div>
                
                <div className="flex justify-center mt-10">
                    <button  onClick={addEmail} className="bg-white text-black border border-coolYellowFocus p-3 hover:bg-transparent font-serif font-extrabold text-darkBrown hover:text-coolYellow transform transition duration-300 ease-out active:scale-90 hover:bg-white">SUBMIT</button>
                </div>

          
            </div>  
         
        </div>
    )
}

export default Newsletter