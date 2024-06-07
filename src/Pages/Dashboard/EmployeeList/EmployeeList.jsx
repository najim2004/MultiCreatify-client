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
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Loader from "../../../Components/Loader";
import useAuth from "../../../Hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import PaymentModal from "../../../Components/Dashboard/PaymentModal/PaymentModal";

const EmployeeList = () => {
  const [open, setOpen] = useState(false);
  const { loading, user } = useAuth();
  const [active, setActive] = useState(0);
  const axiosSecure = useAxiosSecure();
  const {
    data: allEmployees = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allEmployees"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?role=Employee`);
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.patch(`/users/hr/${id}`);
      return data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        toast.success("Successfully updated!");
        refetch();
      } else {
        toast.error("Already Verified!");
      }
    },
  });
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("email", {
      header: "Email",
    }),
    columnHelper.accessor("verified", {
      header: "Verified",
      cell: ({ row }) => (
        <div>
          <button
            onClick={() => handleVerified(row.original._id)}
            className={` text-white !px-3 !py-1  rounded !mr-2`}
          >
            {row.original.verified === false ? (
              <span className="text-xl text-red-500">❌</span>
            ) : (
              <span className="text-xl">✅</span>
            )}
          </button>
        </div>
      ),
    }),
    columnHelper.accessor("bankAccount", {
      header: "Bank Account",
    }),
    columnHelper.accessor("salary", {
      header: "Salary",
    }),
    columnHelper.accessor("Pay", {
      header: "Pay",
      cell: ({ row }) => (
        <div>
          <button
            onClick={() => handlePay({ data: row.original })}
            className="bg-green-500 text-white !px-3 !py-1 btn btn-sm rounded !mr-2"
          >
            Pay
          </button>
        </div>
      ),
    }),
    columnHelper.accessor("Details", {
      header: "Details",
      cell: ({ row }) => (
        <div>
          <Link to={`/dashboard/details/${row.original._id}`}>
            <button className="bg-blue-500 text-white !px-3 !py-1 btn btn-sm rounded !mr-2">
              Details
            </button>
          </Link>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: allEmployees,
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

  const handleVerified = async (id) => {
    try {
      await mutateAsync(id);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePay = ({ data }) => {
    setOpen(true);
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
            All Employees
          </h1>
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
              {allEmployees.length > 0 && (
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
          {allEmployees.length > 9 && (
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
      <PaymentModal open={open} setOpen={setOpen} />
      <Toaster />
    </div>
  );
};

export default EmployeeList;
