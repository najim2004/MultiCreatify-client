import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";

import { IconButton, Typography } from "@material-tailwind/react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Components/Loader";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const Progress = () => {
  const { loading, user } = useAuth();
  const monthRef = useRef("All");
  const employeeRef = useRef("All");
  const [active, setActive] = useState(0);
  const axiosSecure = useAxiosSecure();
  const [allEmployeesWorkSheet, setAllEmployeesWorkSheet] = useState([]);

  const { data: res, isLoading } = useQuery({
    queryKey: ["allEmployeesWorkSheet"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data: allEmployeesWorkSheet } = await axiosSecure.get(
        `/work-sheet`
      );
      const { data: allUser } = await axiosSecure.get(`/users?role=Employee`);
      return { allEmployeesWorkSheet, allUser };
    },
  });

  useEffect(() => {
    setAllEmployeesWorkSheet(res?.allEmployeesWorkSheet);
  }, [res?.allEmployeesWorkSheet]);

  const handleFilter = () => {
    const employee = employeeRef.current.value;
    const month = monthRef.current.value;
    try {
      if (employee !== "All" && month === "All") {
        const filteredData = res.allEmployeesWorkSheet.filter(
          (item) => item.name === employee
        );
        setAllEmployeesWorkSheet(filteredData);
      }
      if (month !== "All" && employee === "All") {
        const filteredData = res.allEmployeesWorkSheet.filter(
          (item) => new Date(item.date).getMonth() === +month
        );
        setAllEmployeesWorkSheet(filteredData);
      }
      if (month !== "All" && employee !== "All") {
        const filteredData = res.allEmployeesWorkSheet.filter(
          (item) =>
            new Date(item.date).getMonth() === +month && item.name === employee
        );
        setAllEmployeesWorkSheet(filteredData);
      }
      if (month === "All" && employee == "All") {
        setAllEmployeesWorkSheet(res.allEmployeesWorkSheet);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("name", {
      header: "Employee Name",
    }),
    columnHelper.accessor("email", {
      header: "Email",
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
      <Helmet>
        <title>Progress | Dashboard | MultiCreatify</title>
      </Helmet>
      {isLoading || loading ? (
        <div className="w-full flex justify-center min-h-[calc(100vh-50px)] items-center">
          <Loader />
        </div>
      ) : (
        <div className="container mx-auto lg:p-4 overflow-hidden">
          <h1 className="text-2xl text-titleClr lg:text-[40px] lg:mb-10 font-bold text-center mb-4">
            All Employees Progress
          </h1>
          <form
            onChange={handleFilter}
            className="flex items-center justify-end mb-5 gap-5"
          >
            <h3 className="text-xl font-poppins font-semibold text-desClr">
              Filter:
            </h3>
            <select
              ref={employeeRef}
              className="bg-white h-10 focus:!outline-none rounded-sm border-[2px]"
            >
              <option value="All">All Employees</option>
              {res?.allUser?.map((option) => (
                <option value={option.name} key={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
            <select
              ref={monthRef}
              className="h-10 bg-white focus:!outline-none rounded-sm border-[2px]"
            >
              <option value="All">All Months</option>
              <option value="0">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">October</option>
              <option value="10">November</option>
              <option value="11">December</option>
            </select>
          </form>
          <div className="overflow-x-auto text-nowrap">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                {table.getHeaderGroups()?.map((headerGroup) => {
                  return (
                    <tr
                      className="bg-titleClr bg-opacity-85 text-white"
                      key={headerGroup.id}
                    >
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
              {allEmployeesWorkSheet?.length > 0 && (
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
          {allEmployeesWorkSheet?.length > 9 && (
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
