import React from "react";
import Sidebar from "./sidebar";
import Eating1 from "../images/eatingImg1.svg";
import Eating2 from "../images/eatingImg2.svg";
import Slider from "../components/swiper";

export default function Mess() {
  return (
    <div className="grid grid-cols-10 relative bg-peachette">
      <div className="col-span-8 flex justify-center items-center bg-aliceblue">
        <div className="bg-white flex flex-col justify-start items-center h-[95%] w-[90%] rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <div className="flex justify-center bg-darkPeach rounded-3xl mb-3">
            
          </div>

          <Slider />
        </div>
      </div>
    </div>
  );
}
