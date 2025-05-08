import React, { useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";

const AdminCrimeDetails = () => {
  const printRef = useRef();
  const [crimes, setCrimes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const recordsPerPage = 4;

  useEffect(() => {
    const fetchCrimes = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("https://crime-management-system-p889.onrender.com/crime-details-all");
        setCrimes(res.data);
      } catch (err) {
        setError("Failed to fetch crime details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCrimes();
  }, []);

  const filteredCrimes = crimes.filter((crime) => {
    const query = searchQuery.toLowerCase().trim();
    return (
      crime.username?.toLowerCase().includes(query) ||
      crime.crimetype?.toLowerCase().includes(query) ||
      crime.description?.toLowerCase().includes(query) ||
      crime.incidentDate?.toLowerCase().includes(query) ||
      crime.incidentLocation?.address?.toLowerCase().includes(query) ||
      crime.suspectDetails?.acknowledgeNumber?.toLowerCase().includes(query) ||
      crime.suspectDetails?.status?.toLowerCase().includes(query)
    );
  });

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentCrimes = filteredCrimes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCrimes.length / recordsPerPage);

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const printWindow = window.open('', '', 'height=700,width=900');
    printWindow.document.write('<html><head><title>Crime Details</title>');
    printWindow.document.write('<style>body{font-family:sans-serif;padding:20px;} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #000;padding:8px;} h1{text-align:center;color:#B91C1C;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h1>Crime Details Report</h1>');
    printWindow.document.write(printRef.current.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="w-full mt-10 min-h-screen bg-black text-white p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-red-500">Crime Details Dashboard</h1>
        <div className="flex gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by any detail..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-lg w-full md:w-[300px] text-black outline-none"
          />
          <button onClick={handlePrint} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Print</button>
          <CSVLink
            data={filteredCrimes}
            headers={[
              { label: "Username", key: "username" },
              { label: "Crime Type", key: "crimetype" },
              { label: "Description", key: "description" },
              { label: "Incident Date", key: "incidentDate" },
              { label: "Incident Time", key: "incidentTime" },
              { label: "Address", key: "incidentLocation.address" },
              { label: "City", key: "incidentLocation.city" },
              { label: "State", key: "incidentLocation.state" },
              { label: "Pincode", key: "incidentLocation.pincode" },
              { label: "Evidence Image", key: "evidence.imageFile" },
              { label: "Suspect", key: "suspectDetails.name" },
              { label: "Acknowledge Number", key: "suspectDetails.acknowledgeNumber" },
              { label: "Status", key: "suspectDetails.status" }
            ]}
            filename="crime_details.csv"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Export to CSV
          </CSVLink>
        </div>
      </div>

      {loading && <p className="text-center text-red-400">Loading...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      {!loading && !error && (
        <div ref={printRef}>
          <table className="w-full border border-red-500">
            <thead>
              <tr className="bg-gray-800 text-red-400">
                <th className="p-3 border border-red-500">Username</th>
                <th className="p-3 border border-red-500">Crime Type</th>
                <th className="p-3 border border-red-500">Description</th>
                <th className="p-3 border border-red-500">Incident Date</th>
                <th className="p-3 border border-red-500">Incident Time</th>
                <th className="p-3 border border-red-500">Location</th>
                <th className="p-3 border border-red-500">Evidence</th>
                <th className="p-3 border border-red-500">Suspect</th>
                <th className="p-3 border border-red-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentCrimes.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-red-400">No results found</td>
                </tr>
              ) : (
                currentCrimes.map((crime, index) => (
                  <tr key={index} className="hover:bg-gray-900">
                    <td className="p-3 border border-red-500">{crime.username}</td>
                    <td className="p-3 border border-red-500">{crime.crimetype}</td>
                    <td className="p-3 border border-red-500">{crime.description}</td>
                    <td className="p-3 border border-red-500">{crime.incidentDate}</td>
                    <td className="p-3 border border-red-500">{crime.incidentTime}</td>
                    <td className="p-3 border border-red-500">
                      {crime.incidentLocation?.address}, {crime.incidentLocation?.city}, {crime.incidentLocation?.state} - {crime.incidentLocation?.pincode}
                    </td>
                    <td className="p-3 border border-red-500">
                      {crime.evidence?.imageFile ? (
                        <img src={crime.evidence.imageFile} alt="Evidence" className="w-16 h-16 rounded-md" />
                      ) : "No Image"}
                    </td>
                    <td className="p-3 border border-red-500">
                      {crime.suspectDetails?.name} <br />
                      {crime.suspectDetails?.description}
                    </td>
                    <td className="p-3 border border-red-500">{crime.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {filteredCrimes.length > recordsPerPage && (
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg border ${currentPage === i + 1
                ? "bg-red-500 text-white"
                : "bg-gray-800 text-red-400 hover:bg-gray-700"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCrimeDetails;
