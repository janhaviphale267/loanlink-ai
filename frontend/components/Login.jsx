import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Login({ onLogin }) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email === "rajesh.kumar@dummy.com" && password === "Rajesh@123") {
      setError("");
      onLogin();
    } else {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="h-screen w-full flex overflow-hidden">
      {/* LEFT IMAGE SECTION */}
      <div className="w-1/2 h-full">
        <img
          src="/login-bg.png"
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT LOGIN SECTION */}
      <div className="w-1/2 flex items-center justify-center bg-[#f7f8fa] relative">
        {/* LOGO */}
        <div className="absolute top-6 right-8 flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-600 text-white rounded-md flex items-center justify-center font-semibold">
            LL
          </div>
          <span className="font-semibold text-gray-800">LoanLink AI</span>
        </div>

        {/* LOGIN CARD */}
        <div className="w-[420px] bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-1">Welcome Back</h2>
          <p className="text-sm text-gray-500 mb-6">
            Login to your LoanLink AI account
          </p>

          <label className="text-sm">Email</label>
          <input
            className="w-full border rounded px-3 py-2 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="text-sm">Password</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              className="w-full border rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={() => setShow(!show)}
              className="absolute right-3 top-2.5 text-gray-400"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white rounded py-2 mt-6 hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-sm text-blue-600 text-right mt-4 cursor-pointer">
            Forgot Password?
          </p>
        </div>
      </div>
    </div>
  );
}
