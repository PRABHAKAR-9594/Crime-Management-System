import React, { useState } from "react";
import prisonImage from "../../src/assets/lock.png"; // Add the correct path for the prison image
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
  };

  const handleRegister = () => {
    console.log("Redirecting to registration...");
    // Add registration logic or redirect here
    navigate("/register");

  };

  const handleAlreadyRegistered = () => {
    console.log("Redirecting to login...");
    // Redirect or show login logic
  };

  return (
    <>
      <div className=" bg-black flex items-center justify-center relative top-16 space-y-20">
        {/* Dark Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-0"></div>

        <div className="flex w-full max-w-6xl bg-black rounded-lg shadow-2xl z-10 overflow-hidden space-x-10"> {/* Increased space between sections */}
          {/* Left Section - Circle Image */}
          <div className="w-1/2 flex justify-center items-center">
            <img
              src={prisonImage}
              alt="Prison"
              className="w-48 h-48 rounded-full object-cover border-4 border-red-600" // Circle image
            />
          </div>

          {/* Right Section - Login Form */}
          <div className="w-1/2 bg-black p-8 flex flex-col justify-center space-y-6">
            <h2 className="text-4xl font-extrabold text-red-600 text-center mb-6">
              Crime Management System
            </h2>
            <p className="text-lg text-white text-center mb-6">
              Already Registered ? Login Here
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-white font-medium">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-white font-medium">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a href="#" className="text-red-400 hover:text-red-500 text-sm">
                  Forgot your password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 bg-red-600 text-white font-extrabold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 ease-in-out"
              >
                Log In
              </button>
            </form>

            {/* New Member Registration */}
            <div className="text-center mt-6">
              <p className="text-white text-sm">
                Don't have an account?{" "}
                <button
                  onClick={handleRegister}
                  className="text-red-400 hover:text-red-500 cursor-pointer font-bold"
                >
                  Register here
                </button>
              </p>
            </div>

           
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
