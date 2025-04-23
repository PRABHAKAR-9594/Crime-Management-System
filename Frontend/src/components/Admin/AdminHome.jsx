import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import {
  FaUsers,
  FaFileAlt,
  FaExclamationTriangle,
  FaGavel,
  FaUserShield,
  FaSearch,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { use } from "react";
import axios from "axios";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const AdminHome = () => {
  const [stats, setStats] = useState({
    UserReport: 0,
    CrimeReport: 0,
    criminalReport: 0,
    MissingReport: 0,
  });

  const [pieValues, setPieValues] = useState({
    resolved: 0,
    pending: 0,
    underInvestigation: 0,
  });

  const [barLabels, setBarLabels] = useState([]);
const [barValues, setBarValues] = useState([]);

  useEffect(() => {
    // Simulated API fetch for real-time updates
    setTimeout(() => {
      setStats({
        UserReport: 0,
    CrimeReport: 0,
    criminalReport: 0,
    MissingReport: 0,
      });
    }, 1000);
  }, []);

  const cardData = [
    {
      title: "User Reports",
      value: stats.departments,
      icon: <FaUserShield className="text-red-500 text-3xl" />,
      link: "/admin/view-user-details",
    },
    {
      title: "Crime Reports",
      value: stats.activeCases,
      icon: <FaGavel className="text-red-500 text-3xl" />,
      link: "/admin/view-crime-details",
    },
    {
      title: "Criminal Records",
      value: stats.criminalRecords,
      icon: <FaSearch className="text-red-500 text-3xl" />,
      link: "/admin/criminal-database",
    },
    {
      title: "Missing Reports",
      value: stats.pendingComplaints,
      icon: <FaExclamationTriangle className="text-red-500 text-3xl" />,
      link: "/admin/missing-reports",
    },
  ];

  useEffect(() => {
    const fetchCrimeTypeData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/getcrimeTypeCount");
        
  
        const labels = Object.keys(res.data).map(
          (label) => label.charAt(0).toUpperCase() + label.slice(1)
        ); // Capitalize first letter
        const values = Object.values(res.data);
  
        setBarLabels(labels);
        setBarValues(values);
      } catch (err) {
        console.error("Error fetching crime type data:", err);
      }
    };
  
    fetchCrimeTypeData();
  }, []);
  
  const barData = {
    labels: barLabels,
    datasets: [
      {
        label: "Reported Cases (Monthly)",
        data: barValues,
        backgroundColor: [
          "#FF3131",
          "#991B1B",
          "#7F1D1D",
          "#B91C1C",
          "#F43F5E",
          "#E11D48",
          "#FF6B6B",
          "#C53030",
          "#9B2C2C",
          "#742A2A",
        ],
        borderColor: "#FF3131",
        borderWidth: 1,
      },
    ],
  };

  // Pie Chart Data (Case Status)
// Api for pieData
useEffect(() => {
  const fetchPieData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/getPiedata");
      
      // Assuming your API returns { resolved: X, pending: Y, underInvestigation: Z }
      setPieValues({
        open: res.data.open || 0,
        closed: res.data.closed || 0,
        underInvestigation: res.data.underInvestigation || 0,
      });
    } catch (err) {
      console.error("Error fetching pie data:", err);
    }
  };

  fetchPieData();
}, []);

const pieData = {
  labels: ["Open", "Closed", "Under Investigation"],
  datasets: [
    {
      data: [
        pieValues.open,
        pieValues.closed,
        pieValues.underInvestigation,
      ],
      backgroundColor: [
        "#FF5733",  // Vivid Orange-Red (Open)
        "#33FF57",  // Bright Green (Closed)
        "#3380FF",  // Bright Blue (Under Investigation)
      ],
      hoverBackgroundColor: [
        "#FF784E",  // Lighter Orange-Red
        "#66FF7A",  // Lighter Green
        "#5C9DFF",  // Lighter Blue
      ],
      backgroundColor: ["#FF3131", "#991B1B", "#7F1D1D"],
      hoverBackgroundColor: ["#FF6161", "#B91C1C", "#9D1B1B"],
    },
  ],
};

  return (
    <div className="w-full min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-extrabold text-red-500 mb-8"></h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          <Link to={card.link} key={index}>
            <div className="p-6 flex justify-between items-center shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 border border-red-500 transform hover:scale-105 hover:shadow-red-500">
              <div>
                <h2 className="text-gray-300 text-lg font-semibold">{card.title}</h2>
                {/* <p className="text-4xl font-bold text-red-500">{card.value}</p> */}
              </div>
              {card.icon}
            </div>
          </Link>
        ))}
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-xl shadow-md border border-red-500">
          <h2 className="text-xl font-semibold text-red-400 mb-4">Crime Report Statistics</h2>
          <Bar data={barData} />
        </div>

        {/* Adjusted Pie Chart Size */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-xl shadow-md border border-red-500 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-red-400 mb-4">Case Status Distribution</h2>
          <div className="w-96 h-96">
            <Pie data={pieData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
