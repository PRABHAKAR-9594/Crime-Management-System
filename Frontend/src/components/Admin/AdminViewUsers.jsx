import React, { useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";

const AdminViewUsers = () => {
  const printRef = useRef();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const recordsPerPage = 4;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("http://localhost:8080/users-all");
        setUsers(res.data);
      } catch (err) {
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase().trim();
    return (
      user.username?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.firstName?.toLowerCase().includes(query) ||
      user.lastName?.toLowerCase().includes(query) ||
      user.phone?.includes(query) ||
      user.AdharNumber?.includes(query) ||
      user.address?.city?.toLowerCase().includes(query) ||
      user.address?.state?.toLowerCase().includes(query)
    );
  });

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / recordsPerPage);

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const printWindow = window.open("", "", "height=700,width=900");
    printWindow.document.write("<html><head><title>User Details</title>");
    printWindow.document.write(
      "<style>body{font-family:sans-serif;padding:20px;} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #000;padding:8px;} h1{text-align:center;color:#B91C1C;}</style>"
    );
    printWindow.document.write("</head><body>");
    printWindow.document.write("<h1>User Details Report</h1>");
    printWindow.document.write(printRef.current.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="w-full mt-10 min-h-screen bg-black text-white p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-red-500">User Details Dashboard</h1>
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
            data={filteredUsers}
            headers={[
              { label: "Username", key: "username" },
              { label: "Email", key: "email" },
              { label: "First Name", key: "firstName" },
              { label: "Last Name", key: "lastName" },
              { label: "Phone", key: "phone" },
              { label: "Aadhar Number", key: "AdharNumber" },
              { label: "Street", key: "address.street" },
              { label: "City", key: "address.city" },
              { label: "State", key: "address.state" },
              { label: "Postal Code", key: "address.postalCode" },
              { label: "Country", key: "address.country" },
              { label: "Status", key: "isActive" },
              { label: "Created At", key: "createdAt" },
            ]}
            filename="user_details.csv"
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
                <th className="p-3 border border-red-500">Email</th>
                <th className="p-3 border border-red-500">Full Name</th>
                <th className="p-3 border border-red-500">Phone</th>
                <th className="p-3 border border-red-500">Aadhar</th>
                <th className="p-3 border border-red-500">Location</th>
                <th className="p-3 border border-red-500">Status</th>
                <th className="p-3 border border-red-500">Created At</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-red-400">
                    No results found
                  </td>
                </tr>
              ) : (
                currentUsers.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-900">
                    <td className="p-3 border border-red-500">{user.username}</td>
                    <td className="p-3 border border-red-500">{user.email}</td>
                    <td className="p-3 border border-red-500">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="p-3 border border-red-500">{user.phone}</td>
                    <td className="p-3 border border-red-500">{user.AdharNumber}</td>
                    <td className="p-3 border border-red-500">
                      {user.address?.street}, {user.address?.city}, {user.address?.state} - {user.address?.postalCode}, {user.address?.country}
                    </td>
                    <td className="p-3 border border-red-500">{user.isActive ? "Active" : "Inactive"}</td>
                    <td className="p-3 border border-red-500">{new Date(user.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {filteredUsers.length > recordsPerPage && (
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

export default AdminViewUsers;
