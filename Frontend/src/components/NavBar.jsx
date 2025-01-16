import React, { useState } from 'react'
import './NavBar.css'
import {FaHome, FaInfoCircle, FaUserCircle, FaSignOutAlt, FaBars } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { RiProgress3Fill } from "react-icons/ri";

export default function NavBar() {
  const [user,Setuser]=useState(true)
  return (
    <div>
       <nav className="navbar">
      <div className="navbar-logo">Crime Management System</div>
      <input type="checkbox" id="toggle" className="navbar-toggle" />
      <label htmlFor="toggle" className="navbar-menu-icon">
        <FaBars />
      </label>
      <ul className="navbar-links">
        <li>
          <a href="#">
            <FaHome className="navbar-icon" /> Home
          </a>
        </li>
        <li>
          <a href="#about">
            <FaInfoCircle className="navbar-icon" /> About
          </a>
        </li>
        <li>
          <a href="#profile">
            <FaUserCircle className="navbar-icon" /> Profile
          </a>
        </li>
        <li>
          <a href="#Status">
          <RiProgress3Fill className="navbar-icon" />Status
          </a>
        </li>
        <li>
          {user? <a href="#logout" className="logout">   
            <FaSignOutAlt className="navbar-icon" /> Logout  </a>:  <a href="#Login" className="Login"> 
            <IoIosLogIn /> Login </a> }
         
        </li>
      </ul>
    </nav>
    </div>
  )
}
