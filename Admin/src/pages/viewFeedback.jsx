import { useEffect } from "react";
import Sidebar from "./sidebar";
import Navbar from "./Navbar";
import FeedbackTable from "../components/FeedbackTable";
import { Card } from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/getToken";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    async function authenticate() {
      const token = getToken();
      if (!token) {
        navigate("/login");
      }
      try {
        const data = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/admin/authenticate`,
          {
            headers: {
              Authorization: `Admin ${token}`,
            },
          }
        );
      } catch (error) {
        const status = error.response.status;
        console.log(status);
        if (status === 401) {
          console.log("Not Authenticated");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          console.log("Authenticated");
          navigate("/home");
        }
      }
    }
    authenticate();
  }, []);

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
