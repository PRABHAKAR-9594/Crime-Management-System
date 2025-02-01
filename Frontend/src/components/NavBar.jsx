import React, { useState } from 'react';
import { FaHome, FaInfoCircle, FaUserCircle, FaSignOutAlt, FaBars } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { RiProgress3Fill } from "react-icons/ri";

export default function NavBar() {
  const [user, setUser ] = useState(true);

  return (
    <div>
      <nav className="flex justify-between items-center p-4 bg-black text-white fixed w-[100%]">
        <div className="text-2xl  font-bold text-[#ff0000]">Crime Management System</div>
        <input type="checkbox" id="toggle" className="hidden" />
        <label htmlFor="toggle" className="block md:hidden text-2xl cursor-pointer">
          <FaBars />
        </ label>
        <ul className="hidden md:flex space-x-5">
          <li>
            <a href="#" className="flex items-center text-white hover:text-[#ff0000] transition-colors">
              <FaHome className="mr-2" /> Home
            </a>
          </li>
          <li>
            <a href="#about" className="flex items-center text-white hover:text-[#ff0000] transition-colors">
              <FaInfoCircle className="mr-2" /> About
            </a>
          </li>
          <li>
            <a href="#profile" className="flex items-center text-white hover:text-[#ff0000] transition-colors">
              <FaUserCircle  className="mr-2" /> Profile
            </a>
          </li>
          <li>
            <a href="#Status" className="flex items-center text-white hover:text-[#ff0000] transition-colors">
              <RiProgress3Fill className="mr-2" /> Status
            </a>
          </li>
          <li>
            {user ? (
              <a href="#logout" className="flex items-center text-[#ff0000] hover:text-white transition-colors">
                <FaSignOutAlt className="mr-2" /> Logout
              </a>
            ) : (
              <a href="#Login" className="flex items-center text-white hover:text-[#ff0000] transition-colors">
                <IoIosLogIn className="mr-2" /> Login
              </a>
            )}
          </li>
        </ul>
        <ul className="flex md:hidden flex-col absolute top-16 right-0 bg-black w-full p-4">
          <li className="text-center my-2">
            <a href="#" className="flex items-center text-white hover:text-[#ff0000] transition-colors">
              <FaHome className="mr-2" /> Home
            </a>
          </li>
          <li className="text-center my-2">
            <a href="#about" className="flex items-center text-white hover:text-[#ff0000] transition-colors">
              <FaInfoCircle className="mr-2" /> About
            </a>
          </li>
          <li className="text-center my-2">
            <a href="#profile" className="flex items-center text-white hover:text-[#ff0000] transition-colors">
              <FaUserCircle  className="mr-2" /> Profile
            </a>
          </li>
          <li className="text-center my-2">
            <a href="#Status" className="flex items-center text-white hover:text-[#ff0000] transition-colors">
              <RiProgress3Fill className="mr-2" /> Status
            </a>
          </li>
          <li className="text-center my-2">
            {user ? (
              <a href="#logout" className="flex items-center text-[#ff0000] hover:text-white transition-colors">
                <FaSignOutAlt className="mr-2" /> Logout
              </a>
            ) : (
              <a href="#Login" className="flex items-center text-white hover:text-[#ff0000] transition-colors">
                <IoIosLogIn className="mr-2" /> Login 
              </a>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}