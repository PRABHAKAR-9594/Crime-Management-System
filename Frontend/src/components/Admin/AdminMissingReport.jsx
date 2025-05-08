import React, { useRef, useState, useEffect } from "react";
import { CSVLink } from "react-csv"; // Import CSV export library
import axios from "axios"; // Axios for API calls

const AdminMissingPersons = () => {
  const printRef = useRef();

  const [missingPersons, setMissingPersons] = useState([]); // State to store fetched data
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const personsPerPage = 4; // Show 4 records per page

  // Fetch data from the API when the component loads
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("https://crime-management-system-p889.onrender.com/missing-report-all"); // Replace with your API URL
        setMissingPersons(response.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter the fetched missing persons based on the search query
  const filteredPersons = missingPersons.filter((person) => {
    const query = searchQuery.toLowerCase().trim();
    return (
      person.name?.toLowerCase().includes(query) ||
      person.lastSeen?.toLowerCase().includes(query) ||
      person.dateMissing?.toLowerCase().includes(query) ||
      person.status?.toLowerCase().includes(query) ||
      person.officer?.toLowerCase().includes(query)
    );
  });

  // Pagination logic
  const indexOfLastPerson = currentPage * personsPerPage;
  const indexOfFirstPerson = indexOfLastPerson - personsPerPage;
  const currentPersons = filteredPersons.slice(indexOfFirstPerson, indexOfLastPerson);
  const totalPages = Math.ceil(filteredPersons.length / personsPerPage);

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
        <h1 className="text-3xl font-bold text-red-500">Missing Persons Dashboard</h1>
        <div className="flex gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by any detail..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // reset page on search
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
            data={filteredPersons}
            headers={[
              { label: "Name", key: "name" },
              { label: "Age", key: "age" },
              { label: "Last Seen", key: "lastSeen" },
              { label: "Date Missing", key: "dateMissing" },
              { label: "Contact", key: "contact" },
              { label: "Status", key: "status" },
              { label: "Officer", key: "officer" },
            ]}
            filename="missing_persons.csv"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Export to CSV
          </CSVLink>
        </div>
      </div>

      {/* Show loading spinner */}
      {loading && <p className="text-center text-red-400">Loading...</p>}

      {/* Show error message */}
      {error && <p className="text-center text-red-400">{error}</p>}

      {/* Show table of missing persons */}
      {!loading && !error && (
        <div ref={printRef}>
          <table className="w-full border border-red-500">
            <thead>
              <tr className="bg-gray-800 text-red-400">
                <th className="p-3 border border-red-500">Photo</th>
                <th className="p-3 border border-red-500">Name</th>
                <th className="p-3 border border-red-500">Age</th>
                <th className="p-3 border border-red-500">Last Seen</th>
                <th className="p-3 border border-red-500">Date Missing</th>
                <th className="p-3 border border-red-500">Status</th>
                <th className="p-3 border border-red-500">Officer</th>
                <th className="p-3 border border-red-500">Contact</th>
              </tr>
            </thead>
            <tbody>
              {currentPersons.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-red-400">
                    No results found
                  </td>
                </tr>
              ) : (
                currentPersons.map((person, index) => (
                  <tr key={index} className="hover:bg-gray-900">
                    <td className="p-3 border border-red-500">
                      <img src={person.photo} alt="Person" className="w-16 h-16 rounded-md" />
                    </td>
                    <td className="p-3 border border-red-500">{person.name}</td>
                    <td className="p-3 border border-red-500">{person.age}</td>
                    <td className="p-3 border border-red-500">{person.lastSeen}</td>
                    <td className="p-3 border border-red-500">{person.dateMissing}</td>
                    <td className="p-3 border border-red-500">{person.status}</td>
                    <td className="p-3 border border-red-500">{person.officer}</td>
                    <td className="p-3 border border-red-500">{person.contact}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {filteredPersons.length > personsPerPage && (
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

export default AdminMissingPersons;
