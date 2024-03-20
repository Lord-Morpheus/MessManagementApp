import HomeCard1 from "../components/HomeCard1";
import HomeCard2 from "../components/HomeCard2";
import MessCard1 from "../components/MessCard";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <div className="grid grid-rows-10 relative w-full min-h-full bg-white">
      <div className="row-span-1">
        <Navbar />
      </div>
      <div className="row-span-9 min-h-screen flex justify-center items-center gap-3 bg-white">
        <div className="flex flex-col justify-start items-center flex-wrap bg-white min-h-[95%] w-[90%] rounded shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] my-6">
          <div className="w-[95%] flex flex-col items-center border border-black bg-[#E5E1DA] mt-3 rounded-md">
            <span className="font-bold text-lg my-4">Student Analytics</span>
            <div className="flex justify-between items-start flex-wrap w-full ">
              <div className="card1 flex flex-col justify-center items-center my-4 mx-7 py-3 w-2/5 bg-white rounded">
                <div className="w-[95%] h-[90%]">
                  <HomeCard1 />
                </div>
                <span className="flex justify-between w-full h-fit cursor-pointer">
                  <p className="ml-3 my-3 ">See Details</p>
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
              </div>
              <div className="card1 flex flex-col justify-center items-center my-4 mx-7 py-3 w-2/5 bg-white rounded">
                <div className="w-[95%] h-[90%]">
                  <HomeCard2 />
                </div>
                <span className="flex justify-between w-full h-fit cursor-pointer">
                  <p className="ml-3 my-3 ">See Details</p>
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
              </div>
            </div>
          </div>
          <div className="w-[95%] flex flex-col items-center border border-black bg-[#E5E1DA] mt-3 rounded-md mb-3">
            <span className="font-bold text-lg my-4">Mess Analytics</span>
            <div className="flex justify-between items-start flex-wrap w-full ">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
