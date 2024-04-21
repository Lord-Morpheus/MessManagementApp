import React from "react";
import Messimg from "../images/mess.jpg";
import Security from '../images/security.svg'

function FrontOfCard() {
  return (
    <div className="absolute inset-0 flex justify-center items-top bg-black transition-all duration-100 delay-200 z-20 hover:opacity-0">
      <div class="relative max-w-xl mx-auto">
        <img
          class="h-64 w-full object-cover rounded-md blur"
          src={Security}
          alt="Random image"
        />
        <div class="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <h2 class="text-white text-3xl font-bold">Mess A</h2>
        </div>
      </div>
    </div>
  );
}

function BackOfCard() {
  return (
    <div className="absolute inset-0 flex justify-center items-center bg-white transition-all duration-100 z-10 card-back text-black">
      <div
        id="dropdown"
        className="content flex flex-col items-start gap-2"
      >
        <span className="text-2xl mt-3 ml-4 capitalize">vendor details</span>
        <div className="group flex ml-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <span className="text-lg ml-2">Vendor Name</span>
        </div>
        <div className="group flex ml-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </svg>

          <span className="text-lg ml-2">Vendor contact</span>
        </div>
        <div className="group flex items-center ml-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
          <span className="text-lg ml-2">Vendor Email</span>
        </div>
      </div>
    </div>
  );
}


export default function MessCard1() {
  return (
    <div className="relative w-72 h-96 rounded-2xl text-white overflow-hidden cursor-pointer transition-all duration-700 card">
      <FrontOfCard/>
      <BackOfCard/>
    </div>
  );
}
