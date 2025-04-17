import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

export default function ViewCriminalRecord() {
  const [criminals, setCriminals] = useState([]);
  const [adharnumber, setAdharnumber] = useState("");
  const [error, setError] = useState("");

  const validateAadhar = (value) => {
    if (!/^[0-9]{12}$/.test(value)) {
      setError("Aadhaar number must be exactly 12 digits and contain only numbers.");
      return false;
    }
    setError("");
    return true;
  };

  const OnSearch = async () => {
    if (!validateAadhar(adharnumber)) return;

    try {
      const response = await axios.post("http://localhost:8080/searchcriminal", { adharnumber });
      if (response.data.records) {
        const groupedCriminals = {};
        response.data.records.forEach((record) => {
          if (!groupedCriminals[record.adharnumber]) {
            groupedCriminals[record.adharnumber] = {
              _id: record._id,
              firstname: record.firstname,
              lastname: record.lastname,
              dob: record.dob,
              height: record.height,
              weight: record.weight,
              adharnumber: record.adharnumber,
              image: record.criminalImg,
              records: [],
            };
          }
          groupedCriminals[record.adharnumber].records.push({
            crimetype: record.crimetype,
            desc: record.desc,
            reportDate: record.createdAt.split("T")[0],
          });
        });
        setCriminals(Object.values(groupedCriminals));
      }
    } catch (error) {
      console.error("Error fetching criminal records:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-950 text-white pt-[90px] pb-6">
      <h1 className="text-4xl font-extrabold mb-6 border-b-4 border-red-500 pb-2 uppercase tracking-wide">
        View Criminal Records
      </h1>

      <div className="w-full max-w-lg bg-gray-900 p-6 rounded-lg shadow-xl mb-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center border border-red-500 rounded overflow-hidden">
            <input
              type="text"
              value={adharnumber}
              onChange={(e) => setAdharnumber(e.target.value)}
              placeholder="Enter Aadhaar Number"
              className="w-full p-3 bg-transparent text-white outline-none"
            />
            <button
              className={`p-3 transition duration-300 ${"bg-red-600 hover:bg-red-700"}`}
              onClick={OnSearch}

            >
              <FaSearch className="text-white" />
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>

      {criminals.length > 0 && (
        <div className="w-full max-w-4xl bg-gray-900 p-6 rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full text-left border-collapse border border-gray-700">
            <thead>
              <tr className="bg-red-700 text-white">
                <th className="border border-gray-700 p-3">Image</th>
                <th className="border border-gray-700 p-3">Name</th>
                <th className="border border-gray-700 p-3">DOB</th>
                <th className="border border-gray-700 p-3">Height</th>
                <th className="border border-gray-700 p-3">Weight</th>
              </tr>
            </thead>
            <tbody>
              {criminals.map((criminal) => (
                <>
                  <tr key={criminal._id} className="bg-gray-800 text-white hover:bg-gray-700 transition duration-200">
                    <td className="border border-gray-700 p-3">
                      <a href={criminal.image} target="_blank" rel="noopener noreferrer">
                        <img
                          src={criminal.image}
                          alt={criminal.firstname}
                          className="w-16 h-16 rounded-full object-cover border border-red-500 cursor-pointer hover:scale-105 transition-transform"
                        />
                      </a>
                    </td>
                    <td className="border border-gray-700 p-3">
                      {criminal.firstname} {criminal.lastname}
                    </td>
                    <td className="border border-gray-700 p-3">{criminal.dob}</td>
                    <td className="border border-gray-700 p-3">{criminal.height}</td>
                    <td className="border border-gray-700 p-3">{criminal.weight}</td>
                  </tr>
                  <tr className="bg-gray-900">
                    <td colSpan="5">
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-red-500">Criminal Records:</h3>
                        {criminal.records.map((record, index) => (
                          <div key={index} className="bg-gray-800 p-3 my-2 rounded shadow">
                            <p>
                              <strong className="text-red-400">Crime Type:</strong> {record.crimetype}
                            </p>
                            <p>
                              <strong className="text-red-400">Date:</strong> {record.reportDate}
                            </p>
                            <p className="text-sm text-gray-300">{record.desc}</p>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
