/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const DropDown = ({ username, name, email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const calculateDropdownPosition = () => {
    if (dropdownRef.current) {
      const buttonRect = dropdownRef.current.getBoundingClientRect();
      const top = buttonRect.top + buttonRect.height;
      const left = buttonRect.left;
      setDropdownPosition({ top, left });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", calculateDropdownPosition);
    return () => {
      window.removeEventListener("scroll", calculateDropdownPosition);
    };
  }, []);

  useEffect(() => {
    calculateDropdownPosition();
  }, [isOpen]);

  return (
    <div ref={dropdownRef}>
      <button
        id="dropdownInformationButton"
        onClick={toggleDropDown}
        className="text-black bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-transform duration-300 ease-in-out transform hover:scale-105"
        type="button"
      >
        Signed in as{` ${username}`}
        <IoIosArrowDropdown className="w-8 h-4" />
      </button>
      <div
        id="dropdownInformation"
        className={`z-10 w-[12.5%] ${
          isOpen ? "block" : "hidden"
        } bg-white  divide-y z-50 fixed divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
        style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div className="flex flex-row justify-start items-center">
            <Avatar name={name} bgColor="gray-500" />
            <div className="ml-4">{name}</div>
          </div>
          <div className="font-medium truncate mt-2">{email}</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownInformationButton"
        >
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
        </ul>
        <div className="py-2">
          <button
            href="#"
            className="block px-4 py-2 w-full text-start text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

const Avatar = ({
  name = "Admin",
  textSize = "base",
  bgColor = "[#012169]",
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-${bgColor} rounded-full dark:bg-gray-600`}
    >
      <div
        className={`flex justify-center items-center w-full h-full text-${textSize} font-medium text-white dark:text-gray-300`}
      >
        {name.toUpperCase()[0]}
      </div>
    </div>
  );
};
