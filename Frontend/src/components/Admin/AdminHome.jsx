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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const AdminHome = () => {
  const [stats, setStats] = useState({
    UserReport: 0,
    CrimeReport: 0,
    criminalReport: 0,
    MissingReport: 0,
  });

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
      link: "/admin/missi",
    },
  ];

  // Bar Chart Data (Crime Report Statistics)
  const barData = {
    labels: ["Robbery", "Assault", "Fraud", "Homicide", "Cybercrime", "Vandalism"],
    datasets: [
      {
        label: "Reported Cases (Monthly)",
        data: [120, 90, 140, 50, 200, 75],
        backgroundColor: [
          "#FF3131",
          "#991B1B",
          "#7F1D1D",
          "#B91C1C",
          "#F43F5E",
          "#E11D48",
        ],
        borderColor: "#FF3131",
        borderWidth: 1,
      },
    ],
  };

  // Pie Chart Data (Case Status)
  const pieData = {
    labels: ["Resolved", "Pending", "Under Investigation"],
    datasets: [
      {
        data: [45, 35, 20],
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
