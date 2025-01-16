import React from 'react'
import './Footer.css'
export default function Ufooter() {
  return (
    <div>
      <footer>
  <div className="footer-wrapper">
    <div className="footer-logo">
      <h3>Crime Management System</h3>
    </div>
    <div className="footer-links">
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Contact</a>
    </div>
    <div className="footer-contact">
      <p>For inquiries, reach us at <a href="mailto:support@cms.com">support@cms.com</a></p>
    </div>
  </div>
  <div className="footer-bottom">
    <p>&copy; 2025 Crime Management System. All rights reserved.</p>
  </div>
</footer>
    </div>
  )
}
