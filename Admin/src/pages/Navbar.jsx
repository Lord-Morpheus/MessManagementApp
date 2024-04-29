import { HiOutlineLogout } from "react-icons/hi";
import mainLogo from "../assets/main_logo.png";
import { DropDown } from "../components/DropDown";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="bg-[#012169] w-full flex justify-between items-center py-2 px-4">
        <img src={mainLogo} alt="IIT Mandi Logo" className="h-12 w-auto" />
        <div className="flex">
          <div className="mr-4">
            <DropDown username="Admin" name="Admin" email="admin@example.com" />
          </div>
          <button
            className="mr-6"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            <HiOutlineLogout
              color="white"
              className="h-8 w-8 transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
          </button>
        </div>
      </nav>
      <nav className="bg-[#0093dd] h-10 w-full flex justify-center items-center capitalize text-white">
        Mess Management Service IIT Mandi
      </nav>
    </>
  );
}
