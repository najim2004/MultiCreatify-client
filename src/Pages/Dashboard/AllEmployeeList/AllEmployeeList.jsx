import { Toaster } from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Components/Loader";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import EditModal from "../../../Components/Dashboard/Sidebar/EditModal/EditModal";

const AllEmployeeList = () => {
  const [open, setOpen] = useState(false);
  const [currentObj, setCurrentObj] = useState({});
  const { user, loading } = useAuth();
  const [roleType, setRoleType] = useState("");
  const axiosSecure = useAxiosSecure();
  const { data: allEmployeeAndHR, isPending } = useQuery({
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
  return (
    <div className="">
      {isPending || loading ? (
        <div className="w-full flex justify-center min-h-[calc(100vh-50px)] items-center">
          <Loader />
        </div>
      ) : (
        <div className="container mx-auto lg:p-4">
          <h1 className="text-2xl font-bold text-center mb-4">Work Sheet</h1>
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
                        onChange={(e) => setRoleType(e.target.value)}
                      >
                        <option value="Employee">Employee</option>
                        <option value="HR">HR</option>
                      </select>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button className="bg-red-500 text-white !px-3 !py-1 btn btn-sm rounded !mr-2">
                        Fire
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
          <EditModal open={open} currentObj={currentObj} setOpen={setOpen} />
          <Toaster />
        </div>
      )}
    </div>
  );
};

export default AllEmployeeList;
