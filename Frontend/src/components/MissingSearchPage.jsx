import { useState } from "react";

const dummyData = [
  {
    _id: "1",
    missingPerson: { fullName: "Rahul Sharma", age: 25, photo: "https://static.missingpeopleofindia.com/wp-content/uploads/2021/08/Rahul-setia.jpeg", contact: "9876543210" },
    lastSeenDetails: { location: "Mumbai", pincode: "400001", date: "2025-03-05" },
  },
  {
    _id: "2",
    missingPerson: { fullName: "Priya Singh", age: 30, photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG2D8U84LE2AhleM_Z6obq2ro4p-82MzWIKg&s", contact: "9876543211" },
    lastSeenDetails: { location: "Delhi", pincode: "110001", date: "2025-03-05" },
  },
  {
    _id: "3",
    missingPerson: { fullName: "Amit Verma", age: 28, photo: "https://via.placeholder.com/300", contact: "9876543212" },
    lastSeenDetails: { location: "Delhi", pincode: "411001", date: "2025-02-25" },
  },
];

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
  const [results, setResults] = useState(dummyData);
  const [comments, setComments] = useState({});

  const handleSearch = () => {
    const today = new Date();
    const filteredResults = dummyData.filter((person) => {
      const personDate = new Date(person.lastSeenDetails.date);
      const daysDifference = (today - personDate) / (1000 * 60 * 60 * 24);

      return (
        person.missingPerson.fullName.toLowerCase().includes(searchName.toLowerCase()) &&
        (!searchPincode || person.lastSeenDetails.pincode.toLowerCase().includes(searchPincode.toLowerCase())) &&
        (daysFilter === "" || (parseInt(daysFilter) >= 0 && daysDifference <= parseInt(daysFilter)))
      );
    });
    setResults(filteredResults);
  };

  const debouncedSearch = debounce(handleSearch, 300);

  return (
    <div className="  bg-gray-900 text-gray-200 rounded-lg shadow-xl border border-gray-700 pt-[80px]">      <h2 className="text-center text-red-500 text-4xl font-bold mb-8">Find Missing Persons</h2>
      
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input type="text" placeholder="Enter name..." value={searchName} onChange={(e) => { setSearchName(e.target.value); debouncedSearch(); }} className="p-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
          <input type="text" placeholder="Enter pincode..." value={searchPincode} onChange={(e) => { setSearchPincode(e.target.value); debouncedSearch(); }} className="p-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
          <input type="number" placeholder="Max days since last seen..." value={daysFilter} onChange={(e) => { setDaysFilter(e.target.value); debouncedSearch(); }} className="p-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
      </div>

      <div className="mt-4 space-y-6">
        {results.length > 0 ? (
          results.map((person) => (
            <div key={person._id} className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex flex-col md:flex-row items-center gap-6">
              <img src={person.missingPerson.photo} alt={person.missingPerson.fullName} className="w-48 h-48 rounded-lg border border-gray-600 cursor-pointer object-cover" />
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
    </div>
  );
};

export default MissingSearchPage;
