import { useNavigate } from "react-router-dom";
import { Filter } from "../components/Filter";
import StudentCard from "../components/StudentCard";
import { getToken } from "../utils/getToken";
import { useFilter } from "../hooks/useFilter";
import Navbar from "./Navbar";
import Sidebar from "./sidebar";

// eslint-disable-next-line react/prop-types
export const StudentsPage = ({ hostel, mess, batch, date, username, day }) => {
  const token = getToken();
  const navigate = useNavigate();
  if (!token) {
    navigate("/login");
  }

  // const { loading, students } = useFilter({
  //   hostel,
  //   mess,
  //   batch,
  //   date,
  //   username,
  //   day,
  // });

  const students = [
    {
      id: 1,
      name: "John Doe",
      hostel: "Hostel A",
      mess: "Mess 1",
      batch: 2023,
      date: "2024-03-19",
      username: "johndoe",
      day: "Monday",
    },
    {
      id: 2,
      name: "Jane Smith",
      hostel: "Hostel B",
      mess: "Mess 2",
      batch: 2022,
      date: "2024-03-19",
      username: "janesmith",
      day: "Tuesday",
    },
    {
      id: 3,
      name: "Alice Johnson",
      hostel: "Hostel C",
      mess: "Mess 1",
      batch: 2024,
      date: "2024-03-19",
      username: "alicejohnson",
      day: "Wednesday",
    },
    {
      id: 4,
      name: "Bob Brown",
      hostel: "Hostel A",
      mess: "Mess 3",
      batch: 2023,
      date: "2024-03-19",
      username: "bobbrown",
      day: "Thursday",
    },
    {
      id: 5,
      name: "David Lee",
      hostel: "Hostel D",
      mess: "Mess 2",
      batch: 2022,
      date: "2024-03-19",
      username: "davidlee",
      day: "Friday",
    },
  ];

  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <div>
      <Navbar />
      <div>
        <div className="flex justify-center">
          <Filter />
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
