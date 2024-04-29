import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { IoSearchOutline } from "react-icons/io5";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "./StudentTable";
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";
import { categoryOptions } from "./data";
import { Spinner } from "@nextui-org/react";

const FeedbackTable = () => {
  const [messFilter, setMessFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");
  const hasSearchFilter = Boolean(searchFilter);
  const [messOptions, setMessOptions] = useState([]);
  const [feedbacks, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const token = getToken();
      if (!token) {
        navigate("/login");
      }
      try {
        const messoptions = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/admin/mess`,
          {
            headers: {
              Authorization: `Admin ${token}`,
            },
          }
        );
        setMessOptions(messoptions.data);

        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/admin/feedback`,
          {
            headers: {
              Authorization: `Admin ${token}`,
            },
          }
        );
        setFeedback(data.data);
        setLoading(false);
      } catch (error) {
        const status = error.response.status;
        if (status === 401) {
          console.log("Not Authenticated");
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    }
    fetchData();
  }, [navigate]);

  const onMessChange = useCallback((value) => {
    if (value) {
      setMessFilter(value);
    } else {
      setMessFilter("");
    }
  }, []);

  const onCategoryChange = useCallback((value) => {
    if (value) {
      setCategoryFilter(value);
    } else {
      setCategoryFilter("");
    }
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setSearchFilter(value);
    } else {
      setSearchFilter("");
    }
  }, []);

  const onClear = useCallback(() => {
    setSearchFilter("");
  }, []);

  // const filteredFeedbacks = [...feedbacks];

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    return (
      (!hasSearchFilter ||
        feedback.student.name
          .toLowerCase()
          .includes(searchFilter.toLowerCase()) ||
        feedback.student.email
          .toLowerCase()
          .includes(searchFilter.toLowerCase())) &&
      (messFilter === "all" ||
        feedback.mess.name.toLowerCase().includes(messFilter.toLowerCase())) &&
      (categoryFilter === "all" ||
        feedback.title.toLowerCase().includes(categoryFilter.toLowerCase()))
    );
  });

  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="flex flex-col ">
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Feedbacks</h1>
        </div>

        <form className="flex-initial">
          <div className="flex">
            <div className="mr-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-[#012169]">
                    {categoryFilter === "all"
                      ? "Select Category"
                      : categoryFilter}
                    <ChevronDownIcon className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                  {categoryOptions.map(({ category, key }) => (
                    <DropdownMenuItem
                      key={key}
                      onSelect={() => onCategoryChange(category)}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mr-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-[#012169]">
                    {messFilter === "all" ? "Select Mess" : messFilter}
                    <ChevronDownIcon className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                  {messOptions.map(({ name, id }) => (
                    <DropdownMenuItem
                      key={id}
                      onSelect={() => onMessChange(name)}
                    >
                      {name.toUpperCase()}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="relative">
              <IoSearchOutline className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                className="pl-8 bg-white shadow-none appearance-none sm:w-[300px] md:w-[200px] lg:w-[300px]"
                placeholder="Search feedback..."
                isClearable
                type="search"
                onChange={(e) => onSearchChange(e.target.value)}
                onClear={() => onClear()}
              />
            </div>
          </div>
        </form>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="border shadow-sm rounded-lg p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Student</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Feedback</TableHead>
                <TableHead>Mess</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="w-[150px]">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFeedbacks.map((feedback) => (
                <TableRow key={feedback.id}>
                  <TableCell className="font-semibold">
                    {feedback.student.name}
                  </TableCell>
                  <TableCell>{feedback.student.email}</TableCell>
                  <TableCell>{feedback.description}</TableCell>
                  <TableCell>{feedback.mess.name}</TableCell>
                  <TableCell>{feedback.title}</TableCell>
                  <TableCell>{feedback.attachmenet}</TableCell>
                  <TableCell>{formatDate(feedback.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default FeedbackTable;
