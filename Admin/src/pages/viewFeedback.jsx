import { useEffect } from "react";
import Sidebar from "./sidebar";
import Navbar from "./Navbar";
import FeedbackTable from "../components/FeedbackTable";
import { Card } from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/getToken";

export default function Home() {
  const token = getToken();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //   }
  // });

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
