import axios from "axios";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "MESS", uid: "mess" },
  { name: "ROLL NO", uid: "rollno" },
  { name: "HOSTEL", uid: "hostel" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];


const messData = await axios.get(
  `${import.meta.env.VITE_BACKEND_URI}/admin/mess`,
  {
    headers: {
      Authorization: `Admin ${localStorage.getItem("token")}`,
    },
  }
);

export const messOptions = messData.data;

const hostelData = await axios.get(
  `${import.meta.env.VITE_BACKEND_URI}/admin/hostels`,
  {
    headers: {
      Authorization: `Admin ${localStorage.getItem("token")}`,
    },
  }
);


export const hostelOptions = hostelData.data;

const usersData = await axios.get(
  `${import.meta.env.VITE_BACKEND_URI}/admin/students`,
  {
    headers: {
      Authorization: `Admin ${localStorage.getItem("token")}`,
    },
  }
);

export const users = usersData.data.data;

// const users = [
//   {
//     id: 1,
//     name: "Sarthak Prajapati",
//     hostel: "B19",
//     rollno: "b22174",
//     team: "Management",
//     status: "dining",
//     mess: "Oak Mess",
//     email: "sarthak@example.com",
//   },
//   {
//     id: 2,
//     name: "Priya Virani",
//     hostel: "B13",
//     rollno: "b22142",
//     team: "Development",
//     status: "pass_Out",
//     mess: "Pine Mess",
//     email: "priya@example.com",
//   },
//   {
//     id: 3,
//     name: "Kunal Nath",
//     hostel: "B19",
//     rollno: "b22215",
//     team: "Development",
//     status: "dining",
//     mess: "Oak Mess",
//     email: "kunal@example.com",
//   },
//   {
//     id: 4,
//     name: "Harry Patel",
//     hostel: "B23",
//     rollno: "b23115",
//     team: "Marketing",
//     status: "mess_Off",
//     mess: "Alder Mess",
//     email: "harry@example.com",
//   },
//   {
//     id: 5,
//     name: "Kishan kumar",
//     hostel: "B13",
//     rollno: "b22025",
//     team: "Sales",
//     status: "dining",
//     mess: "D3 Mess",
//     email: "kishan@example.com",
//   },
// ];

export const feedbacks = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    description: "The quality of the food served in the mess has improved significantly over the past few weeks.The variety of dishes offered is also commendable.Keep up the good work!",
    mess: "Oak Mess",
    category: "Hygiene",
    timestamp: "2023-03-16 10:24 AM",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    description: "I've noticed a lack of communication regarding changes in the menu or special meal events.It would be helpful to have a notice board or digital platform where such information is regularly uptimestampd.",
    mess: "Pine Mess",
    category: "Food Quality",
    timestamp: "2023-03-16 10:24 AM",
  },
  {
    id: 3,
    name: "Eva Brown",
    email: "eva@example.com",
    description: "The mess environment could be made more inviting and comfortable for students to dine in.Simple enhancements like better lighting, comfortable seating, and a clean ambiance would make a difference.",
    mess: "D3 Mess",
    category: "Others",
    timestamp: "2023-03-16 10:24 AM",
  },
  {
    id: 4,
    name: "Bob Smith",
    email: "bob@exmaple.com",
    description: "I've noticed a lack of communication regarding changes in the menu or special meal events.It would be helpful to have a notice board or digital platform where such information is regularly uptimestampd.",
    mess: "Alder Mess",
    category: "Food Quality",
    timestamp: "2023-03-16 10:24 AM",
  },
  {
    id: 5,
    name: "Eva Brown",
    email: "eva@example.com",
    description: "The mess environment could be made more inviting and comfortable for students to dine in.Simple enhancements like better lighting, comfortable seating, and a clean ambiance would make a difference.",
    mess: "D3 Mess",
    category: "Others",
    timestamp: "2023-03-16 10:24 AM",
  },
  {
    id: 6,
    name: "Alice Johnson",
    email: "alice@example.com",
    description: "The quality of the food served in the mess has improved significantly over the past few weeks.The variety of dishes offered is also commendable.Keep up the good work!",
    mess: "Oak Mess",
    category: "Hygiene",
    timestamp: "2023-03-16 10:24 AM",
  },
  {
    id: 7,
    name: "Bob Smith",
    email: "bob2@example.com",
    description: "I've noticed a lack of communication regarding changes in the menu or special meal events.It would be helpful to have a notice board or digital platform where such information is regularly uptimestampd.",
    mess: "Pine Mess",
    category: "Food Quality",
    timestamp: "2023-03-16 10:24 AM",
  },
]



// export const messOptions = [{ mess: "Pine", key: 1 }, { mess: "Oak", key: 2 }, { mess: "Alder", key: 3 }];
// export const hostelOptions = [{ hostel: "B11", key: 1 }, { hostel: "B12", key: 2 }, { hostel: "B13", key: 3 }];
export const batchOptions = [{ batch: "2024", key: 1 }, { batch: "2023", key: 2 }, { batch: "2022", key: 3 }, { batch: "2021", key: 4 }];
export const categoryOptions = [{ category: "Food Quality", key: 1 }, { category: "Hygiene", key: 2 }, { category: "Others", key: 3 }];

export { columns };
