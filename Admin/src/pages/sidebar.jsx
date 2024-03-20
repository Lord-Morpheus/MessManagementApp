import React from "react";
import { Link, Outlet } from "react-router-dom";
import profilePic from "../images/femaleAvatar.svg";

export default function Sidebar() {
  function toggleDropdown() {
    let dropdown = document.getElementById("dropdown");
    console.log("clicked");
    return dropdown.classList.toggle("hidden");
  }

  return (
    <>
      <div className="flex">
        <div className="flex flex-col items-center w-[25%] bg-white min-h-lvh">
          <div className=" mb-6 flex flex-wrap items-center border-b-2 border-gray-600 border-solid">
            <img className="w-2/5 m-3" src={profilePic} alt="not found" />
            <p className="font-bold mt-3 text-lg">Welcome Admin!</p>
          </div>
          <div className="flex flex-col justify-center items-start">
            <div className="flex items-center justify-end border mb-6 border-gray-500 rounded-md">
              <input
                className="w-full h-9 rounded text-center "
                type="search"
                name="search"
                id="search"
                placeholder="Search"
              />
              <button type="submit" className=" border-l-2 border-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 mx-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center mb-2">
              <i className="bi bi-house-fill ml-[5%]">
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
                    d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                  />
                </svg>
              </i>
              <Link className="text-decoration-none" to="/home">
                <div className="w-full text-dark ml-3 text-lg">Home</div>
              </Link>
            </div>
            <div className="input-group flex items-center mb-2">
              <i className="bi bi-cup-fill ml-1">
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
                    d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                  />
                </svg>
              </i>
              <Link className=" " to="/mess">
                <span className="ml-3 text-lg">Mess Details</span>
              </Link>
            </div>
            <div className="input-group flex items-center mb-2">
              <i className="bi bi-building-fill ml-1">
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
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </i>
              <Link className="text-decoration-none">
                <span className="ml-3 text-dark text-lg">
                  Registraion Details
                </span>
              </Link>
            </div>
            {/* <div className="input-group flex items-center mb-2">
          <i className="bi bi-person-fill ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
          </i>
          <Link className="text-decoration-none" to="/student">
          <span className="ml-3 text-dark">Student Details</span>
          </Link>
        </div> */}
            <div
              id="dropdownButton"
              onClick={toggleDropdown}
              className="input-group flex items-center cursor-pointer select-none"
            >
              <i className="bi bi-journal-bookmark-fill ml-1">
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
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
              </i>
              <span className="ml-3 text-dark text-lg mr-1">Feedback</span>
              <i class="bi bi-chevron-down">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </i>
            </div>
          </div>
          <div id="dropdown" className="rounded bg-white mx-10 py-1 hidden">
            <div className="cursor-pointer flex justify-center hover:bg-gray-300 py-1">
              <Link onClick={toggleDropdown} className="" to="/giveFeedback">
                Give Feedback
              </Link>
            </div>
            <div
              onClick={toggleDropdown}
              className="cursor-pointer flex justify-center hover:bg-gray-300 py-1"
            >
              <Link to="/ViewFeedback">view feedback</Link>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}
