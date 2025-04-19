import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-[#222] w-64 min-h-screen text-white p-5">
      <h2 className="text-2xl font-bold text-[#ff0000] mb-6">Admin Panel</h2>
      <ul>
        <li className="mb-4">
          <Link to="/" className="hover:text-[#ff0000]">Dashboard</Link>
        </li>
        <li className="mb-4">
          <Link to="/register-department" className="hover:text-[#ff0000]">Register Department</Link>
        </li>
        <li className="mb-4">
          <Link to="/view-reports" className="hover:text-[#ff0000]">View Reports</Link>
        </li>
        <li className="mb-4">
          <Link to="/criminal-database" className="hover:text-[#ff0000]">Criminal Database</Link>
        </li>
        <li className="mb-4">
          <Link to="/complaints" className="hover:text-[#ff0000]">User Complaints</Link>
        </li>
        <li className="mb-4">
          <Link to="/profile" className="hover:text-[#ff0000]">Profile</Link>
        </li>
        <li className="mb-4">
          <Link to="/print-reports" className="hover:text-[#ff0000]">Print Reports</Link>
        </li>
      </ul>
    </div>
  );
}
