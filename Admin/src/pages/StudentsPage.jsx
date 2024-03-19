/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Filter } from "../components/Filter";
import StudentCard from "../components/StudentCard";
import { getToken } from "../utils/getToken";
import { useFilter } from "../hooks/useFilter";
import Navbar from "./Navbar";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export const StudentsPage = () => {
  const token = getToken();
  const navigate = useNavigate();
  if (!token) {
    navigate("/login");
  }

  const [hostel, setHostel] = useState(null);
  const [mess, setMess] = useState(null);
  const [batch, setBatch] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [username, setUsername] = useState(null);
  const [toDate, setToDate] = useState(null);

  const { loading, students } = useFilter({
    hostel,
    mess,
    batch,
    fromDate,
    username,
    toDate,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
        <div className="flex justify-center">
          <div className="max-w-3xl">
            <div className="m-10 w-screen max-w-screen-md">
              {students.map((student) => {
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
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
