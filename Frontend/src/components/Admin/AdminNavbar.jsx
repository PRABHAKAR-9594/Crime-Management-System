import React, { useState, useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function AdminNavbar() {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const uname = sessionStorage.getItem('UserName');
    if (uname) {
      setUser(uname);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setUser('');
    navigate('/');
  };

  const handleNavHome = () => {
    navigate('/admin/adminhome');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white z-50 shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        
        {/* Left: Welcome Message */}
        <div
          onClick={handleNavHome}
          className="text-white text-lg font-semibold tracking-wide cursor-pointer hover:text-red-500 transition duration-300"
        >
          {user && <span>Welcome, Admin</span>}
        </div>

        {/* Center: Title */}
        <div
          onClick={handleNavHome}
          className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-[#ff0000] cursor-pointer hover:text-white transition duration-300"
        >
          Crime Management System
        </div>

        {/* Right: Logout Button */}
        <div>
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center text-white hover:text-red-500 transition-colors"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
