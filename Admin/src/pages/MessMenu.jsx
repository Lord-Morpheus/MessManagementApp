import { useEffect } from "react";
import { PDFViewer } from "../components/PdfViewer";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/getToken";
import Sidebar from "./sidebar";
import Navbar from "./Navbar";
import { LuPlus } from "react-icons/lu";
import ViewPDF from "../components/ViewPDF";
import { Card } from "../components/ui/card";

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
        <Card className="m-8">
          <ViewPDF pdfURL="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" />
        </Card>
      </div>
    </div>
  );
};
