import Sidebar from "./sidebar";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BillGenerated() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const token = getToken();
      if (!token) {
        navigate("/login");
      }

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/admin/students`,
          {
            headers: {
              Authorization: `Admin ${getToken()}`,
            },
          }
        );

        setUsers(data.data);
        console.log(users);
        setLoading(false);

        return { users, loading };
      } catch (error) {
        const status = error.response.status;
        // console.log(status);
        if (status === 401) {
          console.log("Not Authenticated");
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col h-full w-full">
        <Navbar />
        <div className="px-6 py-6">
          <div className="f">
            <p> Bill Generated For Each Mess</p>
          </div>
        </div>
      </div>
    </div>
  );
}
