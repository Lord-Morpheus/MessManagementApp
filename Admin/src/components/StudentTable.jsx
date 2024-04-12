/* eslint-disable react/prop-types */
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "../components/ui/dropdown-menu";

import { TbFileExport } from "react-icons/tb";
import { useCallback } from "react";
import { batchOptions, hostelOptions, messOptions } from "./data";
import { exportToExcel } from "../utils/exportToExcel";

export function TableComponent({
  setFilterValue,
  setMessFilter,
  messFilter,
  setHostelFilter,
  hostelFilter,
  setBatchFilter,
  batchFilter,
  filteredItems,
}) {
  const onMessChange = useCallback((value) => {
    if (value) {
      setMessFilter(value);
    } else {
      setMessFilter("");
    }
  }, []);

  const onBatchChange = useCallback((value) => {
    if (value) {
      setBatchFilter(value);
    } else {
      setBatchFilter("");
    }
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onHostelChange = useCallback((value) => {
    if (value) {
      setHostelFilter(value);
    } else {
      setHostelFilter("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
  }, []);

  return (
    <div key="1" className="px-4 md:px-6 py-6 md:py-8 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold tracking-tight">
            Student Directory
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            View and search student information.
          </p>
        </div>
        <div className="flex gap-4 md:gap-8 ml-auto shrink-0">
          <div className="w-full md:w-[225px] flex items-center gap-4 md:gap-2 ">
            <Label className="sr-only" htmlFor="search">
              Search
            </Label>
            <Input
              className="flex-1 min-w-0"
              id="search"
              isClearable
              placeholder="Search by name or student ID"
              type="search"
              onChange={(e) => onSearchChange(e.target.value)}
              onClear={() => onClear()}
            ></Input>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-4 md:gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-[#012169]">
                {messFilter === "all" ? "Select Mess" : messFilter}
                <ChevronDownIcon className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              {messOptions.map(({ mess, key }) => (
                <DropdownMenuItem key={key} onSelect={() => onMessChange(mess)}>
                  {mess}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-[#012169]">
                {hostelFilter === "all" ? "Select Hostel" : hostelFilter}
                <ChevronDownIcon className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              {hostelOptions.map(({ hostel, key }) => (
                <DropdownMenuItem
                  key={key}
                  onSelect={() => onHostelChange(hostel)}
                >
                  {hostel}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-[#012169]">
                {batchFilter === "all" ? "Select Batch" : batchFilter}
                <ChevronDownIcon className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              {batchOptions.map(({ batch, key }) => (
                <DropdownMenuItem
                  key={key}
                  onSelect={() => onBatchChange(batch)}
                >
                  {batch}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button
          className="bg-green-700"
          onClick={() => exportToExcel(filteredItems)}
        >
          <TbFileExport className="mr-2 h-5 w-5" />
          Export to Excel
        </Button>
      </div>
    </div>
  );
}

export function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
