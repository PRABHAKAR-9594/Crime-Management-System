import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TheftTakeCase = () => {
  const Username=sessionStorage.getItem('UserName')
  const nevigate=useNavigate()
       useEffect(()=>{
          if (!Username) {
            nevigate('/login')
          }
        },[Username]);
  
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [takenCases, setTakenCases] = useState({}); // Track taken cases

  // Retrieve officer details from sessionStorage
  const Name = sessionStorage.getItem("Name") || "";
  const contact = sessionStorage.getItem("contact") || "";
  const uname = sessionStorage.getItem("UserName") || "";
console.log("This is contact ",contact);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.post("https://crime-management-system-p889.onrender.com/takecasesearch", {
          crimetype: "Theft",
          status: "Open",
        });

        if (response.data?.response?.length > 0) {
          setCases(response.data.response);
        } else {
          setError("No cases found.");
        }
      } catch (err) {
        console.error("Error fetching cases:", err);
        setError("Error fetching cases. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  // Handle "Take Case" button click
  const handleTakeCase = async (acknowledgeNumber) => {
    try {
      console.log("Taking case with Acknowledgement Number:", acknowledgeNumber);

      const response = await axios.post("https://crime-management-system-p889.onrender.com/updateassignofficer", {
        acknowledgeNumber,
        username: uname,
        name: Name,
        contact,
      });

      if (response.status === 200) {
        setTakenCases((prev) => ({ ...prev, [acknowledgeNumber]: true }));
      } else {
        alert("Failed to take the case. Please try again.");
      }
    } catch (error) {
      console.error("Error taking case:", error);
      alert("Error taking case. Please try again.");
    }
  };

  return (
    <div className="p-6 w-full text-white bg-black">
      <h1 className="text-2xl font-bold mb-4 text-red-500">Cases List</h1>

      {loading && <p className="text-red-500">Loading cases...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && cases.length === 0 && <p>No cases available.</p>}

      {cases.map((caseData) => (
        <div key={caseData._id} className="mb-4 bg-gray-900 text-white w-full p-4 border border-red-500">
          <h2 className="text-xl font-bold mb-2 text-red-500">{caseData.crimetype}</h2>
          <p>
            <strong className="text-red-500">Description:</strong> {caseData.description}
          </p>
          <p>
            <strong className="text-red-500">Date & Time:</strong> {caseData.incidentDate} {caseData.incidentTime}
          </p>
          <p>
            <strong className="text-red-500">Location:</strong>{" "}
            {caseData.incidentLocation?.address}, {caseData.incidentLocation?.city},{" "}
            {caseData.incidentLocation?.state}, {caseData.incidentLocation?.pincode}
          </p>
          <p>
            <strong className="text-red-500">Suspect:</strong> {caseData.suspectDetails?.name} -{" "}
            {caseData.suspectDetails?.description}
          </p>
          <p>
            <strong className="text-red-500">Assigned Officer:</strong>{" "}
            {caseData.assignedOfficer?.Name || "Not Assigned"} ({caseData.assignedOfficer?.contact || "N/A"})
          </p>
          <p>
            <strong className="text-red-500">Status:</strong> {caseData.status}
          </p>

          <h3 className="text-lg font-bold mt-4 text-red-500">Evidence</h3>
          {caseData.evidence?.imageFile && (
            <img
              src={caseData.evidence.imageFile}
              alt="Evidence"
              className="w-40 h-40 object-cover my-2 border border-red-500"
            />
          )}
          {caseData.evidence?.videoFile && (
            <a
              href={caseData.evidence.videoFile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 block mt-2"
            >
              View Video Evidence
            </a>
          )}

          {/* Take Case Button */}
          <button
            className={`mt-4 px-4 py-2 text-black font-bold ${
              takenCases[caseData.acknowledgeNumber] ? "bg-gray-500 cursor-not-allowed" : "bg-red-500"
            }`}
            onClick={() => handleTakeCase(caseData.acknowledgeNumber)}
            disabled={takenCases[caseData.acknowledgeNumber]}
          >
            {takenCases[caseData.acknowledgeNumber] ? "Taken" : "Take Case"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TheftTakeCase;
