import { Button } from "../components/ui/button";
import { PDFViewer } from "./PdfViewer";

// eslint-disable-next-line react/prop-types
export default function ViewPDF({ pdfURL }) {
  return (
    <div className="flex flex-col h-full">
      <header className="p-8">
        <div className="container items-center justify-between grid grid-cols-3">
          <div></div>
          <div className="flex justify-center">
            <h1 className="text-4xl font-bold">Mess Menu</h1>
          </div>
          <div className="flex justify-end">
            <Button size="lg" className="bg-[#012169]">
              Upload Menu
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
