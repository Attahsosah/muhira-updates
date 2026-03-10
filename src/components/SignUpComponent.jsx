import { useState } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firestore";

export default function SignUpComponent() {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    if (passwordOne !== passwordTwo) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, passwordOne);
      setSuccess(true);
      setEmail("");
      setPasswordOne("");
      setPasswordTwo("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center bg-coffee-beans bg-cover bg-no-repeat min-h-screen">
      <div className="bg-black text-gray-200 bg-opacity-70 rounded-2xl p-10 my-40 shadow-lg w-[300px] h-fit">
        <div className="flex-col space-y-4">
          <div className="py-3 border-b-2 mb-3 flex justify-center">
            <h3>Create Admin User</h3>
          </div>

          {error && (
            <div className="bg-red-600 rounded">
              <p className="py-3 px-3 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-700 rounded">
              <p className="py-3 px-3 text-sm">User created successfully. Remember to add their email to <code>ADMIN_EMAILS</code> in <code>.env.local</code> if they need admin access.</p>
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} className="flex-col items-center">
          <div className="flex-col group">
            <div className="flex justify-center">
              <label className="border-b border-blue-700 group-hover:border-green-400 transform transition duration-500 ease-in-out">
                Email
              </label>
            </div>
            <div className="flex space-x-2 px-5 py-1 justify-center">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="text-black rounded-lg p-2 focus:outline-none"
                required
                placeholder="Enter email"
              />
            </div>
          </div>

          <div className="flex-col group">
            <div className="flex justify-center pt-4">
              <label className="border-b border-blue-700 group-hover:border-green-400 transform transition duration-500 ease-in-out">
                Password
              </label>
            </div>
            <div className="flex space-x-2 px-5 py-1 justify-center">
              <input
                value={passwordOne}
                onChange={(e) => setPasswordOne(e.target.value)}
                type="password"
                className="text-black rounded-lg p-2 focus:outline-none"
                required
                placeholder="Enter password"
              />
            </div>
          </div>

          <div className="flex-col group">
            <div className="flex justify-center pt-4">
              <label className="border-b border-blue-700 group-hover:border-green-400 transform transition duration-500 ease-in-out">
                Confirm Password
              </label>
            </div>
            <div className="flex space-x-2 px-5 py-1 pb-5 justify-center">
              <input
                value={passwordTwo}
                onChange={(e) => setPasswordTwo(e.target.value)}
                type="password"
                className="text-black rounded-lg p-2 focus:outline-none"
                required
                placeholder="Confirm password"
              />
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-2">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="text-gray-400 rounded-2xl px-4 py-3 border border-gray-600 text-sm hover:border-gray-400 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-gray-200 rounded-2xl px-5 py-3 bg-purple-800 shadow-md font-bold hover:shadow-xl transform transition duration-200 active:scale-90"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
