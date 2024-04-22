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

export default function Selection() {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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
          allotedMess: messMapping[item.allotedMess],
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
      await axios.get(`${import.meta.env.VITE_BACKEND_URI}/admin/allocate`, {
        headers: {
          Authorization: `Admin ${token}`,
        },
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
          className="bg-[#012069dd] hover:bg-[#012169] text-white font-bold my-1 py-1 px-4 rounded"
          onClick={beginAllocation}
        >
          Begin allocation
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
              <button className="bg-[#012069dd] hover:bg-[#012169] text-white font-bold py-3 px-3 mx-2 rounded">
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
