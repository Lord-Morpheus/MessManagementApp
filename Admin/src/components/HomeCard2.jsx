import Chart from "react-apexcharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const chartConfig2 = {
  type: "bar",
  height: 240,
  series: [
    {
      name: "Strength",
      data: [285,1600,1270],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      display: false,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#012169"],
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 2,
      },
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: [
        "jain",
        "veg",
        "non-veg",
      ],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: false,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  },
};

export default function HomeCard2() {
  return (
    <Card className="max-h-96 h-full">
      <CardHeader>
        <CardTitle>Students Count</CardTitle>
        <CardDescription>
          Number of students with Food Preference
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <Chart {...chartConfig2} />
      </CardContent>
    </Card>
  );
}