import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
// import { DropDown } from "../components/DropDown";
import HomeCard1 from "../components/HomeCard1";
import HomeCard2 from "../components/HomeCard2";
import HomeCard3 from "../components/HomeCard3";
import HomeCard4 from "../components/HomeCard4";
import { Card } from "../components/ui/card";

import Navbar from "./Navbar";
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  // const toggleDrawer = () => {
  //   setDrawerOpen(!drawerOpen);
  // };

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
        <Card className="flex flex-col p-2 m-12 md:p-2 rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <div>
            <h1 className="text-4xl font-bold text-center m-4">Analytics</h1>
          </div>
          <main className="flex flex-1 flex-col gap-4 p-4 mx-12 md:gap-4 md:p-4">
            <div className="grid gap-12 md:grid-cols-2">
              <HomeCard1 />
              <HomeCard2 />
              <HomeCard3 />
              <HomeCard4 />
            </div>
          </main>
        </Card>
      </div>
    </div>
  );
}
