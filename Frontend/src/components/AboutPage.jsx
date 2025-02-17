import React from "react";
import PRABHAKAR from '../assets/PM_PH_CM.jpg';
import DINESH from '../assets/DPN.jpg';
const AboutPage = () => {
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 text-white min-h-screen flex flex-col justify-center items-center py-16 px-12">
      <h1 className="text-6xl font-extrabold text-[#ff2626] mb-12 uppercase tracking-wide text-center">
        Crime Management System
      </h1>
      <div className="flex flex-col lg:flex-row items-center max-w-6xl w-full bg-gray-800 p-10 rounded-3xl shadow-2xl">
        {/* Left Section: Image */}
        <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/police-arresting-criminal-illustration-download-in-svg-png-gif-file-formats--arrest-officer-cop-crime-security-illustrations-3135568.png?f=webp"
            alt="Criminal getting caught by police"
          />
        </div>

        {/* Right Section: Text */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <p className="text-xl text-gray-300 mb-6 leading-relaxed">
            The Crime Management System is an advanced digital platform aimed at ensuring public
            safety through streamlined crime reporting and efficient law enforcement operations.
            Our system enables instant reporting, case tracking, and data-driven insights to
            enhance security and transparency in crime management.
          </p>
          <h2 className="text-4xl font-bold text-[#ff2626] mb-4">Ensuring Justice & Security</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Empowering citizens to report crimes efficiently while providing law enforcement
            agencies with cutting-edge tools to investigate and resolve cases effectively.
          </p>
        </div>
      </div>

      {/* Additional Information */}
      <div className="max-w-6xl mt-16 bg-gray-800 p-10 rounded-3xl shadow-2xl text-center">
        <h2 className="text-3xl font-semibold text-[#ff2626] mb-6">How It Works</h2>
        <p className="text-gray-400 text-lg leading-relaxed px-6">
          Users can report crimes seamlessly through a secure platform. Law enforcement agencies
          can monitor reports in real-time, assign cases, and track progress efficiently. Data
          analytics help authorities identify crime hotspots and take preventive measures.
        </p>

        <h2 className="text-3xl font-semibold text-[#ff2626] mt-10 mb-6">Why Choose Our System?</h2>
        <ul className="text-gray-400 text-lg leading-relaxed space-y-2">
          <li>✅ 24/7 crime reporting accessibility</li>
          <li>✅ Anonymous reporting for sensitive cases</li>
          <li>✅ Secure data encryption to protect user privacy</li>
          <li>✅ AI-powered analytics for law enforcement insights</li>
          <li>✅ Seamless integration with law enforcement databases</li>
        </ul>
      </div>

      {/* Developer Information Section */}
      <div className="max-w-6xl mt-16 bg-gray-800 p-10 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-semibold text-[#ff2626] mb-6 text-center">About the Developers</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Prabhakar Section */}
          <div className="flex flex-col items-center text-center">
            <img
              src={PRABHAKAR} // Replace with Prabhakar's photo
              alt="Prabhakar Maurya"
              className="w-32 h-32 rounded-full border-4 border-[#ff2626] mb-4"
            />
            <h3 className="text-2xl font-semibold text-[#ff2626]">Prabhakar Maurya</h3>
            <p className="text-gray-400 text-lg mt-2">
              Prabhakar is the backend developer of this system with expertise in MongoDB, Express, React, and Node.js (MERN stack). He is passionate about using technology to solve real-world problems and continually strives to enhance his skills in full-stack development.
            </p>
          </div>

          {/* Dinesh Section */}
          <div className="flex flex-col items-center text-center">
            <img
              src={DINESH}
              alt="Dinesh Padhi"
              className="w-32 h-32 rounded-full border-4 border-[#ff2626] mb-4"
            />
            <h3 className="text-2xl font-semibold text-[#ff2626]">Dinesh Padhi</h3>
            <p className="text-gray-400 text-lg mt-2">
              Dinesh is the frontend developer who specializes in creating responsive and intuitive user interfaces. With a focus on user experience and design, Dinesh brings the visual aspects of the Crime Management System to life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
