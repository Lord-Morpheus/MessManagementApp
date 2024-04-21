import { useState } from "react";
import Sidebar from "../pages/sidebar";
import { TbArrowBigRightLineFilled } from "react-icons/tb";

export const SidebarDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <div className={`fixed top-28 left-4 z-50 ${drawerOpen ? "hidden" : ""}`}>
        <button
          className="text-white bg-[#012169] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
          onClick={toggleDrawer}
        >
          <TbArrowBigRightLineFilled className="w-4 h-4" />
        </button>
      </div>

      <div
        id="drawer-example"
        className={`fixed top-0 left-0 z-40 h-screen  overflow-y-auto transition-transform ${
          drawerOpen ? "" : "-translate-x-full"
        } bg-white w-80 dark:bg-gray-800`}
        tabIndex="-1"
        aria-labelledby="drawer-label"
      >
        <Sidebar />
        <button
          type="button"
          onClick={toggleDrawer}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
      </div>
    </>
  );
};
