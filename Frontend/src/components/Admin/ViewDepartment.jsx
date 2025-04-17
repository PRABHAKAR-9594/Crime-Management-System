import React, { useState } from "react";
import { motion } from "framer-motion";
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const ViewDepartment = () => {
  const [departments, setDepartments] = useState(
    [
      { "id": 1, "name": "Cyber Crime", "code": "DPT-101", "location": "Mumbai", "head": "Raj Mehta", "officers": 50, "email": "cyber@mumbai.gov", "status": "Active" },
      { "id": 2, "name": "Homicide", "code": "DPT-102", "location": "Delhi", "head": "Anil Sharma", "officers": 30, "email": "homicide@delhi.gov", "status": "Active" },
      { "id": 3, "name": "Narcotics", "code": "DPT-103", "location": "Bangalore", "head": "Vikram Rao", "officers": 40, "email": "narcotics@bangalore.gov", "status": "Active" },
      { "id": 4, "name": "Traffic Control", "code": "DPT-104", "location": "Chennai", "head": "Deepa Iyer", "officers": 60, "email": "traffic@chennai.gov", "status": "Active" },
      { "id": 5, "name": "Financial Crimes", "code": "DPT-105", "location": "Hyderabad", "head": "Suresh Nair", "officers": 35, "email": "finance@hyderabad.gov", "status": "Active" },
      { "id": 6, "name": "Anti-Terrorism", "code": "DPT-106", "location": "Kolkata", "head": "Rohan Sen", "officers": 70, "email": "terrorism@kolkata.gov", "status": "Active" },
      { "id": 7, "name": "Forensics", "code": "DPT-107", "location": "Pune", "head": "Neha Deshmukh", "officers": 25, "email": "forensics@pune.gov", "status": "Active" },
      { "id": 8, "name": "Special Operations", "code": "DPT-108", "location": "Ahmedabad", "head": "Amit Verma", "officers": 45, "email": "specialops@ahmedabad.gov", "status": "Active" },
      { "id": 9, "name": "Crime Intelligence", "code": "DPT-109", "location": "Jaipur", "head": "Meera Singh", "officers": 55, "email": "intelligence@jaipur.gov", "status": "Active" },
      { "id": 10, "name": "Human Trafficking", "code": "DPT-110", "location": "Lucknow", "head": "Karan Kapoor", "officers": 38, "email": "humantrafficking@lucknow.gov", "status": "Active" },
      { "id": 11, "name": "Internal Affairs", "code": "DPT-111", "location": "Bhopal", "head": "Rita Malhotra", "officers": 20, "email": "internalaffairs@bhopal.gov", "status": "Active" },
      { "id": 12, "name": "Cyber Security", "code": "DPT-112", "location": "Chandigarh", "head": "Sanjay Khanna", "officers": 48, "email": "cybersecurity@chandigarh.gov", "status": "Active" },
      { "id": 13, "name": "Border Security", "code": "DPT-113", "location": "Amritsar", "head": "Arun Dev", "officers": 65, "email": "bordersecurity@amritsar.gov", "status": "Active" },
      { "id": 14, "name": "Emergency Response", "code": "DPT-114", "location": "Thiruvananthapuram", "head": "Lakshmi Nair", "officers": 50, "email": "emergency@tvm.gov", "status": "Active" },
      { "id": 15, "name": "Women’s Protection", "code": "DPT-115", "location": "Patna", "head": "Geeta Shukla", "officers": 33, "email": "womenprotection@patna.gov", "status": "Active" }
  ]
  
  );

  const [newDepartment, setNewDepartment] = useState({
    name: "",
    code: "",
    location: "",
    head: "",
    officers: "",
    contact: "",
    email: "",
    status: "Active",
    description: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setNewDepartment({ ...newDepartment, [e.target.name]: e.target.value });
    setError("");
  };

  const registerDepartment = () => {
    if (!newDepartment.name || !newDepartment.code || !newDepartment.location || !newDepartment.head || !newDepartment.officers || !newDepartment.contact || !newDepartment.email) {
      setError("All required fields must be filled!");
      return;
    }

    setDepartments([...departments, { id: departments.length + 1, ...newDepartment }]);
    setNewDepartment({ name: "", code: "", location: "", head: "", officers: "", contact: "", email: "", status: "Active", description: "" });
    setModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-red-500 mt-12 ">Department Management</h1><br></br>

      <motion.button 
        onClick={() => setModalOpen(true)} 
        className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-500 transition shadow-lg"
        whileHover={{ scale: 1.05 }}
      >
        + Add New Department
      </motion.button>

      <div className="mt-6 w-full  bg-gray-900 p-6 rounded-lg border border-red-500 shadow-lg overflow-auto max-h-96">
        <table className="w-full text-white border-collapse">
          <thead>
            <tr className="bg-red-700 text-white text-lg">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Code</th>
              <th className="p-3">Location</th>
              <th className="p-3">Head</th>
              <th className="p-3">Officers</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                <td className="p-3 text-center">{dept.id}</td>
                <td className="p-3">{dept.name}</td>
                <td className="p-3">{dept.code}</td>
                <td className="p-3">{dept.location}</td>
                <td className="p-3">{dept.head}</td>
                <td className="p-3">{dept.officers}</td>
                <td className="p-3">{dept.email}</td>
                <td className={`p-3 ${dept.status === "Active" ? "text-green-400" : "text-yellow-400"}`}>{dept.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="bg-gray-900 p-8 rounded-lg border border-red-500 shadow-lg w-1/2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <h2 className="text-2xl text-red-400 mb-4 font-semibold">Add New Department</h2>
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField placeholder="Department Name" name="name" value={newDepartment.name} onChange={handleChange} variant="outlined" fullWidth className="bg-white rounded-md" />
              <TextField placeholder="Department Code" name="code" value={newDepartment.code} onChange={handleChange} variant="outlined" fullWidth className="bg-white rounded-md" />
              <TextField placeholder="Location" name="location" value={newDepartment.location} onChange={handleChange} variant="outlined" fullWidth className="bg-white rounded-md" />
              <TextField placeholder="Department Head" name="head" value={newDepartment.head} onChange={handleChange} variant="outlined" fullWidth className="bg-white rounded-md" />
              <TextField placeholder="No. of Officers" name="officers" value={newDepartment.officers} onChange={handleChange} type="number" variant="outlined" fullWidth className="bg-white rounded-md" />
              <TextField placeholder="Contact Number" name="contact" value={newDepartment.contact} onChange={handleChange} variant="outlined" fullWidth className="bg-white rounded-md" />
              <TextField placeholder="Email" name="email" value={newDepartment.email} onChange={handleChange} type="email" variant="outlined" fullWidth className="bg-white rounded-md" />
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select name="status" value={newDepartment.status} onChange={handleChange} className="bg-white rounded-md">
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="mt-4 flex justify-end space-x-4">
              <Button onClick={() => setModalOpen(false)} variant="contained" color="secondary">Cancel</Button>
              <Button onClick={registerDepartment} variant="contained" color="error">Register</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ViewDepartment;