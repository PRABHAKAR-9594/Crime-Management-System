import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import {
  faShieldAlt,
  faSearch,
  faFolderOpen,
  faUser ,
  faAmbulance,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <div className=''>
      <section className="bg-[#0f0f0fee] text-white py-10 px-5">
        <div className="h-[550px] flex flex-col justify-center mt-[50px]">
          {/* Main Heading with a Quote */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-[#ff0000] mb-2">Welcome to the Crime Management System</h1>
            <p className="text-lg italic text-gray-300">"Don't worry, we are with you every step of the way!"</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="text-center bg-[#222] border border-[#444] p-5 shadow-lg rounded-2xl">
              <h3 className="text-2xl text-[#fc2008] mb-2">
                <FontAwesomeIcon icon={faShieldAlt} /> Crime Reporting
              </h3>
              
              <p className="text-gray-400 mb-4">Quickly report crimes in your area and provide necessary details to help authorities take action effectively.</p>
              <Link to="/CrimeReportingForm">
              <button className="mt-2 px-4 py-2 text-white bg-[#f62424] rounded transition duration-300 hover:bg-[#df0e0e] font-bold">
                Click Here
              </button>
              </Link>
            </div>

            <div className="text-center bg-[#222] border border-[#444] p-5 shadow-lg rounded-2xl">
              <h3 className="text-2xl text-[#fc2008] mb-2">
                <FontAwesomeIcon icon={faSearch} /> Missing Reporting
              </h3>
              <p className="text-gray-400 mb-4">Report missing persons or items easily and help track them down faster.</p>
            <Link to='/missingreport'>
            <button className="mt-2 px-4 py-2 text-white bg-[#f62424] rounded transition duration-300 hover:bg-[#df0e0e] font-bold">
                Click Here
              </button>
              </Link>
            </div>
            <div className="text-center bg-[#222] border border-[#444] p-5 shadow-lg rounded-2xl">
              <h3 className="text-2xl text-[#fc2008] mb-2">
                <FontAwesomeIcon icon={faFolderOpen} /> Case Status
              </h3>
              <p className="text-gray-400 mb-4">Check the real-time status of your reported cases and stay informed about their progress.</p>
              <Link to='/Status'>
              <button className="mt-2 px-4 py-2 text-white bg-[#f62424] rounded transition duration-300 hover:bg-[#df0e0e] font-bold">
                Click Here
              </button>
              </Link>
            </div>
            <div className="text-center bg-[#222] border border-[#444] p-5 shadow-lg rounded-2xl">
              <h3 className="text-2xl text-[#fc2008] mb-2">
                <FontAwesomeIcon icon={faUser } /> Missing Person Finder
              </h3>
              <p className="text-gray-400 mb-4">Search for missing individuals using location-based filters and provided photos.</p>
              <Link to='/missingsearch'>
              <button className="mt-2 px-4 py-2 text-white bg-[#f62424] rounded transition duration-300 hover:bg-[#df0e0e] font-bold">
                Click Here
              </button>
              </Link>
            </div>
            <div className="text-center bg-[#222] border border-[#444] p-5 shadow-lg rounded-2xl">
              <h3 className="text-2xl text-[#fc2008] mb-2">
                <FontAwesomeIcon icon={faAmbulance} /> Emergency Help
              </h3>
              <p className="text-gray-400 mb-4">Access emergency assistance in critical situations to ensure your safety and well-being.</p>
              <Link to='/chat'>
              <button className="mt-2 px-4 py-2 text-white bg-[#f62424] rounded transition duration-300 hover:bg-[#df0e0e] font-bold">
                Click Here
              </button>
              </Link>
            </div>
            <div className="text-center bg-[#222] border border-[#444] p-5 shadow-lg rounded-2xl">
              <h3 className="text-2xl text-[#fc2008] mb-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Be Aware
              </h3>
              <p className="text-gray-400 mb-4">Enter your area and view the latest crime reports, ensuring you stay informed and vigilant.</p>
              <Link to='/beaware'>
              <button className="mt-2 px-4 py-2 text-white bg-[#f62424] rounded transition duration-300 hover:bg-[#df0e0e] font-bold">
                Click Here
              </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}