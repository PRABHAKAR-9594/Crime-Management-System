import React from "react";
import { Pie } from "react-chartjs-2";

export default function PieChart() {
  const data = {
    labels: ["Solved Cases", "Pending Cases"],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["#00ff00", "#ff0000"],
      },
    ],
  };

  return (
    <div className="bg-[#222] p-5 rounded-2xl">
      <h3 className="text-xl text-[#ff0000] mb-2">Case Status</h3>
      <Pie data={data} />
    </div>
  );
}
