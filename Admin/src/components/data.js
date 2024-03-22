import React from "react";
const columns = [
  {name: "NAME", uid: "name"},
  {name: "MESS", uid: "mess"},
  {name: "ROLL NO", uid: "rollno"},
  {name: "HOSTEL", uid: "hostel"},
  {name: "STATUS", uid: "status"},
  {name: "ACTIONS", uid: "actions"},
];

const users = [
  {
    id: 1,
    name: "Sarthak Prajapati",
    hostel: "B19",
    rollno: "b22174",
    team: "Management",
    status: "dining",
    mess: "Oak Mess",
    email: "sarthak@example.com",
  },
  {
    id: 2,
    name: "Priya Virani",
    hostel: "B13",
    rollno: "b22142",
    team: "Development",
    status: "pass_Out",
    mess: "Pine Mess",
    email: "priya@example.com",
  },
  {
    id: 3,
    name: "Kunal Nath",
    hostel: "B19",
    rollno: "b22215",
    team: "Development",
    status: "dining",
    mess: "Oak Mess",
    email: "kunal@example.com",
  },
  {
    id: 4,
    name: "Harry Patel",
    hostel: "B23",
    rollno: "b23115",
    team: "Marketing",
    status: "mess_Off",
    mess: "Alder Mess",
    email: "harry@example.com",
  },
  {
    id: 5,
    name: "Kishan kumar",
    hostel: "B13",
    rollno: "b22025",
    team: "Sales",
    status: "dining",
    mess: "D3 Mess",
    email: "kishan@example.com",
  },
];

export {columns, users};
