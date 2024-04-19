/* eslint-disable react/prop-types */

import { Filter } from "../components/Filter";
import StudentCard2 from "../components/StudentCard2";
import StudentCard from "../components/StudentCard";
import { getToken } from "../utils/getToken";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { useNavigate } from "react-router-dom";
import { TableComponent } from "../components/StudentTable";
import { Card } from "../components/ui/card";
import axios from "axios";

export const StudentsPage = () => {
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

  const [hostel, setHostel] = useState(null);
  const [mess, setMess] = useState(null);
  const [batch, setBatch] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [username, setUsername] = useState(null);
  const [toDate, setToDate] = useState(null);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col h-full w-full">
        <Navbar />
        <div className="px-6 pb-6 pt-6">
          <StudentCard2 />
        </div>
      </div>
    </div>
  );
};
