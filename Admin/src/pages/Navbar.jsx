import { RiArrowDropDownLine } from "react-icons/ri";
import { BiExit } from "react-icons/bi";
import mainLogo from "../assets/main_logo.png";

export default function Navbar() {
  return (
    <>
      <nav className="bg-[#012169] w-full flex justify-between items-center py-2 px-4">
        <img src={mainLogo} alt="IIT Mandi Logo" className="h-12 w-auto" />
        <div className="flex">
          <div className="flex justify-center rounded-lg mr-6 items-center bg-white w-48 h-10">
            <span className="ml-3">Signed in as Admin</span>
            <RiArrowDropDownLine className="h-8 w-8" />
          </div>
          <button className="mr-6">
            <BiExit color="white" className="h-8 w-8" />
          </button>
        </div>
      </nav>
      <nav className="bg-[#0093dd] h-10 w-full flex justify-center items-center capitalize text-white">
        Mess Management Service IIT Mandi
      </nav>
    </>
  );
}
