import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginComponent() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError("Failed to sign in. Check your credentials.");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="flex justify-center bg-coffee-beans bg-cover bg-no-repeat">
        <div className="bg-black text-gray-200 bg-opacity-70 rounded-2xl p-10 my-40 shadow-lg w-[300px]">
          <div className="flex-col space-y-4">
            <div className="py-3 border-b-2 mb-3 flex justify-center">
              <h3>Admin Login</h3>
            </div>

            {error && (
              <div className="bg-red-600">
                <p className="py-5 px-3">{error}</p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex-col items-center">
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
                  placeholder="Enter your email here"
                />
              </div>
            </div>

            <div className="flex-col group">
              <div className="flex justify-center pt-4">
                <label className="border-b border-blue-700 group-hover:border-green-400 transform transition duration-500 ease-in-out">
                  Password
                </label>
              </div>
              <div className="flex space-x-2 px-5 py-1 pb-5 justify-center">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="text-black rounded-lg p-2 focus:outline-none"
                  placeholder="Enter your password here"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="text-gray-200 rounded-2xl px-5 py-3 bg-purple-800 shadow-md font-bold hover:shadow-xl transform transition duration-200 active:scale-90 disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
