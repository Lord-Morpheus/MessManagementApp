import HomeCard1 from "../components/HomeCard1";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <div className="grid grid-rows-10 relative w-full min-h-full bg-white">
      <div className="row-span-1">
        <Navbar />
      </div>
      <div className="row-span-9 min-h-screen flex flex-col justify-center items-center gap-3 bg-[#CDF5FD]">
        <div className="flex justify-start items-start bg-white min-h-[95%] w-[90%] rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <div className="card1 flex flex-col justify-center items-center mt-4 mx-4 bg-[#F7EEDD] w-2/5">
            <span className="flex justify-between w-full h-fit">
              <p className="ml-3 my-3 ">Total students</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="mr-3 my-3 w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </span>
            <div className="w-[95%] h-[90%]">
              <HomeCard1/>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
