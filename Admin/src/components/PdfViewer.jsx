import axios from "axios";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export const PDFViewer = () => {
  const [blobURL, setBlobURL] = useState(null);

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/admin/menu`,
          {
            responseType: "blob",
          }
        );
        const url = URL.createObjectURL(data);
        return url;
      } catch (error) {
        console.error("Error fetching PDF file:", error);
        return null;
      }
    };

    fetchPDF().then((url) => {
      if (url) {
        setBlobURL(url);
      }
    });

    return () => {
      if (blobURL) {
        URL.revokeObjectURL(blobURL);
      }
    };
  }, []);

  return (
    <iframe
      src={blobURL ? blobURL : ""}
      className="w-full h-[600px]"
      frameBorder="0"
      onError={(e) => console.error("Error loading PDF:", e)}
      title="PDF Viewer"
    ></iframe>
  );
};
