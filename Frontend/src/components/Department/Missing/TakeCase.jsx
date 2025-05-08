import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MissingTakeCase = () => {
  const Username = sessionStorage.getItem("UserName");
  const navigate = useNavigate();

  useEffect(() => {
    if (!Username) {
      navigate("/login");
    }
  }, [Username]);

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [takenCases, setTakenCases] = useState({});

  const Name = sessionStorage.getItem("Name") || "";
  const contact = sessionStorage.getItem("contact") || "";
  const uname = sessionStorage.getItem("UserName") || "";

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.post("https://crime-management-system-p889.onrender.com/missingtakecasesearch", {
          status: "Open"
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

  const handleTakeCase = async (acknowledgeNumber, caseUsername) => {
    try {
      const response = await axios.post("https://crime-management-system-p889.onrender.com/missingupdateassignofficer", {
        acknowledgeNumber,
        username: uname,
        name: Name,
        contact
      });

      if (response.status === 200) {
        setTakenCases((prev) => ({ ...prev, [acknowledgeNumber]: true }));

        // ✅ Get user email using case's username
        const profileRes = await axios.post("https://crime-management-system-p889.onrender.com/profile", {
          username: caseUsername
        });

        const userEmail = profileRes.data.response.email;
        console.log(userEmail);
        
        if (userEmail) {
          // ✅ Send email to user
          await axios.post("https://crime-management-system-p889.onrender.com/sendGmail", {
            gmail: userEmail,
            Subject: "Missing Case Status Update",
            text: `Dear User,

We hope this message finds you in strength and hope.

We want to inform you that your missing person case (Acknowledge Number: ${acknowledgeNumber}) has been successfully assigned to an investigating officer.

🔍 Officer Details:
- 👤 Name    : ${Name}
- 📞 Contact : ${contact}

Our team understands the emotional weight that comes with such situations. Please know that we are treating your case with the utmost seriousness, care, and urgency. You are not alone in this—help is on the way.

We will keep you regularly updated with the progress of your case.

Stay strong, and remember, every step taken brings us closer to answers.

Warm regards,  
**Crime Reporting System Team**
`
          });
        } else {
          console.warn("Email not found for user:", caseUsername);
        }
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
      <h1 className="text-2xl font-bold mb-4 text-red-500">Missing Persons Cases</h1>

      {loading && <p className="text-red-500">Loading cases...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {cases.map((caseData) => (
        <div key={caseData._id} className="mb-4 bg-gray-900 text-white w-full p-4 border border-red-500">
          <h2 className="text-xl font-bold mb-2 text-red-500">Missing Person: {caseData.missingPerson?.fullName}</h2>
          <p><strong className="text-red-500">Age:</strong> {caseData.missingPerson?.age}</p>
          <p><strong className="text-red-500">Contact:</strong> {caseData.missingPerson?.contact}</p>
          <p><strong className="text-red-500">Last Seen:</strong> {caseData.lastSeenDetails?.location}, PIN: {caseData.lastSeenDetails?.pincode}</p>
          <p><strong className="text-red-500">Date:</strong> {new Date(caseData.lastSeenDetails?.date).toLocaleDateString()}</p>
          <p><strong className="text-red-500">Status:</strong> {caseData.status}</p>
          <p><strong className="text-red-500">Assigned Officer:</strong> {caseData.assignedOfficer?.Name || "Not Assigned"} ({caseData.assignedOfficer?.contact || "N/A"})</p>

          {caseData.missingPerson?.photo && (
            <img
              src={caseData.missingPerson.photo}
              alt="Missing Person"
              className="w-40 h-40 object-cover my-2 border border-red-500"
            />
          )}

          <button
            className={`mt-4 px-4 py-2 text-black font-bold ${
              takenCases[caseData.acknowledgeNumber] ? "bg-gray-500 cursor-not-allowed" : "bg-red-500"
            }`}
            onClick={() => handleTakeCase(caseData.acknowledgeNumber, caseData.username)}
            disabled={takenCases[caseData.acknowledgeNumber]}
          >
            {takenCases[caseData.acknowledgeNumber] ? "Taken" : "Take Case"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default MissingTakeCase;
