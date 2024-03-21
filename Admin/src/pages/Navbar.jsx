import { RiArrowDropDownLine } from "react-icons/ri";
import { BiExit } from "react-icons/bi";
import mainLogo from "../assets/main_logo.png";
import { DropDown } from "../components/DropDown";

export default function Navbar() {
  return (
    <>
      <nav className="bg-[#012169] w-full flex justify-between items-center py-2 px-4">
        <img src={mainLogo} alt="IIT Mandi Logo" className="h-12 w-auto" />
        <div className="flex">
          <div className="mr-4">
            <DropDown username="Admin" name="Admin" email="admin@example.com" />
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
