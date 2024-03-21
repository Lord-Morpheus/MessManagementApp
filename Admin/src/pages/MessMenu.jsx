import { useEffect } from "react";
import { PDFViewer } from "../components/PdfViewer";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/getToken";
import Sidebar from "./sidebar";
import Navbar from "./Navbar";
import { LuPlus } from "react-icons/lu";

export const MessMenu = () => {
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="row-span-1">
          <Navbar />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="text-white my-4 w-36 bg-[#012169] hover:bg-[#012169] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {}}
          >
            <div className="flex justify-between items-center">
              <LuPlus className="stroke-white h-5 w-5" />
              New Menu
            </div>
          </button>
        </div>
        <PDFViewer pdfURL="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" />
      </div>
    </div>
  );
};
