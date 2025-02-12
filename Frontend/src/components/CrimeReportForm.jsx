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
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4">Crime Reporting Form</h1>

            <label className="block mb-2">
                Username:
                <input type="text" name="username" value={formData.username} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" required />
            </label>

            <label className="block mb-2">
                Crime Type:
                <input type="text" name="crimetype" value={formData.crimetype} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" required />
            </label>

            <label className="block mb-2">
                Description:
                <textarea name="description" value={formData.description} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" required />
            </label>

            <label className="block mb-2">
                Incident Date:
                <input type="date" name="incidentDate" value={formData.incidentDate} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" required />
            </label>

            <label className="block mb-2">
                Incident Time:
                <input type="time" name="incidentTime" value={formData.incidentTime} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" required />
            </label>

            <h2 className="text-lg font-semibold mt-4">Incident Location</h2>
            <label className="block mb-2">
                Address:
                <input type="text" name="incidentLocation.address" value={formData.incidentLocation.address} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" required />
            </label>

            <label className="block mb-2">
                City:
                <input type="text" name="incidentLocation.city" value={formData.incidentLocation.city} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" required />
            </label>

            <label className="block mb-2">
                State:
                <input type="text" name="incidentLocation.state" value={formData.incidentLocation.state} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" required />
            </label>

            <label className="block mb-2">
                Pincode:
                <input type="text" name="incidentLocation.pincode" value={formData.incidentLocation.pincode} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" required />
            </label>

            <h2 className="text-lg font-semibold mt-4">Evidence</h2>
            <label className="block mb-2">
                Image File:
                <input type="file" name="evidence.imageFile" value={formData.evidence.imageFile} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" />
            </label>

            <label className="block mb-2">
                Video File:
                <input type="file" name="evidence.videoFile" value={formData.evidence.videoFile} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" />
            </label>

            <h2 className="text-lg font-semibold mt-4">Suspect Details</h2>
            <label className="block mb-2">
                Name:
                <input type="text" name="suspectDetails.name" value={formData.suspectDetails.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" />
            </label>

            <label className="block mb-2">
                Description:
                <textarea name="suspectDetails.description" value={formData.suspectDetails.description} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" />
            </label>

            <label className="block mb-2">
                Acknowledge Number:
                <input type="text" name="acknowledgeNumber" value={formData.acknowledgeNumber} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" />
            </label>

            <label className="block mb-2">
                Status:
                <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2">
                    <option value="Open">Open</option>
                    <option value="Under investigation">Under investigation</option>
                    <option value="Closed">Closed</option>
                </select>
            </label>

            <h2 className="text-lg font-semibold mt-4">Assigned Officer</h2>
            <label className="block mb-2">
                Username:
                <input type="text" name="assignedOfficer.UserName" value={formData.assignedOfficer.UserName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" />
            </label>

            <label className="block mb-2">
                Name:
                <input type="text" name="assignedOfficer.Name" value={formData.assignedOfficer.Name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" />
            </label>

            <label className="block mb-2">
                Contact:
                <input type="text" name="assignedOfficer.contact" value={formData.assignedOfficer.contact} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" />
            </label>

            <button type="submit" className="mt-4 bg-blue-500 text-white rounded p-2">Submit</button>
        </form>
    );
};

export default CrimeReportForm;