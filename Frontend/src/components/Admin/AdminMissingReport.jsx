import React, { useState } from "react";

export default function AdminMissingReport() {
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
    <div>Hello</div>

  )
}
