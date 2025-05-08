import React, { useEffect, useState } from "react";
import axios from "axios";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Username = sessionStorage.getItem('UserName')
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.post("https://crime-management-system-p889.onrender.com/userhistory",{username:Username});
        console.log(response.data.records); // Debugging: Check API respons
        setHistory(response.data.records);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchHistory();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-black text-white p-10 pt-[100px]">
      <h1 className="text-3xl font-bold text-red-500 mb-6 text-center">Case History</h1>
      {history.length === 0 ? (
        <p>No history found</p>
      ) : (
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 p-2">Case ID</th>
              <th className="border border-gray-700 p-2">Crime Type</th>
              <th className="border border-gray-700 p-2">Status</th>
              <th className="border border-gray-700 p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((caseItem) => (
              <tr key={caseItem._id} className="bg-gray-900 hover:bg-gray-800">
                <td className="border border-gray-700 p-2">{caseItem.acknowledgeNumber}</td>
                <td className="border border-gray-700 p-2">{caseItem.crimetype}</td>
                <td className="border border-gray-700 p-2">{caseItem.status}</td>
                <td className="border border-gray-700 p-2">{caseItem.incidentDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoryPage;
