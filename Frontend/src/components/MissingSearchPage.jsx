import { useState, useEffect } from "react";
import axios from "axios";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const MissingSearchPage = () => {
  const [searchName, setSearchName] = useState("");
  const [searchPincode, setSearchPincode] = useState("");
  const [daysFilter, setDaysFilter] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMissingPersons = async () => {
    setLoading(true);
    try {
      console.log(searchName, searchPincode, daysFilter);
      const { data } = await axios.get("http://localhost:8080/searchmissing", {
        params: {
          name: searchName,
          pincode: searchPincode,
          days: daysFilter,
        },
      });
      setResults(data.response);
      console.log("Fetched missing persons:", data);
    } catch (error) {
      console.error("Error fetching missing persons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Updated results:", results);
  }, [results]);


  const debouncedFetch = debounce(fetchMissingPersons, 300);

  useEffect(() => {
    fetchMissingPersons(); // Fetch data when the component loads
  }, []);

  useEffect(() => {
    debouncedFetch(); // Fetch data when filters change
  }, [searchName, searchPincode, daysFilter]);

  return (
    <div className="bg-gray-900 text-gray-200 rounded-lg shadow-xl border border-gray-700 pt-[80px]">
      <h2 className="text-center text-red-500 text-4xl font-bold mb-8">Find Missing Persons</h2>

      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input type="text" placeholder="Enter name..." value={searchName}
            onChange={(e) => setSearchName(e.target.value)} className="p-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
          <input type="text" placeholder="Enter pincode..." value={searchPincode}
            onChange={(e) => setSearchPincode(e.target.value)} className="p-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
          <input type="number" placeholder="Max days since last seen..." value={daysFilter}
            onChange={(e) => setDaysFilter(e.target.value)} className="p-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-400 text-lg">Loading...</p>
      ) : (
        <div className="mt-4 space-y-6">
          {results.length > 0 ? (
            results.map((person) => (
              <div key={person._id} className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex flex-col md:flex-row items-center gap-6">
                <a href={person.missingPerson.photo} target="_blank" rel="noopener noreferrer">
                  <img
                    src={person.missingPerson.photo}
                    alt={person.missingPerson.fullName}
                    className="w-48 h-48 rounded-lg border border-gray-600 cursor-pointer object-cover hover:scale-105 transition-transform duration-200"
                  />
                </a>
                <div>
                  <h3 className="text-red-400 text-2xl font-semibold">{person.missingPerson.fullName}</h3>
                  <p className="text-lg">Age: {person.missingPerson.age}</p>
                  <p className="text-lg">Last Seen: {person.lastSeenDetails.location}</p>
                  <p className="text-lg">Pincode: {person.lastSeenDetails.pincode}</p>
                  <p className="text-lg">Missing Since: {person.lastSeenDetails.date}</p>
                  <p className="text-lg font-bold text-red-400">Contact: {person.missingPerson.contact}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 text-lg">No missing persons found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MissingSearchPage;
