import { useContext, useRef, useState } from "react";
import { AuthContext, useAuth } from "../components/context/AuthContext";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";


export default function SignUpComponent(){


    const [email, setEmail] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const router = useRouter();
    const [error, setError] = useState(null);


    const onSubmit = event => {
        setError(null)
        //check if passwords match. If they do, create user in Firebase
        // and redirect to your logged in page.
        if(passwordOne === passwordTwo)
          createUserWithEmailAndPassword(email, passwordOne)
          .then(authUser => {
            console.log("Success. The user is created in Firebase")
            router.push("/dashboard");
          })
          .catch(error => {
            // An error occurred. Set error message to be displayed to user
            setError(error.message)
          });
        else
          setError("Password do not match")
        event.preventDefault();
      };
    return(
        <div>
            
            <div className="">
                {/* <TopBar /> */}
                <div className="flex space-x-[300px]">
                {/* <Sidebar /> */}


              

                    <div className="flex justify-center ">
                    <div className="bg-coolBrown text-gray-200 p-10 my-40 shadow-lg w-[300px]">
                    <div className="flex-col space-y-4">

                        <div className="py-3 border-b-2 mb-3 flex justify-center">
                            <h3>Add a new Admin User here</h3>
                            {/* {JSON.stringify(currentUser)} */}

                            {/* {currentUser.email} */}
                        </div>

                            {error && (
                                <div className="bg-red-600">
                                    <p className="py-5 px-3">{error}</p>
                                </div>
                            )}
                    </div>

                    <form onSubmit={onSubmit} className="flex-col items-center ">

                        <div className=" flex-col group ">
                            <div className="flex justify-center ">
                                <label className="border-b border-blue-700 group-hover:border-green-400 transform transition duration-500 ease-in-out">Email</label>
                            </div>
                            <div className="flex space-x-2 px-5 py-1 justify-center">
                                 <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className=" text-black rounded-lg p-2 focus:outline-none" required placeholder="Enter your email here"/>
                            </div>

                        </div>
                    


                        <div className=" flex-col group">
                                <div className="flex justify-center pt-4">
                                    <label className="border-b border-blue-700 group-hover:border-green-400 transform transition duration-500 ease-in-out">Password</label>
                                </div>
                                <div className="flex space-x-2 px-5 py-1  pb-5 justify-center">
                                    <input value={passwordOne} onChange={(e) => setPasswordOne(e.target.value)} type="password"  className="text-black rounded-lg p-2 focus:outline-none" placeholder="Enter your password here" />
                                </div>

                            </div>




                            <div className=" flex-col group">
                                <div className="flex justify-center pt-4">
                                    <label className="border-b border-blue-700 group-hover:border-green-400 transform transition duration-500 ease-in-out">Confirm Password</label>
                                </div>
                                <div className="flex space-x-2 px-5 py-1  pb-5 justify-center">
                                    <input value={passwordTwo} onChange={(e) => setPasswordTwo(e.target.value)} type="password"  className="text-black rounded-lg p-2 focus:outline-none" placeholder="Confirm your password here" />
                                </div>

                            </div>



                 

                        {/* <div className="flex space-x-2 p-5">
                            <label>Name:</label>
                            <input type="text" className="rounded-lg p-2" placeholder="Enter your username here"/>
                        </div> */}
                    
                        <div className="flex justify-center">
                            {/* <Link to="/expenses"> */}
                                <button  type="submit" href="/dashboard" className="text-gray-200 rounded-2xl px-5 py-3 bg-purple-800 shadow-md font-bold hover:shadow-xl transform transition duration-200 active:scale-90">Submit</button>
                            {/* </Link> */}
                        </div>
                      
                    </form>
                </div>
                </div>
                </div>
            </div>
           
            
        </div>
    )
}