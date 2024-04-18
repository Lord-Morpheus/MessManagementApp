import { useEffect } from "react";
import MessCard1 from "../components/MessCard";
import MessCard2 from "../components/MessCard2";
import Navbar from "./Navbar";
import Sidebar from "./sidebar";
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";
import { messOptions } from "../components/data";

export default function Mess() {
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

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
                {messOptions.map(({ name, id }) => (
                  <MessCard2 key={id} mess={name} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
