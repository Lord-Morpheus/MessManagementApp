import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
import { getToken } from "../utils/getToken";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

export default function MessOff() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const token = getToken();
      if (!token) {
        navigate("/login");
      }

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/admin/messoff`,
          {
            headers: {
              Authorization: `Admin ${getToken()}`,
            },
          }
        );
        console.log(data);
        setUsers(data);
        setLoading(false);

        return { users, loading };
      } catch (error) {
        const status = error.response.status;
        console.log(status);
        setError("Error fetching data");
        if (status === 401) {
          console.log("Not Authenticated");
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    }
    fetchData();
  }, []);

  const renderCell = (item, columnKey) => {
    switch (columnKey) {
      case "imgUrl":
        return (
          <img
            src={item.imgUrl}
            alt="Student"
            className="w-1/5 h-1/5"
          />
        );
      default:
        return item[columnKey];
    }
  };
  const columns = [
    { name: "Start Date  ", uid: "startDate" },
    { name: "End Date", uid: "endDate" },
    { name: "Image", uid: "imgUrl" },
    {name:"Status",uid:"status"}
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col h-full w-full">
        <Navbar />
        <div className="px-6 py-6">
          <div className="flex justify-center text-2xl mb-3 capitalize">
            <p> Mess off requests</p>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <Table color="primary" aria-label={"mess off"} isStriped>
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.uid}>{column.name}</TableColumn>
                )}
              </TableHeader>
              <TableBody emptyContent={""} items={users}>
                {(item, index) => (
                  <TableRow key={index}>
                    {(columnKey) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
