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

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Welcome Message */}
        <div className="text-lg text-white">
          {user && `Welcome, Admin`}
        </div>

        {/* Center: Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-[#ff0000]">
          Crime Management System
        </div>

        {/* Right: Logout Button */}
        <div>
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center text-white hover:text-[#ff0000] transition-colors"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
