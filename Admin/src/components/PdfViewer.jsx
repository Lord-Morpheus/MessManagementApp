// eslint-disable-next-line react/prop-types
export const PDFViewer = ({ pdfURL }) => {
  const src = `https://docs.google.com/viewer?url=${pdfURL}&embedded=true`;

  return (
    <iframe src={src} className="w-full h-[600px]" frameBorder="0"></iframe>
  );
};
