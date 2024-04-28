import { useState } from "react";
import { Button } from "../components/ui/button";
import { PDFViewer } from "./PdfViewer";

// eslint-disable-next-line react/prop-types
export default function ViewPDF({ pdfURL }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChoose = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      console.log(file);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    try {
      setUploading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/admin/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      setUploading(false);

      if (response.ok) {
        alert("File uploaded successfully!");
        window.location.reload();
        console.log("File uploaded successfully!");
        // Optionally, you can handle success behavior here
      } else {
        console.error("Failed to upload file:", response.statusText);
        // Optionally, you can handle error behavior here
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // Optionally, you can handle error behavior here
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="p-8">
        <div className="container items-center justify-between grid grid-cols-3">
          <div></div>
          <div className="flex justify-center">
            <h1 className="text-4xl font-bold">Mess Menu</h1>
          </div>
          <div className="flex justify-end items-center">
            {!file ? (
              <div className="relative mx-4">
                <input
                  type="file"
                  name="file"
                  className="hidden"
                  accept="application/pdf"
                  onChange={(e) => handleChoose(e)}
                  id="fileInput"
                ></input>
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer bg-green-600 px-4 py-2 rounded-md text-white hover:bg-green-700"
                >
                  Choose File
                </label>
              </div>
            ) : (
              <div className="inline-flex items-center h-full overflow-hidden text-green-500 border border-green-500 rounded mx-4">
                <span className="px-5 py-1.5 text-[14px] font-medium">
                  ... {file.name.substr(-15)}
                </span>

                <button
                  onClick={() => setFile(null)}
                  className="inline-flex items-center justify-center w-8 h-8 text-green-600 border-l border-green-500 transition-color hover:bg-green-100 focus:outline-none focus:ring"
                  type="button"
                >
                  <span className="sr-only"> Close </span>

                  <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
            <Button size="lg" className="bg-[#012169]" onClick={handleUpload}>
              {uploading ? "Uploading..." : "Upload Menu"}
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="flex flex-col items-center justify-center py-6">
          <div className="container flex flex-col items-center gap-2">
            <div className="w-full max-w-3xl border border-dashed border-gray-200 rounded-lg border-2xl dark:border-gray-800">
              <div className="aspect-[4/3] w-full">
                <div className="flex items-center justify-center text-2xl font-bold">
                  <PDFViewer pdfURL={pdfURL} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
