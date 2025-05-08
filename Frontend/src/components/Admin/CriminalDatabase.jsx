import React, { useRef, useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";

const CriminalDatabase = () => {
  const printRef = useRef();

  const [criminals, setCriminals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const recordsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("https://crime-management-system-p889.onrender.com/criminal-records-all"); // Replace with your API URL
        setCriminals(response.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCriminals = criminals.filter((criminal) => {
    const query = searchQuery.toLowerCase().trim();
    return (
      criminal.firstname?.toLowerCase().includes(query) ||
      criminal.lastname?.toLowerCase().includes(query) ||
      criminal.dob?.toLowerCase().includes(query) ||
      criminal.adharnumber?.toLowerCase().includes(query) ||
      criminal.crimetype?.toLowerCase().includes(query) ||
      criminal.desc?.toLowerCase().includes(query)
    );
  });

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentCriminals = filteredCriminals.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCriminals.length / recordsPerPage);

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const printWindow = window.open('', '', 'height=700,width=900');
    printWindow.document.write('<html><head><title>Crime Management System</title>');
    printWindow.document.write(
      '<style>body{font-family:sans-serif;padding:20px;} table{width:100%;border-collapse:collapse;margin-top:20px;} th,td{border:1px solid #000;padding:8px;text-align:left;} h1{text-align:center;color:#B91C1C}</style>'
    );
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h1>Crime Management System</h1>');
    printWindow.document.write(printRef.current.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="w-full mt-10 min-h-screen bg-black text-white p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-red-500">Criminal Records Dashboard</h1>
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
          <button
            onClick={handlePrint}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Print
          </button>
          <CSVLink
            data={filteredCriminals}
            headers={[
              { label: "First Name", key: "firstname" },
              { label: "Last Name", key: "lastname" },
              { label: "DOB", key: "dob" },
              { label: "Height", key: "height" },
              { label: "Weight", key: "weight" },
              { label: "Aadhar Number", key: "adharnumber" },
              { label: "Crime Type", key: "crimetype" },
              { label: "Description", key: "desc" },
            ]}
            filename="criminal_records.csv"
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
                <th className="p-3 border border-red-500">Photo</th>
                <th className="p-3 border border-red-500">First Name</th>
                <th className="p-3 border border-red-500">Last Name</th>
                <th className="p-3 border border-red-500">DOB</th>
                <th className="p-3 border border-red-500">Height</th>
                <th className="p-3 border border-red-500">Weight</th>
                <th className="p-3 border border-red-500">Aadhar Number</th>
                <th className="p-3 border border-red-500">Crime Type</th>
                <th className="p-3 border border-red-500">Description</th>
              </tr>
            </thead>
            <tbody>
              {currentCriminals.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-red-400">
                    No results found
                  </td>
                </tr>
              ) : (
                currentCriminals.map((criminal, index) => (
                  <tr key={index} className="hover:bg-gray-900">
                    <td className="p-3 border border-red-500">
                      <img src={criminal.criminalImg} alt="Criminal" className="w-16 h-16 rounded-md" />
                    </td>
                    <td className="p-3 border border-red-500">{criminal.firstname}</td>
                    <td className="p-3 border border-red-500">{criminal.lastname}</td>
                    <td className="p-3 border border-red-500">{criminal.dob}</td>
                    <td className="p-3 border border-red-500">{criminal.height}</td>
                    <td className="p-3 border border-red-500">{criminal.weight}</td>
                    <td className="p-3 border border-red-500">{criminal.adharnumber}</td>
                    <td className="p-3 border border-red-500">{criminal.crimetype}</td>
                    <td className="p-3 border border-red-500">{criminal.desc}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {filteredCriminals.length > recordsPerPage && (
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === i + 1
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

export default CriminalDatabase;
