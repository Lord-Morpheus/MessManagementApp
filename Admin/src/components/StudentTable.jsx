import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "../components/ui/dropdown-menu";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "../components/ui/table";
import { CardContent, Card } from "../components/ui/card";
import { TbFileExport } from "react-icons/tb";
import { IoSearchOutline } from "react-icons/io5";

export function TableComponent() {
  return (
    <div key="1" className="px-4 md:px-6 py-6 md:py-8 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold tracking-tight">
            Student Directory
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            View and search student information.
          </p>
        </div>
        <div className="flex gap-4 md:gap-8 ml-auto shrink-0">
          <div className="w-full md:w-[314px] flex items-center gap-4 md:gap-2 ">
            <Label className="sr-only" htmlFor="search">
              Search
            </Label>
            <Input
              className="flex-1 min-w-0"
              id="search"
              placeholder="Search by name or user ID"
              type="search"
            ></Input>
            <Button type="submit" className="bg-[#012169]">
              <IoSearchOutline className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-4 md:gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-[#012169]">
                Filter by Mess
                <ChevronDownIcon className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem>Pine</DropdownMenuItem>
              <DropdownMenuItem>Oak</DropdownMenuItem>
              <DropdownMenuItem>Alder</DropdownMenuItem>
              <DropdownMenuItem>Peepal</DropdownMenuItem>
              <DropdownMenuItem>Tulsi</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-[#012169]">
                Filter by Year
                <ChevronDownIcon className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem>2024</DropdownMenuItem>
              <DropdownMenuItem>2023</DropdownMenuItem>
              <DropdownMenuItem>2022</DropdownMenuItem>
              <DropdownMenuItem>2021</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-[#012169]">
                Filter by Hostel
                <ChevronDownIcon className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem>B-13</DropdownMenuItem>
              <DropdownMenuItem>B-14</DropdownMenuItem>
              <DropdownMenuItem>B-19</DropdownMenuItem>
              <DropdownMenuItem>B-18</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-[#012169]">
                Filter by Batch
                <ChevronDownIcon className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem>2024</DropdownMenuItem>
              <DropdownMenuItem>2023</DropdownMenuItem>
              <DropdownMenuItem>2022</DropdownMenuItem>
              <DropdownMenuItem>2021</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button type="submit" className="bg-green-700">
          <TbFileExport className="mr-2 h-5 w-5" />
          Export to Excel
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Mess</TableHead>
                  <TableHead>Hostel</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold">B22126</TableCell>
                  <TableCell>Rudra Pratap Singh</TableCell>
                  <TableCell>2022</TableCell>
                  <TableCell>Tulsi</TableCell>
                  <TableCell>B-13</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">B22333</TableCell>
                  <TableCell>Tarun Srivastava</TableCell>
                  <TableCell>2022</TableCell>
                  <TableCell>Oak</TableCell>
                  <TableCell>B-11</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">B22103</TableCell>
                  <TableCell>Leepakshi Kumar</TableCell>
                  <TableCell>2022</TableCell>
                  <TableCell>Pine</TableCell>
                  <TableCell>B-9</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">B22144</TableCell>
                  <TableCell>Vanshika</TableCell>
                  <TableCell>2022</TableCell>
                  <TableCell>Alder</TableCell>
                  <TableCell>B-9</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">B22105</TableCell>
                  <TableCell>Gopesh</TableCell>
                  <TableCell>2023</TableCell>
                  <TableCell>Peepal</TableCell>
                  <TableCell>B-14</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
