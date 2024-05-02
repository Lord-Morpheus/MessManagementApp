import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export const PDFViewer = () => {
  const [blobURL, setBlobURL] = useState(null);

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        console.log("Fetching PDF file...");

        const s3Client = new S3Client({
          region: `${import.meta.env.VITE_AWS_REGION}`,
          credentials: {
            accessKeyId: `${import.meta.env.VITE_AWS_ACCESS_KEY_ID}`,
            secretAccessKey: `${import.meta.env.VITE_AWS_SECRET_KEY}`,
          },
        });

        const command = new GetObjectCommand({
          Bucket: "mess-menu",
          Key: "menu.pdf",
        });

        const data = await s3Client.send(command); // Import the necessary package

        console.log(data);
        // const blob = await data.Body.arrayBuffer();
        console.log("Body", data.Body);
        const reader = data.Body.getReader();
        const chunks = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
        }

        const buffer = new Uint8Array(
          chunks.reduce((acc, chunk) => [...acc, ...chunk], [])
        );
        const blob = new Blob([buffer], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
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
      src={blobURL || ""}
      className="w-full h-[600px]"
      frameBorder="0"
      title="PDF Viewer"
    ></iframe>
  );
};
