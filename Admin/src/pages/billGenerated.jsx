import Sidebar from "./sidebar";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Button } from "@nextui-org/react";
import { TbFileExport } from "react-icons/tb";
// import { exportToExcel } from "../utils/exportToExcel";
import { exportToExcel2 } from "../utils/exportToExcel2";

const columns = [
  { name: "DESCRIPTION  ", uid: "description" },
  { name: "NUMBER OF STUDENTS  ", uid: "count" },
  { name: "DAYS", uid: "daysPresent" },
  { name: "QUANTITY", uid: "quantity" },
  { name: "RATE/Day", uid: "rate" },
  // { name: "STATUS", uid: "status" },
  { name: "AMOUNT(in Rs.)", uid: "amount" },
];

export default function BillGenerated() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const token = getToken();
      if (!token) {
        navigate("/login");
      }

      try {
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

  const MessData = {};

  users.forEach((user) => {
    const { daysPresent, mess } = user;

    if (!MessData[mess]) {
      MessData[mess] = [];
    }

    const index = MessData[mess].findIndex(
      (item) => item.daysPresent === daysPresent
    );

    if (index === -1) {
      MessData[mess].push({ daysPresent, count: 1 });
    } else {
      MessData[mess][index].count++;
    }
  });

  console.log(MessData);

  const renderCell = (user, columnKey) => {
    if (!user || Object.keys(user).length === 0) {
      return null;
    }
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "description":
        return `${user.count} students for ${user.daysPresent} Days`;
      case "count":
        return `${user.count}`;
      case "daysPresent":
        return `${user.daysPresent}`;
      case "quantity":
        return `${user.daysPresent * user.count}`;
      case "rate":
        return `125`;
      case "amount":
        return `${user.daysPresent * user.count * 125}`;
      default:
        return cellValue;
    }
  };

  const topContent = (mess,MessData) => {
    return (
      
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">{mess}</div>
          <div>
            <Button
              className="bg-green-700 text-white"
              onClick={() => {
                console.log(MessData,{mess});
                exportToExcel2(MessData,{mess});
              }}
            >
              <TbFileExport className="mr-2 h-5 w-5" />
              Export to Excel
            </Button>
          </div>
        </div>
      
    );
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col h-full w-full">
        <Navbar />
        <div className="px-6 py-6">
          <div className="flex justify-center text-2xl mb-3">
            <p> Bill For Each Mess</p>
          </div>
          <div className="grid grid-cols-2 gap-6 p-2 ">
            {Object.entries(MessData).map(
              ([mess, daysPresentData]) => (
                <div key={mess}>
                  <Table
                    color="primary"
                    aria-label={`Table for ${mess}`}
                    topContent={topContent(mess,daysPresentData)}
                    isStriped
                  >
                    <TableHeader columns={columns}>
                      {(column) => (
                        <TableColumn key={column.uid}>
                          {column.name}
                        </TableColumn>
                      )}
                    </TableHeader>
                    <TableBody
                      emptyContent={`No users found for ${mess}`}
                      items={daysPresentData}
                    >
                      {(item) => (
                        <TableRow key={item.daysPresent}>
                          {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                          )}
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
