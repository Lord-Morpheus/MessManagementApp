/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./sidebar";
import Datepicker from "react-tailwindcss-datepicker";
import jsonData from "../utils/studentMessPreference.json";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function Selection() {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "roll_no", label: "Roll No" },
    { key: "preference_1", label: "Preference 1" },
    { key: "preference_2", label: "Preference 2" },
    { key: "preference_3", label: "Preference 3" },
    { key: "preference_4", label: "Preference 4" },
    { key: "preference_5", label: "Preference 5" },
  ];

  const rows = jsonData.map((item, index) => ({
    ...item,
    key: index,
  }));

  const getKeyValue = (item, key) => {
    return item[key];
  };

  const renderTopContent = () => {
    return (
      <div className="flex justify-between items-center font-bold text-lg">
        <p className="text-2xl">Responses</p>
        <button class="bg-[#012069dd] hover:bg-[#012169] text-white font-bold my-1 py-1 px-4 rounded">
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
            <div className="flex gap-6 justify-between items-center w-full">
              <div className="flex gap-6 justify-center items-center">
                <p className="ml-3">
                  Select range of dates you want form to be opened:
                </p>
                <Datepicker
                  classNames=""
                  value={value}
                  onChange={handleValueChange}
                />
                <input type="" />
              </div>
              <button class="bg-[#012069dd] hover:bg-[#012169] text-white font-bold m-3 px-4 rounded">
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
          </div>
        </div>
      </div>
    </div>
  );
}
