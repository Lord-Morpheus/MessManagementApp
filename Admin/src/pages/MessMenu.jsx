import { Button } from "@material-tailwind/react";
import { PDFViewer } from "../components/PdfViewer";

export const MessMenu = () => {
  return (
    <div>
      <button
        type="button"
        className="text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => {}}
      >
        Upload New Mess Menu
      </button>
      <PDFViewer pdfURL="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" />
    </div>
  );
};
