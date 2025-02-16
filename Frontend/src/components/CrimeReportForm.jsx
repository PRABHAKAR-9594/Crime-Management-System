// src/CrimeReportForm.js
import React, { useState } from 'react';

const CrimeReportForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        crimetype: '',
        description: '',
        incidentDate: '',
        incidentTime: '',
        incidentLocation: {
            address: '',
            city: '',
            state: '',
            pincode: ''
        },
        evidence: {
            imageFile: '',
            videoFile: ''
        },
        suspectDetails: {
            name: '',
            description: ''
        },
        acknowledgeNumber: '',
        status: 'Open',
        assignedOfficer: {
            UserName: '',
            Name: '',
            contact: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Here you would typically send the formData to your backend API
    };

    return (
        <div className="flex flex-col md:flex-row max-w-full h-screen bg-black">
            <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-6 bg-black text-white rounded shadow-md overflow-auto">
                <h1 className="text-3xl font-bold mb-4 text-red-500">Crime Reporting Form</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block mb-2">
                        Username:
                        <input type="text" name="username" value={formData.username} onChange={handleChange} className="mt-1 block w-full border border-red-500 rounded p-2 bg-gray-800 text-white" required />
                    </label>

                    <label className="block mb-2">
                        Crime Type:
                        <input type="text" name="crimetype" value={formData.crimetype} onChange={handleChange} className="mt-1 block w-full border border-red-500 rounded p-2 bg-gray-800 text-white" required />
                    </label>

                    <label className="block mb-2 col-span-2">
                        Description:
                        <textarea name="description" value={formData.description} onChange={handleChange} className="mt-1 block w-full border border-red-500 rounded p-2 bg-gray-800 text-white" required />
                    </label>

                    <label className="block mb-2">
                        Incident Date:
                        <input type="date" name="incidentDate" value={formData.incidentDate} onChange={handleChange} className="mt-1 block w-full border border-red-500 rounded p-2 bg-gray-800 text-white" required />
                    </label>

                    <label className="block mb-2">
                        Incident Time:
                        <input type="time" name="incidentTime" value={formData.incidentTime} onChange={handleChange} className="mt-1 block w-full border border-red-500 rounded p-2 bg-gray-800 text-white" required />
                    </label>
                </div>

                <h2 className="text-lg font-semibold mt-4">Incident Location</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block mb-2">
                        Address:
                        <input type="text" name="incidentLocation.address" value={formData.incidentLocation.address} onChange={handleChange} className="mt-1 block w-full border border-red-500 rounded p-2 bg-gray-800 text-white" required />
                    </label>

                    <label className="block mb-2">
                        City:
                        <input type="text" name="incidentLocation.city" value={formData.incidentLocation.city} onChange={handleChange} className="mt-1 block w-full border border-red-500 rounded p-2 bg-gray-800 text-white" required />
                    </label>

                    <label className="block mb-2">
                        State:
                        <input type="text" name="incidentLocation.state" value={formData.incidentLocation.state} onChange={handleChange} className="mt-1 block w-full border border-red-500 rounded p-2 bg-gray-800 text-white" required />
                    </label>

                    <label className="block mb-2">
                        Pincode:
                        <input type="text" name="incidentLocation.pincode" value={formData.incidentLocation.pincode} onChange={handleChange} className="mt-1 block w-full border border-red-500 rounded p-2 bg-gray-800 text-white" required />
                    </label>
                </div>

                <h2 className="text-lg font-semibold mt-4">Evidence</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block mb-2">
                        Image File:
                        <input type="file" name="evidence.imageFile" onChange={handleChange} className="mt-1 block w-full border border-red-500 rounded p-2 bg-gray-800 text-white" />
                    </label>

                    <label className="block mb-2">
                        Video File:
                        <input type="file" name="evidence.videoFile" onChange={handleChange} className="mt-1 block w-full border border-red-500 rounded p-2 bg-gray-800 text-white" />
                    </label>
                </div>

                <h2 className="text-lg font-semibold mt-4">Suspect Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block mb-2">
                        Name:
                        <input type="text" name="suspectDetails.name" value={formData.suspectDetails.name} onChange={handleChange} className="mt-1 block w-full border border-red-500 rounded p-2 bg-gray-800 text-white" />
                    </label>

                    <label className="block mb-2 col-span-2">
                        Description:
                        <textarea name="suspectDetails.description" value={formData.suspectDetails.description} onChange={handleChange} className="mt-1 block w-full border border-red-500 rounded p-2 bg-gray-800 text-white" />
                    </label>

                   
                </div>

                <button type="submit" className="mt-4 bg-red-500 text-white rounded p-2 hover:bg-red-600">Submit</button>
            </form>

            <div className="w-full md:w-1/2 p-6 bg-black text-red-500 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">Crime Registration Form</h1>
                <blockquote className="text-center text-lg italic text-white">
                    "Justice delayed is justice denied."
                </blockquote>
            </div>
        </div>
    );
};

export default CrimeReportForm;