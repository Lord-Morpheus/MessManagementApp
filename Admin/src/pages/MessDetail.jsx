import React from "react";
import MessCard1 from "../components/MessCard";
import Navbar from "./Navbar";

export default function Mess() {
  return (
    <div className="grid grid-rows-10 relative w-full min-h-full bg-white">
      <div className="row-span-1">
        <Navbar />
      </div>
      <div className="row-span-9 min-h-screen flex flex-col justify-center items-center gap-3 bg-white">
        <div className="flex flex-col justify-start items-center bg-white min-h-[95%] w-[90%] rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <div className="flex flex-col justify-start items-center w-[95%] border border-black bg-[#E5E1DA] mt-6 rounded">
            <span className="my-4 text-3xl font-bold ">Mess Details</span>
            <div className="flex flex-wrap justify-between w-[90%] gap-4 mb-3">
              <MessCard1 />
              <MessCard1 />
              <MessCard1 />
              <MessCard1 />
              <MessCard1 />
              <MessCard1 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
