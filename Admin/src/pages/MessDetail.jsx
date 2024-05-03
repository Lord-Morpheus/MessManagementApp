import { useEffect, useState } from "react";
import MessCard2 from "../components/MessCard2";
import Navbar from "./Navbar";
import Sidebar from "./sidebar";
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Mess() {
  const navigate = useNavigate();
  const [messOptions, setMessOptions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = getToken();
      if (!token) {
        navigate("/login");
      }
      try {
        const messoptions = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/admin/mess`,
          {
            headers: {
              Authorization: `Admin ${token}`,
            },
          }
        );
        const data = messoptions.data;
        setMessOptions(data);
      } catch (error) {
        const status = error.response.status;
        console.log(status);
        if (status === 401) {
          console.log("Not Authenticated");
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    }
    fetchData();
  }, [navigate]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="row-span-1">
          <Navbar />
        </div>
        <div className="row-span-9 min-h-screen flex flex-col justify-center items-center bg-white">
          <div className="flex flex-col justify-start items-center bg-white min-h-[95%] w-[90%] rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
            <div className="flex flex-col justify-start items-center w-[95%] mt-6 rounded">
              <span className=" mb-8 text-4xl font-bold ">Mess Details</span>
              <div className="flex flex-wrap justify-between w-[90%] gap-4 mb-3">
                {messOptions ? (
                  messOptions.map(({ firm, firmMail, name, id }) => (
                    <MessCard2
                      key={id}
                      mess={name}
                      firm={firm}
                      mail={firmMail}
                    />
                  ))
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
