import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const DHistory = () => {
    const Username=sessionStorage.getItem('UserName')
    const nevigate=useNavigate()
         useEffect(()=>{
            if (!Username) {
              nevigate('/login')
            }
          },[Username]);
  const [historyRecords, setHistoryRecords] = useState([]);
//   const username = 'saurabh'; // Replace this with a prop or context if needed
  const username = sessionStorage.getItem("UserName") || "";
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.post('http://localhost:8080/dept/history', {
          username: username
        });
        setHistoryRecords(response.data.records);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-6 pt-[150px]">
      <div className="max-w-7xl mx-auto bg-gray-800 p-8  rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-red-500  text-center mb-6 border-b-2 border-red-400 pb-2">Your Cases !</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-red-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Crime Type</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {Array.isArray(historyRecords) && historyRecords.map((record, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{record.crimetype}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{record.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {record.incidentLocation?.address}, {record.incidentLocation?.city}, {record.incidentLocation?.state} - {record.incidentLocation?.pincode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{record.incidentDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{record.incidentTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-400">{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default DHistory;
