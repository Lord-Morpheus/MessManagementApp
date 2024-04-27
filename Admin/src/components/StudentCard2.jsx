import { useState, useMemo, useCallback, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Spinner,
} from "@nextui-org/react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { columns } from "./data";
import { TableComponent } from "./StudentTable";
import { getToken } from "../utils/getToken";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { Loader } from "lucide-react";
const statusColorMap = {
  dining: "success",
  pass_Out: "danger",
  mess_Off: "warning",
};

export default function App() {
  // const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const [filterValue, setFilterValue] = useState("");
  const [messFilter, setMessFilter] = useState("all");
  const [hostelFilter, setHostelFilter] = useState("all");
  const [batchFilter, setBatchFilter] = useState("all");

  const hasSearchFilter = Boolean(filterValue);

  const { users, loading } = useUsers();

  const [loadin, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteUser = async (studentId) => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/delete/${studentId}`);
      if (response.status === 201) {
        // Handle successful deletion
        console.log("User deleted successfully:", response.data);
      } else {
        // Handle unexpected response status
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      // Handle error
      console.error("Error deleting user:", error);
      setError(error.response.data.msg || "Error deleting user");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     const token = getToken();
  //     if (!token) {
  //       navigate("/login");
  //     }
  //     try {
  //       const usersdata = await axios.get(
  //         `${import.meta.env.VITE_BACKEND_URI}/admin/students`,
  //         {
  //           headers: {
  //             Authorization: `Admin ${token}`,
  //           },
  //         }
  //       );
  //       // console.log(usersdata.data.data);

  //       return usersdata.data.data;
  //     } catch (error) {
  //       const status = error.response.status;
  //       console.log(status);
  //       if (status === 401) {
  //         console.log("Not Authenticated");
  //         localStorage.removeItem("token");
  //         navigate("/login");
  //       }
  //     }
  //   }
  //   const data = fetchData().then((data) => {
  //     console.log(data);
  //     setUsers(data);
  //   });
  //   console.log("Users:", users);
  // }, []);

  useEffect(() => {
    console.log("Users updated:", users);
  }, [users]);
  const filteredItems = [...users];

  // const filteredItems = useMemo(() => {
  //   let filteredUsers = users;
  //   console.log(filteredUsers);

  //   if (hasSearchFilter) {
  //     filteredUsers = filteredUsers.filter(
  //       (user) =>
  //         user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
  //         user.username.toLowerCase().includes(filterValue.toLowerCase())
  //     );
  //   }

  //   if (messFilter !== "all") {
  //     filteredUsers = filteredUsers.filter((user) =>
  //       user.mess.toLowerCase().includes(messFilter.toLowerCase())
  //     );
  //   }
  //   if (hostelFilter !== "all") {
  //     // console.log("hostelFilter");
  //     filteredUsers = filteredUsers.filter((user) =>
  //       user.hostel.toLowerCase().includes(hostelFilter.toLowerCase())
  //     );
  //   }

  //   if (batchFilter !== "all") {
  //     filteredUsers = filteredUsers.filter(
  //       (user) =>
  //         user.username.substring(1, 3) ==
  //         batchFilter.substring(batchFilter.length - 2)
  //     );
  //   }

  //   return filteredUsers;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [users, filterValue, messFilter, hostelFilter, batchFilter]);

  const topContent = useMemo(() => {
    return TableComponent({
      setFilterValue,
      setMessFilter,
      messFilter,
      setHostelFilter,
      hostelFilter,
      setBatchFilter,
      batchFilter,
      filteredItems,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterValue,
    setFilterValue,
    messFilter,
    setMessFilter,
    hostelFilter,
    setHostelFilter,
    batchFilter,
    setBatchFilter,
    filteredItems,
  ]);

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            {/* <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <MdOutlineRemoveRedEye />
              </span>
            </Tooltip> */}
            <div onClick={deleteUser(user.id)}>
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="blue"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </span>
            </div>
            <div color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </span>
            </div>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Table
      color="primary"
      // selectionMode="multiple"
      aria-label="Example table with custom cells"
      topContent={topContent}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={filteredItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
