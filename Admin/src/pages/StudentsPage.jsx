import { useNavigate } from "react-router-dom";
import { Filter } from "../components/Filter";
import StudentCard from "../components/StudentCard";
import { getToken } from "../utils/getToken";
import { useFilter } from "../hooks/useFilter";

// eslint-disable-next-line react/prop-types
export const StudentsPage = ({ hostel, mess, batch, date, username, day }) => {
  // const token = getToken();
  // const navigate = useNavigate();
  // if (!token) {
  //   navigate("/login");
  // }

  const { loading, students } = useFilter({
    hostel,
    mess,
    batch,
    date,
    username,
    day,
  });

  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <div>
      <Filter />
      <div className="flex justify-center">
        <div className="max-w-3xl">
          <div>
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
  );
};
