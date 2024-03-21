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

export const StudentsPage = () => {
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

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
      <div className="h-full w-full">
        <Navbar />
        <div>
          <div className="flex justify-center">
            <Filter
              hostel={hostel}
              mess={mess}
              batch={batch}
              fromDate={fromDate}
              username={username}
              toDate={toDate}
              setHostel={setHostel}
              setMess={setMess}
              setBatch={setBatch}
              setFromDate={setFromDate}
              setUsername={setUsername}
              setToDate={setToDate}
            />
          </div>
          <div className="my-10 flex justify-start flex-wrap mx-24 gap-10 ">
            <StudentCard2/>
            {/* {students.map((student) => {
              return (
                <StudentCard
                  key={student.id}
                  id={student.id}
                  name={student.name}
                  username={student.username}
                  mess={student.mess}
                  hostel={student.hostel}
                  email={student.email}
                />
              );
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
};
