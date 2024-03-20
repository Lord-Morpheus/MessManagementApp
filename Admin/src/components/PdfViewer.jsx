import { Document, Page } from "react-pdf";
// eslint-disable-next-line react/prop-types
export const PDFViewer = ({ pdfURL }) => {
  return (
    <div>
      <Document file={pdfURL}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};
