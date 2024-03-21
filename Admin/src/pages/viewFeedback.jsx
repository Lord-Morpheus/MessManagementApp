import React from "react";
import Sidebar from "./sidebar";
import Navbar from "./Navbar";
import Eating1 from "../images/eatingImg1.svg";
import Eating2 from "../images/eatingImg2.svg";
import FeedbackTable from "../components/FeedbackTable";
import { Card } from "../components/ui/card";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="row-span-1">
          <Navbar />
        </div>
        <Card className="flex flex-shrink h-full flex-col p-2 m-12 md:p-2">
          <FeedbackTable />
        </Card>
      </div>
    </div>
  );
}
