import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { categoryOptions, feedbacks, messOptions } from "./data";

const FeedbackTable = () => {
  const [messFilter, setMessFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");
  const hasSearchFilter = Boolean(searchFilter);

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

  const filteredFeedbacks = useMemo(() => {
    let filteredFeedbacks = [...feedbacks];

    if (hasSearchFilter) {
      filteredFeedbacks = filteredFeedbacks.filter(
        (feedback) =>
          feedback.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
          feedback.email.toLowerCase().includes(searchFilter.toLowerCase()) ||
          feedback.description
            .toLowerCase()
            .includes(searchFilter.toLowerCase())
      );
    }

    if (messFilter !== "all") {
      filteredFeedbacks = filteredFeedbacks.filter((feedback) =>
        feedback.mess.toLowerCase().includes(messFilter.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filteredFeedbacks = filteredFeedbacks.filter((feedback) =>
        feedback.category.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    }

    return filteredFeedbacks;
  }, [messFilter, categoryFilter, hasSearchFilter, searchFilter]);

  return (
    <div className="flex flex-col">
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
                    Select Category
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
                    Select Mess
                    <ChevronDownIcon className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                  {messOptions.map(({ mess, key }) => (
                    <DropdownMenuItem
                      key={key}
                      onSelect={() => onMessChange(mess)}
                    >
                      {mess}
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
                <TableHead className="w-[150px]">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFeedbacks.map((feedback) => (
                <TableRow key={feedback.id}>
                  <TableCell className="font-semibold">
                    {feedback.name}
                  </TableCell>
                  <TableCell>{feedback.email}</TableCell>
                  <TableCell>{feedback.description}</TableCell>
                  <TableCell>{feedback.mess}</TableCell>
                  <TableCell>{feedback.category}</TableCell>
                  <TableCell>{feedback.timestamp}</TableCell>
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
