import React from 'react';
import './App.css'; // Optional: You can create an external CSS file
import { FaHome, FaInfoCircle, FaUserCircle, FaSignOutAlt, FaBars } from "react-icons/fa";
function App() {
  return (
    <>
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
          <a href="#logout" className="logout">
            <FaSignOutAlt className="navbar-icon" /> Logout
          </a>
        </li>
      </ul>
    </nav>
    <section class="main-content">
      <div className='main-home'>
  <div class="intro">
    <h1>Welcome to the Crime Management System</h1>
    <p>Your first step in reporting crimes efficiently and ensuring a safe community. Our platform provides a streamlined way to report incidents, track cases, and collaborate with law enforcement agencies.</p>
  </div>

  <div class="features">
    <h2>Key Features</h2>
    <div class="feature-item">
      <h3>Fast Crime Reporting</h3>
      <p>Easily report crimes and provide necessary details to help authorities take swift action.</p>
    </div>
    <div class="feature-item">
      <h3>Case Progress Tracking</h3>
      <p>Stay updated with the real-time status of your case and receive notifications about its progress.</p>
    </div>
    <div class="feature-item">
      <h3>Collaboration Across Departments</h3>
      <p>Departments can communicate and work together seamlessly to solve cases more efficiently.</p>
    </div>
  </div>
  </div>
</section>
    <footer>
  <div class="footer-wrapper">
    <div class="footer-logo">
      <h3>Crime Management System</h3>
    </div>
    <div class="footer-links">
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Contact</a>
    </div>
    <div class="footer-contact">
      <p>For inquiries, reach us at <a href="mailto:support@cms.com">support@cms.com</a></p>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2025 Crime Management System. All rights reserved.</p>
  </div>
</footer>
</>
  );
}

export default App