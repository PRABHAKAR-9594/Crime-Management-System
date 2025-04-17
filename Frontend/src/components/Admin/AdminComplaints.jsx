import React, { useState } from "react";

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([
    { id: 1, user: "Alice", issue: "Delayed response", status: "Pending" },
    { id: 2, user: "Bob", issue: "Incorrect report", status: "Resolved" },
  ]);

  const handleStatusChange = (id) => {
    const updated = complaints.map((c) =>
      c.id === id
        ? { ...c, status: c.status === "Pending" ? "Resolved" : "Pending" }
        : c
    );
    setComplaints(updated);
  };

  const handleDelete = (id) => {
    const updated = complaints.filter((c) => c.id !== id);
    setComplaints(updated);
  };

  return (
    <div className="min-h-screen bg-black mt-10 text-white p-8 font-mono tracking-wide">
      <h2 className="text-3xl font-bold text-[#ff0000] border-b-2 border-[#ff0000] pb-2 mb-6 uppercase">
        User Complaints Panel
      </h2>

      {complaints.length === 0 ? (
        <p className="text-center text-gray-400">No complaints available.</p>
      ) : (
        <div className="grid gap-6">
          {complaints.map((c) => (
            <div
              key={c.id}
              className="bg-[#1a1a1a] border border-red-700 rounded-md p-5 shadow-md"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-[#ff0000]">
                  Complaint #{c.id}
                </h3>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Delete
                </button>
              </div>
              <p className="mb-1">
                <strong className="text-white">User:</strong>{" "}
                <span className="text-gray-300">{c.user}</span>
              </p>
              <p className="mb-2">
                <strong className="text-white">Issue:</strong>{" "}
                <span className="text-gray-300">{c.issue}</span>
              </p>
              <div className="flex items-center gap-4">
                <p>
                  <strong className="text-white">Status:</strong>{" "}
                  <span
                    className={
                      c.status === "Resolved"
                        ? "text-green-500 font-bold"
                        : "text-yellow-400 font-bold"
                    }
                  >
                    {c.status}
                  </span>
                </p>
                <button
                  onClick={() => handleStatusChange(c.id)}
                  className="px-3 py-1 bg-[#222] border border-[#ff0000] text-white font-semibold hover:bg-[#330000]"
                >
                  Mark as {c.status === "Pending" ? "Resolved" : "Pending"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
