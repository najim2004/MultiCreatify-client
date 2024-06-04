import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { IconButton, Typography } from "@material-tailwind/react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Components/Loader";
import useAuth from "../../../Hooks/useAuth";

const Progress = () => {
  const { loading } = useAuth();
  const [active, setActive] = useState(0);
  const axiosSecure = useAxiosSecure();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const { data: allEmployeesWorkSheet = [], isLoading } = useQuery({
    queryKey: ["allEmployeesWorkSheet"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/work-sheet`);
      return data;
    },
  });

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("name", {
      header: "Employee Name",
    }),
    columnHelper.accessor("taskType", {
      header: "Task",
    }),
    columnHelper.accessor("hoursWorked", {
      header: "Hours Worked",
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: ({ row }) => new Date(row.original.date).toDateString(),
    }),
  ];

  const table = useReactTable({
    data: allEmployeesWorkSheet,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const next = () => {
    if (active + 1 === table?.getPageCount()) return;
    setActive(active + 1);
    table.setPageIndex(active + 1);
  };

  const prev = () => {
    if (active + 1 === 1) return;
    setActive(active - 1);
    table.setPageIndex(active - 1);
  };
  return (
    <div className="">
      {isLoading || loading ? (
        <div className="w-full flex justify-center min-h-[calc(100vh-50px)] items-center">
          <Loader />
        </div>
      ) : (
        <div className="container mx-auto lg:p-4 overflow-hidden">
          <h1 className="text-2xl lg:text-[40px] lg:mb-10 font-bold text-center mb-4">
            All Employees Progress
          </h1>
          <select
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="select w-full max-w-xs"
          >
            <option disabled selected>
              Employee Name
            </option>
            <option>Md Najim Hosain</option>
            <option>Najim</option>
            <option>Bart</option>
            <option>Lisa</option>
            <option>Maggie</option>
          </select>
          <select
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="select w-full max-w-xs"
          >
            <option disabled selected>
              Months
            </option>
            <option value="5">June</option>
            <option value="6">July</option>
            <option value="7">August</option>
            <option value="8">September</option>
            <option value="9">October</option>
            <option value="10">November</option>
            <option value="11">December</option>
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="2">March</option>
            <option value="3">April</option>
            <option value="4">May</option>
          </select>
          <div className="overflow-x-auto text-nowrap">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                {table.getHeaderGroups()?.map((headerGroup) => {
                  return (
                    <tr className="bg-gray-100" key={headerGroup.id}>
                      {headerGroup.headers?.map((header) => {
                        return (
                          <th className="py-2 px-4 border-b" key={header.id}>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext
                            )}
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
              {allEmployeesWorkSheet.length > 0 && (
                <tbody>
                  {table.getRowModel().rows?.map((row) => {
                    return (
                      <tr
                        className="bg-gray-50 text-center odd:bg-white"
                        key={row.id}
                      >
                        {row.getVisibleCells()?.map((cell) => {
                          return (
                            <td className="py-2 px-4 border-b" key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </div>
          {allEmployeesWorkSheet.length > 9 && (
            <div className="flex justify-center mt-5 items-center gap-8">
              <IconButton
                size="sm"
                variant="outlined"
                onClick={prev}
                disabled={active === 0}
              >
                <MdArrowLeft className="h-4 w-4" />
              </IconButton>
              <Typography color="gray" className="font-normal">
                Page <strong className="text-gray-900">{active + 1}</strong> of{" "}
                <strong className="text-gray-900">
                  {table?.getPageCount()}
                </strong>
              </Typography>
              <IconButton
                size="sm"
                variant="outlined"
                onClick={next}
                disabled={active === table?.getPageCount() - 1}
              >
                <MdArrowRight className="h-4 w-4" />
              </IconButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Progress;
