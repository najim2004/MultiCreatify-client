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
import { CiGrid41 } from "react-icons/ci";
import { LuLayoutList } from "react-icons/lu";
import { key } from "localforage";
import { Helmet } from "react-helmet-async";

const AllEmployeeList = () => {
  const [open, setOpen] = useState(false);
  const [currentObj, setCurrentObj] = useState({});
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [toggleLayout, setToggleLayout] = useState(false);
  const {
    data: allEmployeeAndHR,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["allHRAndEmployees"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users/admin");
      return data;
    },
  });

  const handleEdit = (obj) => {
    setCurrentObj(obj);
    setOpen(!open);
  };

  // handled api
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
      <Helmet>
        <title>All Employee List | Dashboard | MultiCreatify</title>
      </Helmet>
      {isPending || loading ? (
        <div className="w-full flex justify-center min-h-[calc(100vh-50px)] items-center">
          <Loader />
        </div>
      ) : (
        <div className="container mx-auto lg:p-4">
          <h1 className="text-2xl text-titleClr lg:text-[40px] lg:mb-10 font-bold text-center mb-4">
            All Verified Employees
          </h1>
          <div className="flex justify-end gap-3  my-6">
            <button
              onClick={() => setToggleLayout(false)}
              className={`${
                !toggleLayout && "text-white !bg-gray-400"
              } btn p-0 w-12 rounded-full h-10 bg-transparent shadow-none btn-sm text-3xl`}
            >
              <LuLayoutList />
            </button>
            <button
              onClick={() => setToggleLayout(true)}
              className={`${
                toggleLayout && "text-white !bg-gray-400"
              } btn p-0 w-12 rounded-full h-10 bg-transparent shadow-none btn-sm text-3xl`}
            >
              <CiGrid41 />
            </button>
          </div>
          {!toggleLayout ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                  <tr className="bg-titleClr bg-opacity-85 text-white">
                    <th className="py-2 px-4 border-b uppercase">No.</th>
                    <th className="py-2 px-4 border-b uppercase">Name</th>
                    <th className="py-2 px-4 border-b uppercase">Email</th>
                    <th className="py-2 px-4 border-b uppercase">
                      Designation
                    </th>
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
                      <td className="py-2 px-4 border-b">{stuff.email}</td>
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
                          disabled={stuff?.status === "Fired"}
                          className="bg-red-500 text-white !px-3 !py-1 btn btn-sm rounded !mr-2"
                        >
                          {stuff?.status === "Fired" ? "Fired" : "Fire"}
                        </button>
                      </td>
                      <td className="py-2 px-4 border-b ">
                        <button
                          onClick={() => handleEdit(stuff)}
                          className="bg-blue-500 text-white !px-3 !py-1 btn btn-sm rounded !mr-2"
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allEmployeeAndHR?.map((stuff) => (
                <div key={stuff._id} className="bg-gray-50 p-5 rounded-lg">
                  <img
                    className="size-14 mb-3 object-cover rounded-full"
                    src={stuff.image}
                    alt=""
                  />
                  <div className="flex-1">
                    <h2 className="text-xl mb-1 font-poppins font-semibold text-titleClr">
                      Name: {stuff.name}
                    </h2>

                    <h3 className="font-poppins mb-2 font-medium text-titleClr">
                      Designation: {stuff.designation || "null"}
                    </h3>
                    <p className="text-desClr mb-3 font-openSans">
                      Email: {stuff.email}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="">
                        <label className="font-bold" htmlFor="">
                          Role:{" "}
                        </label>
                        <select
                          defaultValue={stuff.role}
                          className="bg-transparent focus:border-none focus:outline-none rounded p-2"
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
                      </div>
                      <button
                        onClick={() => handleEdit(stuff)}
                        className="bg-blue-500 text-white !px-3 !py-1 btn btn-sm rounded !mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleFired(stuff._id)}
                        className="bg-red-500 text-white !px-3 !py-1 btn btn-sm rounded !mr-2"
                      >
                        {stuff?.status === "Fired" ? "Fired" : "Fire"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
