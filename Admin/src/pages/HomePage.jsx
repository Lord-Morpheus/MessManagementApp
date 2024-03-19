import React from "react";
import Sidebar from "./sidebar";
import Eating1 from "../images/eatingImg1.svg";
import Eating2 from "../images/eatingImg2.svg";

export default function Home() {
  return (
    <div className="grid grid-cols-10 relative bg-peachette">
      <aside className="self-start col-span-2">
        <Sidebar />
      </aside>
      <div className="col-span-8 h-screen flex justify-center items-center bg-aliceblue">
        <div className="bg-white h-[95%] w-[90%] rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <div className="flex justify-center bg-darkPeach rounded-3xl">
            <img
              className="object-fill h-48 w-96"
              src={Eating1}
              alt="not found"
            />
            <img
              className="object-fill h-48 w-96"
              src={Eating2}
              alt="not found"
            />
            <img
              className="object-fill h-48 w-96"
              src={Eating1}
              alt="not found"
            />
          </div>
          {/* <div className="navbar bg-gray-400 rounded-box">
            <div className="flex-1 px-2 lg:flex-none">
              <a className="text-lg font-bold">daisyUI</a>
            </div>
            <div className="flex justify-end flex-1 px-2">
              <div className="flex items-stretch">
                <a className="btn btn-ghost rounded-btn">Button</a>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost rounded-btn"
                  >
                    Dropdown
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
                  >
                    <li>
                      <a>Item 1</a>
                    </li>
                    <li>
                      <a>Item 2</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
          <li>search filter</li>
          <li>mess menu upload</li>
          <li>footer</li>
        </div>
      </div>
    </div>
  );
}
