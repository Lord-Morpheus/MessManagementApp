/* eslint-disable react/prop-types */

import { Filter } from "../components/Filter";
import StudentCard2 from "../components/StudentCard2";
import StudentCard from "../components/StudentCard";
import { getToken } from "../utils/getToken";
import { useFilter } from "../hooks/useFilter";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { useNavigate } from "react-router-dom";
import { TableComponent } from "../components/StudentTable";
import { Card } from "../components/ui/card";

export const StudentsPage = () => {
  const token = getToken();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //   }
  // });

  const [hostel, setHostel] = useState(null);
  const [mess, setMess] = useState(null);
  const [batch, setBatch] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [username, setUsername] = useState(null);
  const [toDate, setToDate] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const { loading, students } = useFilter({
    hostel,
    mess,
    batch,
    fromDate,
    username,
    toDate,
  });

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col h-full w-full">
        <Navbar />
        <Card className="m-8 h-full">
          <TableComponent students={students} />
          <div className="px-6 pb-6">
            <StudentCard2 />
          </div>
        </Card>
      </div>
    </div>
  );
};
