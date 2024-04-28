import Chart from "react-apexcharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/getToken";
import axios from "axios";

// const chartConfig3 = {
//   type: "bar",
//   height: 240,
//   width: 420,
//   series: [
//     {
//       name: "Strength",
//       data: [250, 153, 112, 184, 191, 126, 92, 148, 62],
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

export default function HomeCard3() {
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
          `${import.meta.env.VITE_BACKEND_URI}/admin/getFeedbackCount`,
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

  console.log(chartConfig);

  return (
    <Card className="max-h-96 h-full">
      <CardHeader>
        <CardTitle>Feedback Count</CardTitle>
        <CardDescription>
          Number of students who sent feedback this month
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        {chartConfig ? <Chart {...chartConfig} /> : "Loading..."}
      </CardContent>
    </Card>
  );
}
