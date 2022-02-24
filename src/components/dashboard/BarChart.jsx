import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["Reports", "Requests", "Posts", "Records"];

export const data = {
  labels,
  datasets: [
    {
      label: "PMS data",
      data: [12, 10, 15, 20],
      borderColor: "red",
      backgroundColor: ["blue", "red", "pink", "yellow"],
      boderWidth: 1,
    },
  ],
  optios: {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
};

export function BarChart() {
  return (
    <Bar options={options} data={data} style={{ backgroundColor: "white" }} />
  );
}
