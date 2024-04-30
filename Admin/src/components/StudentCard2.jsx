import { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Spinner,
} from "@nextui-org/react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { columns } from "./data";
import { TableComponent } from "./StudentTable";
import { getToken } from "../utils/getToken";
import axios from "axios";
import { useAsyncError, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
// import Popup from "reactjs-popup";
// import { useUsers } from "../hooks/useUsers";
// import { Loader } from "lucide-react";
// const statusColorMap = {
//   dining: "success",
//   pass_Out: "danger",
//   mess_Off: "warning",
// };

export default function App() {
  // const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [MessMenuclick, setMessMenuClick] = useState(false);
  const [HostelMenuclick, setHostelMenuClick] = useState(false);
  const [messOptions, setMessOptions] = useState([]);
  const [hostelOptions, setHostelOptions] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [messFilter, setMessFilter] = useState("all");
  const [hostelFilter, setHostelFilter] = useState("all");
  const [batchFilter, setBatchFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const hasSearchFilter = Boolean(filterValue);
  const [mess, setMess] = useState("");
  const [hostel, setHostel] = useState("");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([
    {
      email: "b22026@students.iitmandi.ac.in",
      hostel: "B18",
      id: "16ff5894-8820-4c9d-90f9-0dc3818ba631",
      mess: "TULSI MESS",
      messId: "89b53ed9-23e0-4156-a7c2-fc21310ef3a4",
      name: "Olivia Young",
      username: "B22026",
    },
  ]);

  const handleOpen = () =>{
    setOpen(!open);
    setMess('');
    setHostel('');
    setHostelMenuClick(false);
    setMessMenuClick(false);
    console.log('clicked');
  } 

  useEffect(() => {
    async function fetchData() {
      const token = getToken();
      if (!token) {
        navigate("/login");
      }
      try {
        const messoptions = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/admin/mess`,
          {
            headers: {
              Authorization: `Admin ${token}`,
            },
          }
        );
        console.log(messoptions.data);
        setMessOptions(messoptions.data);

        const hosteloptions = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/admin/hostels`,
          {
            headers: {
              Authorization: `Admin ${token}`,
            },
          }
        );
        setHostelOptions(hosteloptions.data);

        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/admin/students`,
          {
            headers: {
              Authorization: `Admin ${getToken()}`,
            },
          }
        );

        setUsers(data.data);
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

  const confirmDelete = (userId) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleDelete(userId);
        }
      });
  };

  const handleDelete = async (studentId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URI}/admin/delete`,

        {
          data: { studentId },
          headers: {
            Authorization: `Admin ${getToken()}`,
          },
        }
      );
      if (response.status === 201) {
        swal
          .fire({
            title: "Done",
            text: `user deleted successfully: ${response.data.user.name}`,
            icon: "success",
          })
          .then(() => {
            window.location.reload();
          });
        console.log("User deleted successfully:", response.data.user.name);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filteredItems = users.filter((user) => {
    return (
      (!hasSearchFilter ||
        user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        user.username.toLowerCase().includes(filterValue.toLowerCase())) &&
      (messFilter === "all" ||
        user.mess.toLowerCase().includes(messFilter.toLowerCase())) &&
      (hostelFilter === "all" ||
        user.hostel.toLowerCase().includes(hostelFilter.toLowerCase())) &&
      (batchFilter === "all" ||
        user.username.substring(1, 3) ===
          batchFilter.substring(batchFilter.length - 2))
    );
  });

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

  const onMessChange =((value) => {
    setMess(value);
    setMessMenuClick(!MessMenuclick);
    // console.log(mess);
  });
  const onHostelChange =((value) => {
    setHostel(value);
    setHostelMenuClick(!HostelMenuclick);
    // console.log(mess);
  });

  const renderCell = (user, columnKey) => {
    // console.log(user);
    if (!user || Object.keys(user).length === 0) {
      return null;
    }
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            // avatarProps={{ radius: "lg", src: user.avatar }}
            className="font-semibold"
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <div onClick={handleOpen}>
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
            <div onClick={() => confirmDelete(user.id)}>
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
  };

  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Table
        color="primary"
        // selectionMode="multiple"
        aria-label="Example table with custom cells"
        topContent={topContent}
        isStriped
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
      <Dialog open={open} handler={handleOpen} className="flex flex-col">
        <DialogHeader>Update Student Details</DialogHeader>
        <DialogBody className="flex flex-col gap-3 ">
          <div className="flex gap-3">
            <span>Update Name:</span>
            <input className="border rounded" type="text" placeholder="Enter Name" />
          </div>
          <div className="flex gap-3">
            <span>Update Email:</span>
            <input className="border rounded" type="text" placeholder="Enter Email" />
          </div>

          <div className="flex gap-3">
            <span>Update Roll Number:</span>
            <input className="border rounded" type="text" placeholder="Enter Roll Number" />
          </div>
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="inline-flex w-2/5 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              id="menu-button"
              onClick={()=>{setMessMenuClick(!MessMenuclick)}}
            >
              {mess===''?'Update Mess':`${mess}`}
              <svg
                className="-mr-1 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {MessMenuclick && (
              <div
                className="absolute z-10 mt-2 w-2/5 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <div className="py-1 " role="none" >
                  <div className="w-full flex gap-4 flex-wrap justify-evenly">
                    {messOptions.map(({ name, id }) => (
                      <div
                        key={id}
                        onClick={() => onMessChange(name)}
                        className="hover:bg-gray-200 cursor-pointer"
                      >
                        {name.toUpperCase()}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="inline-flex w-2/5 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              id="menu-button"
              onClick={()=>{setHostelMenuClick(!HostelMenuclick)}}
            >
              {hostel===''?'Update hostel':`${hostel}`}
              <svg
                className="-mr-1 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {HostelMenuclick && (
              <div
                className="absolute z-10 mt-2 w-2/5 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <div className="py-1 " role="none" >
                  <div className="w-full grid grid-cols-4 gap-2 mx-2">
                    {hostelOptions.map(({ name, id }) => (
                      <div
                        key={id}
                        onClick={() => onHostelChange(name)}
                        className="hover:bg-gray-200 cursor-pointer"
                      >
                        {name.toUpperCase()}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
