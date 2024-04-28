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

export default function HomeCard1() {
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
          `${import.meta.env.VITE_BACKEND_URI}/admin/getMessStudentCount`,
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
        <CardTitle>Students Count</CardTitle>
        <CardDescription>
          Number of students who signed up this month
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        {chartConfig ? <Chart {...chartConfig} /> : "Loading..."}
      </CardContent>
    </Card>
  );
}
