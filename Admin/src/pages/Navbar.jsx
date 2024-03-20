import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="bg-[#012169] h-[3.5rem] w-full flex justify-end items-center">
        <div className="flex justify-center items-center mr-3 bg-white w-48 h-10">
          <span>Signed in as Admin</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
        <button className="mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="white"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
        </button>
      </nav>
      <nav className="bg-[#0093dd] h-10 w-full flex justify-center items-center capitalize text-white">
        Welcome to IIT Mandi Admin Portal
      </nav>
    </>
  );
}
