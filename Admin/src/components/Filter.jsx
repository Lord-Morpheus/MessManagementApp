import { useState } from "react";
import { handleExport } from "../handlers/handleExcel";
import { handleFilter } from "../handlers/handleFilter";

// hostel, mess, batch, date, username, day

export const Filter = () => {
  const [hostel, setHostel] = useState(null);
  const [mess, setMess] = useState(null);
  const [batch, setBatch] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [username, setUsername] = useState(null);
  const [toDate, setToDate] = useState(null);

  return (
    <div>
      <div className="m-10 w-screen max-w-screen-md">
        <div className="flex flex-col">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
            <htmlForm className="">
              <div className="relative mb-10 w-full flex  items-center justify-between rounded-md">
                <svg
                  className="absolute left-2 block h-5 w-5 text-gray-400"
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
                  <circle cx="11" cy="11" r="8" className=""></circle>
                  <line
                    x1="21"
                    y1="21"
                    x2="16.65"
                    y2="16.65"
                    className=""
                  ></line>
                </svg>
                <input
                  type="name"
                  name="search"
                  className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Search by student id"
                  onChange={(e) => setUsername(() => e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-stone-600"
                  >
                    Student ID
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Raspberry juice"
                    className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    onChange={(e) => setUsername(() => e.target.value)}
                  />
                </div> */}

                <div className="flex flex-col">
                  <label
                    htmlFor="manufacturer"
                    className="text-sm font-medium text-stone-600"
                  >
                    Mess
                  </label>

                  <select
                    id="manufacturer"
                    className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    onChange={(e) => setMess(() => e.target.value)}
                  >
                    <option>Mess 1</option>
                    <option>Mess 2</option>
                    <option>Mess 3</option>
                    <option>Mess 4</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="manufacturer"
                    className="text-sm font-medium text-stone-600"
                  >
                    Batch
                  </label>
                  <select
                    id="manufacturer"
                    className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    onChange={(e) => setBatch(() => e.target.value)}
                  >
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                    <option>2021</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="date"
                    className="text-sm font-medium text-stone-600"
                  >
                    From Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    onChange={(e) => setFromDate(() => e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="date"
                    className="text-sm font-medium text-stone-600"
                  >
                    To Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    onChange={(e) => setToDate(() => e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-sm font-medium text-stone-600"
                  >
                    Hostel
                  </label>

                  <select
                    id="status"
                    className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    onChange={(e) => setHostel(() => e.target.value)}
                  >
                    <option>Hostel 1</option>
                    <option>Hostel 2</option>
                    <option>Hostel 3</option>
                    <option>Hostel 4</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                <button
                  className="rounded-full bg-peachette px-8 py-2 font-medium text-black outline-none hover:opacity-80 focus:ring"
                  onClick={async () =>
                    await handleFilter({
                      hostel,
                      mess,
                      batch,
                      fromDate,
                      username,
                      toDate,
                    })
                  }
                >
                  Filter
                </button>
                <button
                  className="rounded-full bg-green-500 px-8 py-2 font-medium text-white outline-none hover:opacity-80 focus:ring"
                  onClick={async () =>
                    await handleExport({
                      hostel,
                      mess,
                      batch,
                      fromDate,
                      username,
                      toDate,
                    })
                  }
                >
                  Export to Excel
                </button>
              </div>
            </htmlForm>
          </div>
        </div>
      </div>
    </div>
  );
};
