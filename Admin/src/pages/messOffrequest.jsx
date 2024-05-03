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
import { Chip } from "@nextui-org/react";
import Swal from "sweetalert2";

export default function MessOff() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const statusColorMap = {
    approved: "success",
    declined: "danger",
    pending: "warning",
  };

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

  const approveMessOff = async (messOffId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/admin/approve`,
        {
          messOffId: messOffId,
        },
        {
          headers: {
            Authorization: `Admin ${getToken()}`, // Assuming you need to send an authorization token
          },
        }
      );
      Swal.fire({
        title: "Done",
        text: "Mess Off Request Approved.",
        icon: "success",
        timer: "1500",
      });
      console.log("Mess off request approved:", response.data);
    } catch (error) {
      console.error("Error approving mess off request:", error);
    }
  };

  const declineMessOff = async (messOffId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/admin/reject`,
        {
          messOffId: messOffId,
        },
        {
          headers: {
            Authorization: `Admin ${getToken()}`, // Assuming you need to send an authorization token
          },
        }
      );
      Swal.fire({
        title: "Done",
        text: "Mess Off Request Not Approved.",
        icon: "error",
        timer: "1500",
      });
      console.log("Mess off request declined:", response.data);
    } catch (error) {
      console.error("Error declining mess off request:", error);
    }
  };

  const click = (url) => {
    window.open(url, "_blank");
  };

  const renderCell = (item, columnKey) => {
    switch (columnKey) {
      case "imgUrl":
        return (
          // <a href={onClick(item.imgUrl)} title="description" >
          <img
            src={item.imgUrl}
            alt="image"
            className="w-1/5 h-1/5 cursor-pointer"
            onClick={() => click(item.imgUrl)}
          />
          // </a>
        );
      case "action":
        return (
          item.status === "pending" && (
            <div className="flex gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="green"
                className="w-6 h-6"
                onClick={() => approveMessOff(item.id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="red"
                className="w-6 h-6"
                onClick={() => declineMessOff(item.id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
          )
        );
      case "startDate":
        return new Date(item[columnKey]).toLocaleString();
      case "endDate":
        return new Date(item[columnKey]).toLocaleString();
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[item.status]}
            size="sm"
            variant="flat"
          >
            {item.status}
          </Chip>
        );
      default:
        return item[columnKey];
    }
  };
  const columns = [
    { name: "Start Date  ", uid: "startDate" },
    { name: "End Date", uid: "endDate" },
    { name: "Image", uid: "imgUrl" },
    { name: "Status", uid: "status" },
    { name: "Action", uid: "action" },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col h-full w-full">
        <Navbar />
        <div className="px-6 py-6 capitalize">
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
