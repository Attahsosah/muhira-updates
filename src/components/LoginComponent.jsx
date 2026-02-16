import { useContext, useRef, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { useRouter } from "next/router";
export default function LoginComponent(){

    const router = useRouter();

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    // const currentUser = useContext(AuthContext);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const { login }  = useAuth();


    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);



    async function handleSubmit(e) {
        e.preventDefault();


        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            router.push("/dashboard")
            // console.log('current user', currentUser.email)

        } catch(error) {
            console.error("error", error)
            setError("Failed to Sign in")
            // console.error((error) => error)
        }

        // To stop the customer from submitting the button
        setLoading(false)
    }
    return(
        <div>
            <div className="flex justify-center bg-coffee-beans bg-cover bg-no-repeat">
                <div className="bg-black text-gray-200 bg-opacity-70 rounded-2xl p-10 my-40 shadow-lg w-[300px]">
                    <div className="flex-col space-y-4">

                        <div className="py-3 border-b-2 mb-3 flex justify-center">
                            <h3>Admin Login</h3>
                            {/* {JSON.stringify(currentUser)} */}

                            {/* {currentUser.email} */}
                        </div>

                            {error && (
                                <div className="bg-red-600">
                                    <p className="py-5 px-3">{error}</p>
                                </div>
                            )}
                    </div>

                    <form onSubmit={handleSubmit} className="flex-col items-center ">

                        <div className=" flex-col group ">
                            <div className="flex justify-center ">
                                <label className="border-b border-blue-700 group-hover:border-green-400 transform transition duration-500 ease-in-out">Email</label>
                            </div>
                            <div className="flex space-x-2 px-5 py-1 justify-center">
                                 <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className=" text-black rounded-lg p-2 focus:outline-none" ref={emailRef} required placeholder="Enter your email here"/>
                            </div>

                        </div>
                    


                        <div className=" flex-col group">
                                <div className="flex justify-center pt-4">
                                    <label className="border-b border-blue-700 group-hover:border-green-400 transform transition duration-500 ease-in-out">Password</label>
                                </div>
                                <div className="flex space-x-2 px-5 py-1  pb-5 justify-center">
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" ref={passwordRef} className="text-black rounded-lg p-2 focus:outline-none" placeholder="Enter your password here" />
                                </div>

                            {/* { clicked && (
                                <p>Loading...</p>
                            )
                            } */}

                            </div>




                 

                        {/* <div className="flex space-x-2 p-5">
                            <label>Name:</label>
                            <input type="text" className="rounded-lg p-2" placeholder="Enter your username here"/>
                        </div> */}
                    
                        <div className="flex justify-center">
                            {/* <Link to="/expenses"> */}
                                <button  type="submit" className="text-gray-200 rounded-2xl px-5 py-3 bg-purple-800 shadow-md font-bold hover:shadow-xl transform transition duration-200 active:scale-90">Login</button>
                            {/* </Link> */}
                        </div>
                        
                        <div className="flex justify-center pb-5">
                            {/* <Link to="/register"> */}
                                    <h3 className="font-serif">Dont have an account? Sign up <strong className="cursor-pointer">here</strong></h3>
                            {/* </Link> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}