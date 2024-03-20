/* eslint-disable react/prop-types */
import { Link, Outlet } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { BsShop } from "react-icons/bs";
import { LuUser } from "react-icons/lu";
import { VscFeedback } from "react-icons/vsc";

export default function Sidebar(props) {
  return (
    <>
      <div className="flex flex-col items-center h-full w-full bg-gray-100 min-h-lvh ">
        <div className="mb-6 py-6 flex flex-wrap items-center border-b-2 border-gray-600 border-solid">
          <Avatar name={props.username} size={20} textSize={"3xl"} />
          <p className="ml-4 font-bold text-xl text-center">
            Welcome
            <br />
            {props.username || "Admin "}!
          </p>
        </div>
        <div className="flex flex-col justify-center items-start">
          {/* <div className="flex items-center justify-end border mb-6 border-gray-500 rounded-md">
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
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mx-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div> */}
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 mb-2 text-base text-black transition-all  dark:text-gray-400 hover:bg-[#012169] hover:text-white"
              to={"/home"}
            >
              <GoHome className="h-6 w-6" />
              Home
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 mb-2 text-base text-black transition-all  dark:text-gray-400 hover:bg-[#012169] hover:text-white"
              to={"/mess"}
            >
              <BsShop className="h-6 w-6" />
              Mess Details
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 mb-2 text-base text-black transition-all  dark:text-gray-400 hover:bg-[#012169] hover:text-white"
              to={"/student"}
            >
              <LuUser className="h-6 w-6" />
              Registration Details
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 mb-2 text-base text-black transition-all  dark:text-gray-400 hover:bg-[#012169] hover:text-white"
              to={"/viewFeedback"}
            >
              <VscFeedback className="h-6 w-6" />
              Feedbacks
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

export const Avatar = ({ name = "Admin", size = 8, textSize = "base" }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center w-20 h-20 overflow-hidden bg-[#012169] rounded-full dark:bg-gray-600`}
    >
      <div
        className={`flex justify-center items-center w-full h-full text-${textSize} font-medium text-white dark:text-gray-300`}
      >
        {name.toUpperCase()[0]}
      </div>
    </div>
  );
};
