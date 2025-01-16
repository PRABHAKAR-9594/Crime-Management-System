import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldAlt,
  faSearch,
  faFolderOpen,
  faUser,
  faAmbulance,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import './Home.css';

export default function Home() {
  return (
    <div>
      <section className="main-content">
        <div className="main-home">
          {/* Main Heading with a Quote */}
          <div className="intro">
            <h1>Welcome to the Crime Management System</h1>
            <p className="quote">"Don't worry, we are with you every step of the way!"</p>
          </div>

          <div className="features">
            <div className="feature-item">
              <h3>
                <FontAwesomeIcon icon={faShieldAlt} /> Crime Reporting
              </h3>
              <p>Quickly report crimes in your area and provide necessary details to help authorities take action effectively.</p>
              <button className="action-button">Click Here</button>
            </div>
            <div className="feature-item">
              <h3>
                <FontAwesomeIcon icon={faSearch} /> Missing Reporting
              </h3>
              <p>Report missing persons or items easily and help track them down faster.</p>
              <button className="action-button">Click Here</button>
            </div>
            <div className="feature-item">
              <h3>
                <FontAwesomeIcon icon={faFolderOpen} /> Case Status
              </h3>
              <p>Check the real-time status of your reported cases and stay informed about their progress.</p>
              <button className="action-button">Click Here</button>
            </div>
            <div className="feature-item">
              <h3>
                <FontAwesomeIcon icon={faUser} /> Missing Person Finder
              </h3>
              <p>Search for missing individuals using location-based filters and provided photos.</p>
              <button className="action-button">Click Here</button>
            </div>
            <div className="feature-item">
              <h3>
                <FontAwesomeIcon icon={faAmbulance} /> Emergency Help
              </h3>
              <p>Access emergency assistance in critical situations to ensure your safety and well-being.</p>
              <button className="action-button">Click Here</button>
            </div>
            <div className="feature-item">
              <h3>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Be Aware
              </h3>
              <p>Enter your area and view the latest crime reports, ensuring you stay informed and vigilant.</p>
              <button className="action-button">Click Here</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
