import { HiOutlineLogout } from "react-icons/hi";
import mainLogo from "../assets/main_logo.png";
import { DropDown } from "../components/DropDown";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken } from "../utils/getToken";
import axios from "axios";

export default function Navbar() {
  const [user, setUser] = useState({
    name: "Admin",
    email: "admin@exmaple.com",
    username: "admin",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      console.log(token);
      if (!token) {
        navigate("/login");
      }
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/admin/profile`,
          {
            headers: {
              authorization: `Admin ${token}`,
            },
          }
        );
        console.log(data);
        setUser(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <>
      <nav className="bg-[#012169] w-full flex justify-between items-center py-2 px-4">
        <img src={mainLogo} alt="IIT Mandi Logo" className="h-12 w-auto" />
        <div className="flex">
          <div className="mr-4">
            <DropDown
              username={user.username}
              name={user.name}
              email={user.email}
            />
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
