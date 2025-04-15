import React, { useState } from "react";
import prisonImage from "../../src/assets/lock.png"; // Add the correct path for the prison image
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 
const HomePage = () => {
    const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
   const [alert, setAlert] = useState({ type: '', message: '' });


  
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: '', message: '' }), 5000);
};
  const handleLogin = async(e) => {
    e.preventDefault();
try{
  const Subject='Login Successful - Crime Management System'
  const Loginmessage=`Dear user,

    You have successfully logged into the Crime Management System.
    
    "Don't worry, we are with you every step of the way!"
    
    If this wasn’t you, please reset your password immediately or contact us at [departmentofcrime4049@gmail.com].
    
    Your safety is our priority.
    
    Best regards,
    Crime Management System Team`
const Response=await axios.post('http://localhost:8080/login',{username:username,passwordHash:password})
console.log(Response.data);
sessionStorage.setItem('Name',Response.data.Name)
sessionStorage.setItem('Email',Response.data.Email)
sessionStorage.setItem('contact',Response.data.contactNumber)
console.log(Response.data.contactNumber);

await axios.post('http://localhost:8080/sendGmail', {
  gmail: Response.data.Email,
  text: Loginmessage,
  Subject: Subject,
});
showAlert('success', 'Login Successfully !');
const decoded = jwtDecode(Response.data.AccessToken);
console.log(decoded);
sessionStorage.setItem('UserName',decoded.username);
sessionStorage.setItem('Role',decoded.role);
sessionStorage.setItem('Token',Response.data.AccessToken);
sessionStorage.setItem('Pincode',Response.data.Pincode)
setTimeout(()=>{
  const role =sessionStorage.getItem('Role')
  console.log();
  
 if (role === 'user') {
  navigate('/')
  }
  
  else if (role === 'cyberofficer'){
    navigate('/cybercrime/cybercrimehome')
  }
  else if (role === 'murderofficer'){
    navigate('/murder/murderhome')
  }
  else if (role === 'missingofficer'){
    navigate('/missing/missinghome')
  }
  else if (role === 'Theftofficer'){
    navigate('/theft/thefthome')
  }
  else{
    navigate('/')
  }


 
},4000)
}
catch(error){
  console.log(error?.response?.data?.message);
    console.log(error);
    showAlert('error', error?.response?.data?.message);
    
}
  
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
     <div className="bg-[#010000]  h-[700px] flex items-center justify-center relative top-16 space-y-20 mb-[64px]" >
  {/* Dark Overlay */}
  <div className="absolute top-0 left-0 w-full h-full bg-[#0b0909] opacity-80 z-0"></div>

  <div className="flex w-full max-w-6xl bg-[#131313] rounded-lg shadow-2xl z-10 overflow-hidden space-x-10"> 
    {/* Left Section - Circle Image */}
    <div className="w-1/2 flex flex-col justify-center items-center text-center space-y-4">
      <img
        src={prisonImage}
        alt="Prison"
        className="w-48 h-48 rounded-full object-cover border-4 border-red-600" // Circle image
      />
      <p className="text-white text-lg font-semibold">
        "Speak up for justice, take a stand against crime—because change begins with action."
      </p>
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
                <label className="block text-white font-medium">UserName :</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-white font-medium">Password :</label>
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
      {alert?.message && (
                <div className={`absolute top-2 right-2 max-w-xs z-50 p-4 rounded ${alert?.type === 'success' ? 'bg-green-500' : 'bg-red-600'}`}>
                    <p className="text-white">{alert.message}</p>
                </div>
            )}
       
    </>
  );
};

export default HomePage;
