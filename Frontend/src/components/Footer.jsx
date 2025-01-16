import React from 'react'
import Footer from './Footer.css'

export default function CFooter() {
    return (
        <div>

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

        </div>
    )
}
