import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const MissingHistory = () => {
    const Username = sessionStorage.getItem('UserName');
    const navigate = useNavigate();

    useEffect(() => {
        if (!Username) {
            navigate('/login');
        }
    }, [Username]);

    const [historyRecords, setHistoryRecords] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.post('http://localhost:8080/dept/missinghistory', {
                    username: Username
                });
                setHistoryRecords(response.data.records);
            } catch (error) {
                console.error('Error fetching missing history:', error);
            }
        };

        fetchHistory();
    }, [Username]);

    return (
        <div className="min-h-screen bg-gray-900 py-10 px-6 pt-[150px]">
            <div className="max-w-7xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-red-500 text-center mb-6 border-b-2 border-red-400 pb-2">
                    Missing Person History
                </h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-600">
                        <thead className="bg-red-600">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">#</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Full Name</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Age</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Photo</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Last Seen Location</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Last Seen Date</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Acknowledge No.</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {Array.isArray(historyRecords) && historyRecords.map((record, index) => (
                                <tr key={record._id} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'}>
                                    <td className="px-6 py-4 text-sm text-white font-medium">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-white">{record.missingPerson?.fullName}</td>
                                    <td className="px-6 py-4 text-sm text-white">{record.missingPerson?.age}</td>
                                    <td className="px-6 py-4 text-sm text-white">
                                        <a href={record.missingPerson?.photo} target="_blank" rel="noopener noreferrer">
                                            <img
                                                src={record.missingPerson?.photo}
                                                alt="Missing"
                                                className="h-16 w-16 rounded object-cover cursor-pointer hover:scale-110 transition-transform duration-200"
                                            />
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-white">{record.lastSeenDetails?.location} - {record.lastSeenDetails?.pincode}</td>
                                    <td className="px-6 py-4 text-sm text-white">{new Date(record.lastSeenDetails?.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-red-400">{record.status}</td>
                                    <td className="px-6 py-4 text-sm text-white">{record.acknowledgeNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MissingHistory;
