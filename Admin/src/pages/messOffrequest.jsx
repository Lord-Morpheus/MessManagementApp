import Navbar from "./Navbar";
import Sidebar from "./sidebar";

export default function MessOff() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col h-full w-full">
        <Navbar />
        <div className="px-6 py-6">
          <div className="flex justify-center text-2xl mb-3 capitalize">
            <p> Mess off requests</p>
          </div>
        </div>
      </div>
    </div>
  );
}
