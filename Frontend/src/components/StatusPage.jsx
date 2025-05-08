import axios from "axios";
import { useState } from "react";

const statusStages = [
  { name: "Open", value: 33, color: "bg-yellow-500" },
  { name: "Under investigation", value: 66, color: "bg-blue-500" },
  { name: "Closed", value: 100, color: "bg-green-500" }
];


export default function StatusPage() {
  const [ackNumber, setAckNumber] = useState("");
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStatus = async () => {
    if (!ackNumber) {
      setError("Please enter a valid acknowledgment number.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("https://crime-management-system-p889.onrender.com/CrimeStatus",{"AcknowledgeNumber":ackNumber});
      
   ;
      setStatusData(response.data);
    } catch (error) {
      setError(error?.response?.data?.message);
      console.log(error);
      
      setStatusData(null);
    }
    setLoading(false);
  };

  const currentStageIndex = statusData ? statusStages.findIndex(stage => stage.name === statusData.status) : 0;

  return (
    <div className="flex flex-col items-center p-8 bg-gray-900 text-white min-h-screen pt-[130px]">
     

      <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Check Crime Report Status</h2>
        <div className="flex gap-2 justify-center mb-6">
          <input
            type="text"
            placeholder="Enter Acknowledgment Number"
            value={ackNumber}
            onChange={(e) => setAckNumber(e.target.value)}
            className="w-full bg-gray-700 text-white border border-red-500 p-2 rounded"
          />
          <button 
            onClick={fetchStatus} 
            disabled={loading} 
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-lg"
          >
            {loading ? "Loading..." : "Check"}
          </button>
        </div>

        {error && <p className="text-red-400 text-center">{error}</p>}
      </div>

      {statusData && (
        <div className="w-full max-w-lg mt-6 p-6 bg-gray-800 border border-red-500 text-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-center mb-4">Crime Report Details</h2>
          <p><strong>Acknowledgment Number:</strong> {statusData.acknowledgeNumber}</p>
          <p><strong>Status:</strong> {statusData.status}</p>

          <div className="relative w-full h-4 bg-gray-700 rounded-full overflow-hidden my-4">
            <div className={`absolute top-0 left-0 h-full ${statusStages[currentStageIndex]?.color || "bg-gray-500"} rounded-full transition-all duration-500`} 
                 style={{ width: `${statusStages[currentStageIndex]?.value || 0}%` }}>
            </div>
          </div>

          <div className="flex justify-between mt-2">
            {statusStages.map((stage, index) => (
              <div key={index} className="relative flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${index <= currentStageIndex ? stage.color : "bg-gray-500"}`}>
                  <span className="w-3 h-3 bg-white rounded-full"></span>
                </div>
                <p className="text-xs mt-1 text-white">{stage.name}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-medium text-red-400">Assigned Officer Details</h3>
            {statusData.assignedOfficer.Name !='' ? (
              <>
                <p><strong>Name:</strong> {statusData.assignedOfficer.Name}</p>
                <p><strong>Contact:</strong> {statusData.assignedOfficer.contact}</p>
              </>
            ) : (
              <p className="text-yellow-500">Waiting for officer assignment...</p>
            )}
          </div>

          <div className="mt-3 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-medium text-red-400">Crime Report Information</h3>
            <p><strong>Type:</strong> {statusData.crimetype}</p>
            <p><strong>Description:</strong> {statusData.description}</p>
            <p><strong>Date Reported:</strong> {statusData.incidentDate}</p>
            <p><strong>Time:</strong> {statusData.incidentTime}</p>
            <p><strong>Location:</strong> {`${statusData.incidentLocation.address}, ${statusData.incidentLocation.city}, ${statusData.incidentLocation.state} - ${statusData.incidentLocation.pincode}`}</p>
          </div>
        </div>
      )}
    </div>
  );
}
