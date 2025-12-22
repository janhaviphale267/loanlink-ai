// frontend/components/Login.jsx

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email === "rajesh.kumar@dummy.com" && password === "Rajesh@123") {
      onLogin();
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="h-screen w-screen relative flex">
      {/* LEFT BACKGROUND */}
      <div
        className="w-1/2 h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/login-bg.png')" }}
      />

      {/* RIGHT BACKGROUND */}
      <div className="w-1/2 h-full bg-gray-50" />

      {/* TOP RIGHT LOGO */}
      <div className="absolute top-6 right-8 flex items-center gap-2">
        <div className="w-9 h-9 bg-blue-600 text-white rounded-md flex items-center justify-center font-bold">
          LL
        </div>
        <span className="font-semibold text-gray-800">LoanLink AI</span>
      </div>

      {/* CENTER LOGIN CARD */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl w-[420px] max-w-[90%] p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Login to your LoanLink AI account
          </p>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="text-sm text-gray-700 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-4 relative">
            <label className="text-sm text-gray-700 block mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-500 mb-3">{error}</p>
          )}

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
          >
            Login
          </button>

          {/* FORGOT PASSWORD */}
          <div className="mt-4 text-right">
            <button className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-6 text-center">
            By logging in, you agree to our{" "}
            <span className="underline">Terms</span> &{" "}
            <span className="underline">Privacy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
