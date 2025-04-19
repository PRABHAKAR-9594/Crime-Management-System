import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default function BarChart() {
  const data = {
    labels: ["Theft", "Murder", "Fraud", "Assault", "Cybercrime"],
    datasets: [
      {
        label: "Number of Cases",
        backgroundColor: "#ff0000",
        data: [50, 30, 80, 40, 70],
      },
    ],
  };

  return (
    <div className="bg-[#222] p-5 rounded-2xl">
      <h3 className="text-xl text-[#ff0000] mb-2">Crime Reports</h3>
      <Bar data={data} />
    </div>
  );
}
