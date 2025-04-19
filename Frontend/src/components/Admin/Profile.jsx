import React from "react";

export default function Profile() {
  return (
    <div className="p-6 bg-[#0f0f0fee] text-white">
      <h2 className="text-2xl text-[#ff0000] mb-4">Admin Profile</h2>
      <div className="bg-[#222] p-4 rounded-lg">
        <p>Name: <span className="text-[#00ff00]">Admin User</span></p>
        <p>Email: <span className="text-[#00ff00]">admin@example.com</span></p>
      </div>
    </div>
  );
}
