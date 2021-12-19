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
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { UserReducer } from "../Action/types";
import { apiRequest } from "../API";
import { RootState } from "../Reducer";

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
  "First Quarter",
  "Second Quarter",
  "Third Quarter",
  "Fourth Quarter",
];
const mdata = [1, 3, 5, 7];

interface LineChartProps {
  labels?: string[];
  title: string;
  lineColor?: string;
}
const LineChart = (props: LineChartProps) => {
  const [_data, set_data] = React.useState<number[]>([]);
  const [loading, setLoading] = React.useState(false);

  const { token } = useSelector<RootState>(
    (state) => state.User
  ) as UserReducer;

  React.useEffect(() => {
    setLoading(true);
    apiRequest<number[]>({
      url: `/${
        props.title === "Users" || props.title === "Products"
          ? props.title.slice(0, -1)
          : "category"
      }/by-quarter`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setLoading(false);
        set_data(res);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.title]);
  const data = {
    labels: props.labels || mlabels,
    datasets: [
      {
        label: props?.title || "Products",
        data: _data || mdata,
        borderColor: props?.lineColor || "rgb(255, 99, 132)",
        backgroundColor: props?.lineColor || "rgba(255, 99, 132, 1)",
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

  return !_data && loading ? (
    <Box
      sx={{
        height: "20vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Line data={data} height={"60"} options={options} />
  );
};

export default LineChart;
