import React from "react";
import Slider from "../components/swiper";
import Navbar from "./Navbar";

export default function Mess() {
  return (
    <div className="grid grid-rows-10 relative w-full min-h-full bg-white">
      <div className="row-span-1">
        <Navbar />
      </div>
      <div className="row-span-9 min-h-screen flex flex-col justify-center items-center gap-3 bg-[#CDF5FD]">
        <div className="flex justify-start items-start bg-white min-h-[95%] w-[90%] rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          
        </div>
      </div>
    </div>
  );
}
