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
} from "@nextui-org/react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { columns } from "./data";
import { TableComponent } from "./StudentTable";
import { getToken } from "../utils/getToken";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const statusColorMap = {
  dining: "success",
  pass_Out: "danger",
  mess_Off: "warning",
};

export default function App() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const [filterValue, setFilterValue] = useState("");
  const [messFilter, setMessFilter] = useState("all");
  const [hostelFilter, setHostelFilter] = useState("all");
  const [batchFilter, setBatchFilter] = useState("all");

  const hasSearchFilter = Boolean(filterValue);

  useEffect(() => {
    async function fetchData() {
      const token = getToken();
      if (!token) {
        navigate("/login");
      }
      try {
        const usersdata = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/admin/students`,
          {
            headers: {
              Authorization: `Admin ${token}`,
            },
          }
        );
        // console.log(usersdata.data.data);

        setUsers(usersdata.data.data);
      } catch (error) {
        const status = error.response.status;
        console.log(status);
        if (status === 401) {
          console.log("Not Authenticated");
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    }
    fetchData();
  }, [navigate]);

  const filteredItems = [...users];

  // const filteredItems = useMemo(() => {
  //   let filteredUsers = [...users];
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
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <MdOutlineRemoveRedEye />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <CiEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <MdDeleteOutline />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      color="primary"
      selectionMode="multiple"
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
