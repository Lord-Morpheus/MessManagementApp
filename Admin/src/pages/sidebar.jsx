/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { BsArrowRightShort, BsShop } from "react-icons/bs";
import { LuUser } from "react-icons/lu";
import { VscFeedback } from "react-icons/vsc";
import { BsArrowLeftShort } from "react-icons/bs";
import { MdOutlineRestaurantMenu } from "react-icons/md";

export default function Sidebar(props) {
  const [Open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`flex flex-col bg-gray-100 p-5 pt-8 min-h-screen duration-300 ${
          Open ? "w-72" : "w-20"
        } duration-300 relative`}
      >
        {Open ? (
          <BsArrowLeftShort
            className={`bg-white text-black text-3xl rounded-full absolute -right-3 top-9 border border-[#012169] cursor-pointer ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!Open)}
          />
        ) : (
          <BsArrowRightShort
            className={`bg-white text-black text-3xl rounded-full absolute -right-3 top-9 border border-[#012169] cursor-pointer ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!Open)}
          />
        )}

        <div
          className={`mb-6 h-40 py-6 flex items-center border-b-2 border-gray-600 border-solid `}
        >
          <Avatar name={props.username} size={20} textSize={"3xl"} />
          <p
            className={`p-4 font-bold text-xl text-center ${
              !Open && "scale-0"
            }`}
          >
            Welcome
            <br />
            {props.username || "Admin "}!
          </p>
        </div>
        <div className="flex flex-col justify-center items-start">
          <nav
            className={`flex flex-col items-start text-sm font-medium ${
              !Open ? "px-2 w-10" : "px-4"
            }`}
          >
            <Link
              className={`flex items-center gap-3 rounded-lg py-2 mb-2 text-base text-black transition-all  dark:text-gray-400   ${
                !Open
                  ? "hover:text-[#012169]"
                  : "px-3 hover:bg-[#012169] hover:text-white"
              }`}
              to={"/home"}
            >
              <GoHome className="h-6 w-6" />
              {!Open ? (<></>):(<><span>Home</span></>)}
              {/* <span className={`${!Open && "scale-0"}`}>Home</span> */}
            </Link>
            <Link
              className={`flex items-center gap-3 rounded-lg py-2 mb-2 text-base text-black transition-all  dark:text-gray-400 ${
                !Open
                  ? "hover:text-[#012169]"
                  : "px-3 hover:bg-[#012169] hover:text-white"
              }`}
              to={"/mess"}
            >
              <BsShop className='h-6 w-6' />
              {!Open ? (<></>):(<><span>Mess Details</span></>)}
            </Link>
            <Link
              className={`flex items-center gap-3 rounded-lg py-2 mb-2 text-base text-black transition-all  dark:text-gray-400 ${
                !Open
                  ? "hover:text-[#012169] "
                  : "px-3 hover:bg-[#012169] hover:text-white"
              }`}
              to={"/student"}
            >
              <LuUser className='h-7 w-7' />
              {!Open ? (<></>):(<><span>Registration Details</span></>)}
            </Link>
            <Link
              className={`flex items-center gap-3 rounded-lg py-2 mb-2 text-base text-black transition-all  dark:text-gray-400 ${
                !Open
                  ? "hover:text-[#012169]"
                  : "px-3 hover:bg-[#012169] hover:text-white"
              }`}
              to={"/viewFeedback"}
            >
              <VscFeedback className="h-6 w-6" />
              {!Open ? (<></>):(<><span>Feedback</span></>)}
            </Link>
            <Link
              className={`flex items-center gap-3 rounded-lg py-2 mb-2 text-base text-black transition-all  dark:text-gray-400 ${
                !Open
                  ? "hover:text-[#012169]"
                  : "px-3 hover:bg-[#012169] hover:text-white"
              }`}
              to={"/menu"}
            >
              <MdOutlineRestaurantMenu className='h-6 w-6'/>
              {!Open ? (<></>):(<><span>Mess Menu</span></>)}
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

const Avatar = ({
  name = "Admin",
  textSize = "base",
  bgColor = "[#012169]",
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center w-20 h-20 overflow-hidden bg-${bgColor} rounded-full dark:bg-gray-600`}
    >
      <div
        className={`flex justify-center items-center w-full h-full text-${textSize} font-medium text-white dark:text-gray-300`}
      >
        {name.toUpperCase()[0]}
      </div>
    </div>
  );
};
