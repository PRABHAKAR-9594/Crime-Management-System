import React, { useState, useRef } from "react";
import { TextField, Select, MenuItem, Button, FormControl, InputAdornment } from "@mui/material";
import { Search, Printer } from "lucide-react";

const ViewReports = () => {
  const [reports, setReports] = useState(
    [
      { "id": 1, "type": "Theft", "officer": "John Doe", "date": "2024-03-05", "location": "Mumbai", "status": "Pending" },
      { "id": 2, "type": "Assault", "officer": "Jane Smith", "date": "2024-02-28", "location": "Delhi", "status": "Resolved" },
      { "id": 3, "type": "Fraud", "officer": "Robert Brown", "date": "2024-03-01", "location": "Bangalore", "status": "Investigating" },
      { "id": 4, "type": "Murder", "officer": "Sarah Johnson", "date": "2024-02-15", "location": "Chennai", "status": "Closed" },
      { "id": 5, "type": "Burglary", "officer": "David Wilson", "date": "2024-03-10", "location": "Hyderabad", "status": "Pending" },
      { "id": 6, "type": "Vandalism", "officer": "Emily Clark", "date": "2024-01-22", "location": "Pune", "status": "Resolved" },
      { "id": 7, "type": "Cyber Crime", "officer": "Michael Lee", "date": "2024-02-05", "location": "Kolkata", "status": "Investigating" },
      { "id": 8, "type": "Drug Possession", "officer": "Sophia Martinez", "date": "2024-03-08", "location": "Ahmedabad", "status": "Pending" },
      { "id": 9, "type": "Hit and Run", "officer": "James Taylor", "date": "2024-02-18", "location": "Jaipur", "status": "Closed" },
      { "id": 10, "type": "Extortion", "officer": "Olivia White", "date": "2024-01-30", "location": "Lucknow", "status": "Resolved" },
      { "id": 11, "type": "Kidnapping", "officer": "Liam Harris", "date": "2024-03-02", "location": "Patna", "status": "Investigating" },
      { "id": 12, "type": "Car Theft", "officer": "Isabella Nelson", "date": "2024-03-06", "location": "Bhopal", "status": "Pending" },
      { "id": 13, "type": "Arson", "officer": "Ethan Walker", "date": "2024-02-11", "location": "Thiruvananthapuram", "status": "Closed" },
      { "id": 14, "type": "Bribery", "officer": "Charlotte Allen", "date": "2024-03-07", "location": "Chandigarh", "status": "Resolved" },
      { "id": 15, "type": "Human Trafficking", "officer": "Noah Scott", "date": "2024-01-28", "location": "Indore", "status": "Investigating" }
  ]
  
  );

  const [searchCategory, setSearchCategory] = useState("crimeType");
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sortByDate, setSortByDate] = useState("desc");
  const reportRef = useRef(null);

  const filteredReports = reports
    .filter((report) => {
      if (searchCategory === "crimeType") return report.type.toLowerCase().includes(searchQuery.toLowerCase());
      if (searchCategory === "officerName") return report.officer.toLowerCase().includes(searchQuery.toLowerCase());
      if (searchCategory === "location") return report.location.toLowerCase().includes(searchQuery.toLowerCase());
      if (searchCategory === "date") {
        if (fromDate && toDate) {
          return report.date >= fromDate && report.date <= toDate;
        }
        return true;
      }
      return true;
    })
    .sort((a, b) => (sortByDate === "asc" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)));

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const content = `
      <html>
        <head>
          <title>Report Summary</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; color: black; }
            h2 { text-align: center; color: #d32f2f; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #d32f2f; color: white; }
            .print-date { text-align: right; font-size: 14px; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <h2>Crime Reports</h2>
          <p class="print-date">Printed on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Officer</th>
                <th>Date</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredReports.map(
                (report) => `
                  <tr>
                    <td>${report.id}</td>
                    <td>${report.type}</td>
                    <td>${report.officer}</td>
                    <td>${report.date}</td>
                    <td>${report.location}</td>
                    <td style="color: ${report.status === "Resolved" ? "green" : "orange"};">
                      ${report.status}
                    </td>
                  </tr>
                `
              ).join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="w-full min-h-screen mt-10 bg-black text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-red-500 mb-6">View Reports</h1>

      <div className="w-full  bg-gray-900 p-6 rounded-lg border border-red-500 shadow-lg">
        {/* Search Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4 w-full">
          <FormControl className="w-1/3">
            <Select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="bg-white rounded-md text-black"
            >
              <MenuItem value="crimeType">Crime Type</MenuItem>
              <MenuItem value="officerName">Officer Name</MenuItem>
              <MenuItem value="location">Location</MenuItem>
              <MenuItem value="date">Date</MenuItem>
            </Select>
          </FormControl>

          {searchCategory === "date" ? (
            <div className="flex gap-4 w-full">
              <TextField
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                variant="filled"
                className="bg-white rounded-md text-black w-1/2"
                label="From"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                variant="filled"
                className="bg-white rounded-md text-black w-1/2"
                label="To"
                InputLabelProps={{ shrink: true }}
              />
            </div>
          ) : (
            <TextField
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              fullWidth
              className="bg-white rounded-md text-black"
              placeholder={`Search ${searchCategory.replace(/([A-Z])/g, " $1")}`}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="text-black" />
                  </InputAdornment>
                ),
              }}
            />
          )}

          <Button
            onClick={() => setSortByDate(sortByDate === "asc" ? "desc" : "asc")}
            variant="contained"
            color="error"
          >
            Sort {sortByDate === "asc" ? "↑" : "↓"}
          </Button>
        </div>

        {/* Reports Table */}
        <div ref={reportRef} className="overflow-auto max-h-80 bg-gray-800 p-4 rounded-lg">
          <table className="w-full text-white border-collapse">
            <thead>
              <tr className="bg-red-700 text-white text-lg">
                <th className="p-3">ID</th>
                <th className="p-3">Type</th>
                <th className="p-3">Officer</th>
                <th className="p-3">Date</th>
                <th className="p-3">Location</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                  <td className="p-3 text-center">{report.id}</td>
                  <td className="p-3">{report.type}</td>
                  <td className="p-3">{report.officer}</td>
                  <td className="p-3">{report.date}</td>
                  <td className="p-3">{report.location}</td>
                  <td className={`p-3 ${report.status === "Resolved" ? "text-green-400" : "text-yellow-400"}`}>
                    {report.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Print Button */}
        <div className="mt-4 flex justify-end">
          <Button onClick={handlePrint} variant="contained" color="primary" startIcon={<Printer size={20} />}>
            Print Reports
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewReports;
