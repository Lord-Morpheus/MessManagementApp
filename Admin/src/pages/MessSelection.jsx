/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./sidebar";
import Datepicker from "react-tailwindcss-datepicker";
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";
// import jsonData from "../utils/studentPreference.json";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";
import swal from "sweetalert";

export default function Selection() {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const messData = [
    {
      mess_id: "18e766cd-58ec-46b6-b658-f683b0519165",
      name: "pine mess",
    },
    {
      mess_id: "79287884-7794-4f5b-ac3c-7a6109f0d028",
      name: "oak mess",
    },
    {
      mess_id: "c7bc1615-5208-46dc-bb7e-0b2d8765866a",
      name: "peepal mess",
    },
    {
      mess_id: "89b53ed9-23e0-4156-a7c2-fc21310ef3a4",
      name: "tulsi mess",
    },
    {
      mess_id: "abbccc55-e1d4-40db-b41b-d4ed9ad0b23a",
      name: "alder mess",
    },
    {
      mess_id: "9402c23e-f077-41c3-bc32-472286d8ac55",
      name: "d1 mess",
    },
    {
      mess_id: "e9caf747-6c02-4cc4-b45b-fe0873c73e0b",
      name: "d2 mess",
    },
    {
      mess_id: "5b31984b-c5b7-4ee5-a97b-1e6ad7d095f9",
      name: "d3 mess",
    },
  ];

  const messMapping = {};
  messData.forEach((mess) => {
    messMapping[mess.mess_id] = mess.name;
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      console.log(token);
      if (!token) {
        navigate("/login");
      }
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/admin/getform`,
          {
            headers: {
              authorization: `Admin ${token}`,
            },
          }
        );
        const data = response.data.map((item) => ({
          name: item.student.name,
          roll_no: item.student.username,
          preference_1: messMapping[item.preferences[0]],
          preference_2: messMapping[item.preferences[1]],
          preference_3: messMapping[item.preferences[2]],
          preference_4: messMapping[item.preferences[3]],
          preference_5: messMapping[item.preferences[4]],
          allocated: item.alloted ? "Yes" : "No",
          allotedMess:
            messMapping[item.allotedMess] === ""
              ? "not allocated"
              : messMapping[item.allotedMess],
        }));
        setUsers(data);
        setLoading(false);
        console.log("hello");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // console.log(users);

  const columns = [
    { key: "name", label: "Name" },
    { key: "roll_no", label: "Roll No" },
    { key: "preference_1", label: "Preference 1" },
    { key: "preference_2", label: "Preference 2" },
    { key: "preference_3", label: "Preference 3" },
    { key: "preference_4", label: "Preference 4" },
    { key: "preference_5", label: "Preference 5" },
    { key: "allocated", label: "Allocated" },
    { key: "allotedMess", label: "Current Mess" },
  ];

  const rows = users.map((item, index) => ({
    ...item,
    key: index,
  }));

  const getKeyValue = (item, key) => {
    return item[key];
  };

  async function beginAllocation() {
    const token = getToken();
    console.log(token);
    if (!token) {
      navigate("/login");
    }
    try {
      setProcessing(true);
      await axios.get(`${import.meta.env.VITE_BACKEND_URI}/admin/allocate`, {
        headers: {
          Authorization: `Admin ${token}`,
        },
      });
      setProcessing(false);
      swal("Done","Allocation Done successfully","success").then(()=>{

        window.location.reload();
      });
    } catch (error) {
      console.error("Error starting allocation:", error);
    }
  }

  const renderTopContent = () => {
    return (
      <div className="flex justify-between items-center font-bold text-lg">
        <p className="text-2xl">Responses</p>
        <button
          disabled={processing}
          className={`bg-[#012069dd] hover:bg-[#012169] text-white font-bold my-1 py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={() => {
            beginAllocation();
          }}
        >
          {processing ? (
            <div className="text-white">
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Processing...
            </div>
          ) : (
            "Begin Allocation"
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col h-full w-full">
        <Navbar />
        <div className="px-6 py-6">
          <div className="flex flex-col items-center rounded shadow-md">
            <p className="font-bold text-xl py-3">
              Release Mess Selection Form for this Month
            </p>
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col gap-2 justify-center items-center">
                <div className="flex items-center">
                  <p className="ml-3">
                    Select range of dates you want form to be opened:
                  </p>
                  <div className="border mx-2">
                    <Datepicker value={value} onChange={handleValueChange} />
                  </div>
                </div>
                <div className="flex mb-3 w-full items-center">
                  <p className="ml-3">
                    Enter percentage of seats based on proximity:
                  </p>
                  <div className="mx-2 border" data-twe-input-wrapper-init>
                    <input
                      type="number"
                      className="text-center"
                      id="exampleFormControlInputNumber"
                      placeholder="enter ratio eg:75 for 75%"
                    />
                  </div>
                </div>
              </div>
              <button className="bg-[#012069dd] hover:bg-[#012169] text-white font-bold py-2 px-3 mx-2 rounded-full">
                Open Form
              </button>
            </div>
          </div>
        </div>
        <div className="px-6 py-3">
          <div className="flex flex-col items-center rounded shadow-md">
            <Table
              aria-label="Example table with dynamic content"
              topContent={renderTopContent()}
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={rows}>
                {(item) => (
                  <TableRow key={item.key}>
                    {(columnKey) => (
                      <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {loading && <Spinner size="lg" className="py-6" />}
          </div>
        </div>
      </div>
    </div>
  );
}
