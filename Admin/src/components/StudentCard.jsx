/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const StudentCard = ({ name, username, mess, hostel, email, id }) => {
  return (
    <Link to={`/student/${id}`}>
      <div className="p-4 cursor-pointer">
        <div className="flex items-center">
          <Avatar name={name} />
          <div className="font-light ml-2">{name}</div>
          <div className="font-light text-gray-500 ml-2">{username}</div>
        </div>
        <div className="text-md py-2">Mess - {mess}</div>
        <div className="text-md py-2">Email - {email}</div>
        <div className="text-md py-2">Mess - {hostel}</div>
        <hr className="border-gray-200"></hr>
      </div>
    </Link>
  );
};

export const Avatar = ({ name }) => {
  return (
    <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {name.toUpperCase()[0]}
      </span>
    </div>
  );
};

export default StudentCard;
