import Chart from "react-apexcharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";

// const chartConfig1 = {
//   type: "bar",
//   height: 240,
//   width: 420,
//   series: [
//     {
//       name: "Revenue",
//       data: [67500, 37500, 40000, 62500, 43750, 25000, 28750, 62500, 26875],
//     },
//   ],
//   options: {
//     chart: {
//       toolbar: {
//         show: false,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     colors: ["#012169"],
//     plotOptions: {
//       bar: {
//         columnWidth: "60%",
//         borderRadius: 2,
//       },
//     },
//     xaxis: {
//       axisTicks: {
//         show: false,
//       },
//       axisBorder: {
//         show: false,
//       },
//       labels: {
//         style: {
//           colors: "#616161",
//           fontSize: "12px",
//           fontFamily: "inherit",
//           fontWeight: 400,
//         },
//       },
//       categories: [
//         "Alder",
//         "Pine",
//         "Oak",
//         "Tulsi",
//         "Peepal",
//         "D3",
//         "D2",
//         "D1",
//         "Yoga",
//       ],
//     },
//     yaxis: {
//       labels: {
//         style: {
//           colors: "#616161",
//           fontSize: "12px",
//           fontFamily: "inherit",
//           fontWeight: 400,
//         },
//       },
//     },
//     grid: {
//       show: false,
//       borderColor: "#dddddd",
//       strokeDashArray: 5,
//       xaxis: {
//         lines: {
//           show: true,
//         },
//       },
//       padding: {
//         top: 5,
//         right: 20,
//       },
//     },
//     fill: {
//       opacity: 0.8,
//     },
//     tooltip: {
//       theme: "dark",
//     },
//   },
// };

export default function HomeCard4() {
  const [chartConfig, setChartConfig] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchChartConfig = async () => {
      const token = getToken();
      if (!token) {
        navigate("/login");
      }
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/admin/getRevenue`,
          {
            headers: {
              Authorization: `Admin ${token}`,
            },
          }
        );
        if (response.status !== 200) {
          console.log("Failed to fetch data");
        }
        const data = response.data;
        setChartConfig(data.data);
      } catch (error) {
        const status = error.response.status;
        console.log(status);
        if (status === 401) {
          console.log("Not Authenticated");
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchChartConfig();
  }, [navigate]);

  console.log(chartConfig, "kk");

  return (
    <Card className="max-h-96 h-full">
      <CardHeader>
        <CardTitle>Revenue Generated</CardTitle>
        <CardDescription>
          Total revenue from each Mess this month
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        {chartConfig ? <Chart {...chartConfig} /> : "Loading..."}
      </CardContent>
    </Card>
  );
}
