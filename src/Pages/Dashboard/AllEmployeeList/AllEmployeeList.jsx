import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Components/Loader";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import EditModal from "../../../Components/Dashboard/Sidebar/EditModal/EditModal";
import Swal from "sweetalert2";

const AllEmployeeList = () => {
  const [open, setOpen] = useState(false);
  const [currentObj, setCurrentObj] = useState({});
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: allEmployeeAndHR,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["allHRAndEmployees"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users/admin");
      return data;
    },
  });

  const handleEdit = (obj) => {
    setCurrentObj(obj);
    setOpen(!open);
  };

  // fired handled
  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, obj }) => {
      console.log(obj);
      const { data } = await axiosSecure.patch(`/users/${id}`, obj);
      return data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        Swal.fire({
          title: "Successfully Changed!",
          icon: "success",
          timer: 1000,
        });
        refetch();
      }
    },
  });

  const handleFired = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want!",
    }).then((result) => {
      if (result.isConfirmed) {
        const obj = {
          status: "Fired",
        };
        try {
          mutateAsync({ id, obj });
        } catch (err) {
          toast.error("Something went wrong");
        }
      }
    });
  };

  // handle role
  const handleRole = (object) => {
    const id = object.id;
    const obj = { role: object.role };
    if (object.currentRole !== obj.role) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to change the role?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I want!",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            mutateAsync({ id, obj });
          } catch (err) {
            toast.error("Something went wrong");
          }
        }
      });
    }
  };
  return (
    <div className="">
      {isPending || loading ? (
        <div className="w-full flex justify-center min-h-[calc(100vh-50px)] items-center">
          <Loader />
        </div>
      ) : (
        <div className="container mx-auto lg:p-4">
          <h1 className="text-2xl lg:text-[40px] lg:mb-10 font-bold text-center mb-4">
            All Verified Employees
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b uppercase">No.</th>
                  <th className="py-2 px-4 border-b uppercase">Name</th>
                  <th className="py-2 px-4 border-b uppercase">Designation</th>
                  <th className="py-2 px-4 border-b uppercase">Role</th>
                  <th className="py-2 px-4 border-b uppercase">Action</th>
                  <th className="py-2 px-4 border-b uppercase">Edit INFO</th>
                </tr>
              </thead>
              <tbody>
                {allEmployeeAndHR?.map((stuff, index) => (
                  <tr
                    key={index}
                    className="bg-gray-50 text-center odd:bg-white"
                  >
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{stuff.name}</td>
                    <td className="py-2 px-4 border-b">
                      {stuff.designation || "null"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <select
                        defaultValue={stuff.role}
                        className="border bg-white rounded p-2"
                        onChange={(e) =>
                          handleRole({
                            id: stuff._id,
                            role: e.target.value,
                            currentRole: stuff.role,
                          })
                        }
                      >
                        <option value="Employee">Employee</option>
                        <option value="HR">HR</option>
                      </select>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleFired(stuff._id)}
                        className="bg-red-500 text-white !px-3 !py-1 btn btn-sm rounded !mr-2"
                      >
                        {stuff?.status === "Fired" ? "Fired" : "Fire"}
                      </button>
                    </td>
                    <td className="py-2 px-4 border-b ">
                      <Link>
                        <button
                          onClick={() => handleEdit(stuff)}
                          className="bg-blue-500 text-white !px-3 !py-1 btn btn-sm rounded !mr-2"
                        >
                          <FaEdit />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <EditModal
            open={open}
            currentObj={currentObj}
            refetch={refetch}
            setOpen={setOpen}
          />
          <Toaster />
        </div>
      )}
    </div>
  );
};

export default AllEmployeeList;
