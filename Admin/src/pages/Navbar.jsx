import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav
        className="relative flex w-full flex-nowrap items-center justify-between bg-slate-800 py-2 text-neutral-500 shadow-dark-mild hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4"
        data-twe-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="mx-4">
            <a
              className="text-xl font-semibold text-blue-700 dark:text-white"
              href="#"
            >
              Mess Management
            </a>
          </div>

          <button
            className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-twe-collapse-init
            data-twe-target="#navbarSupportedContent3"
            aria-controls="navbarSupportedContent3"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
          <div
            className="!visible hidden flex-grow justify-center basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
            id="navbarSupportedContent3"
            data-twe-collapse-item
          >
            <div
              className="list-style-none me-auto flex flex-col justify-center items-center lg:flex-row"
              data-twe-navbar-nav-ref
            >
              <div
                className="flex justify-center items-center h-9 w-28 mx-2 hover:bg-gray-700 rounded-full"
                data-twe-nav-item-ref
              >
                <Link
                  className="flex justify-center w-full text-white"
                  to="/home"
                >
                  Dashboard
                </Link>
              </div>
              <div
                className="flex justify-center items-center h-9 w-28 hover:bg-gray-700 rounded-full mx-2"
                data-twe-nav-item-ref
              >
                <Link
                  className="w-full flex justify-center text-white"
                  to="/login"
                >
                  Home
                </Link>
              </div>
              <div
                className="flex justify-center items-center h-9 w-28 hover:bg-gray-700 rounded-full mx-2"
                data-twe-nav-item-ref
              >
                <Link
                  className="w-full flex justify-center text-white"
                  to="/signup"
                  data-twe-nav-link-ref
                >
                  Mess
                </Link>
              </div>{" "}
              <div
                className="flex justify-center items-center h-9 w-28 hover:bg-gray-700 rounded-full mx-2"
                data-twe-nav-item-ref
              >
                <Link
                  className="w-full flex justify-center text-white"
                  to="/signup"
                  data-twe-nav-link-ref
                >
                  Hostels
                </Link>
              </div>{" "}
              <div
                className="flex justify-center items-center h-9 w-28 hover:bg-gray-700 rounded-full mx-2"
                data-twe-nav-item-ref
              >
                <Link
                  className="w-full flex justify-center text-white"
                  to="/signup"
                  data-twe-nav-link-ref
                >
                  Students
                </Link>
              </div>
              <div
                className="flex justify-center items-center h-9 w-28 hover:bg-gray-700 rounded-full mx-2"
                data-twe-nav-item-ref
              >
                <Link
                  className="w-full flex justify-center text-white"
                  to="/signup"
                  data-twe-nav-link-ref
                >
                  Feedbacks
                </Link>
              </div>
            </div>
            <button
              type="button"
              className=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
