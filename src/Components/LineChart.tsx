import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const mlabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];
const mdata = [1, 2, 3, 4, 5, 6, 7];

interface LineChartProps {
  labels?: string[];
  data?: number[];
  title?: string;
}
const LineChart = (props: LineChartProps) => {
  const data = {
    labels: props.labels || mlabels,
    datasets: [
      {
        label: props.title || "Products",
        data: props.data || mdata,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: props.title || "Products",
      },
    },
  };

  return <Line data={data} height={"60"} options={options} />;
};

export default LineChart;
