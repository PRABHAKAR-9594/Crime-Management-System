import { useEffect, useState } from "react";
import axios from "axios";

const BeAwarePage = () => {
  const [pincode, setPincode] = useState('')
  const CurrentPincode=sessionStorage.getItem('Pincode')
useEffect(()=>{
  if(CurrentPincode){
    setPincode(CurrentPincode)
  }
},[])
 
  const [crimeReports, setCrimeReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCrimeReports = async () => {
    if (!pincode || pincode.length !== 6) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }
    setError(null);
    setLoading(true);

    
    try {

      const response = await axios.post("http://localhost:8080/beaware", {
        pincode: pincode,
      });

      console.log("API Response:", response.data);

      if (response.data.message === "Records found" && response.data.records.length > 0) {
        const formattedReports = response.data.records.map((report) => ({
          type: report.crimetype,
          description: report.description,
          date: report.incidentDate,
          status: report.status,
          officer: report.assignedOfficer?.Name || "N/A",
          contact: report.assignedOfficer?.contact || "N/A",
        }));

        setCrimeReports(formattedReports);
      } else {
        setCrimeReports([]);
      }
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError("Failed to fetch crime reports. Please try again.");
    }

    setLoading(false);
  };

  useEffect(()=>{
  fetchCrimeReports()
  console.log(
  "I am Working now !"
  );
  
  },[pincode])
  return (
    <div className="text-center p-5 bg-black text-white min-h-screen">
      <h2 className="text-red-500 mb-4 text-xl font-bold">
        Be Aware: Stay Informed About Local Crime
      </h2>
      <p className="mb-5">
        Enter your area pincode and view the latest crime reports to stay vigilant.
      </p>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Enter your pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          maxLength={6}
          className="p-2 mr-2 rounded border border-red-500 bg-gray-800 text-white"
        />
        <button
          onClick={fetchCrimeReports}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Check Reports
        </button>
      </div>

      {error && <p className="text-red-400">{error}</p>}
      {loading && <p>Loading crime reports...</p>}

      <div className="mt-5 bg-gray-900 p-5 rounded-lg w-4/5 mx-auto">
        {crimeReports.length > 0 ? (
          <ul className="list-none p-0">
            {crimeReports.map((report, index) => (
              <li key={index} className="p-4 border-b border-gray-700 text-left">
                <strong className="text-red-500">{report.type}</strong>: {report.description} ({report.date})
                <br />
                <span className="text-sm text-gray-400">
                  Status:{" "}
                  <strong
                    className={report.status === "Closed" ? "text-green-500" : "text-yellow-400"}
                  >
                    {report.status}
                  </strong>
                </span>
                <br />
                <span className="text-sm text-gray-300">
                  Investigating Officer: <strong>{report.officer}</strong>
                </span>
                <br />
                <span className="text-sm text-gray-300">
                  Contact: <strong>{report.contact}</strong>
                </span>
                <p className="text-sm mt-2 text-gray-400">
                  Your information can help solve crimes and keep communities safe. If you witness
                  any suspicious activities, do not hesitate to report.
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent crime reports found for this pincode.</p>
        )}
      </div>
    </div>
  );
};

export default BeAwarePage;
