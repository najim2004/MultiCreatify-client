import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../Components/Loader";
import { Helmet } from "react-helmet-async";

// main function
const WorkSheet = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [taskType, setTaskType] = useState("Sales");
  const [hoursWorked, setHoursWorked] = useState("");
  const [date, setDate] = useState(new Date());

  // get all works or tasks
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["workSheet", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data: tasks } = await axiosSecure.get(
        `/work-sheet/${user?.email}`
      );
      const { data: userStatus } = await axiosSecure.get(
        `/users/role/${user?.email}`
      );
      return { tasks, userStatus };
    },
  });

  if (error) {
    console.log("Error! When Work sheet getting", error);
  }

  // add work or task
  const handleAddTask = async () => {
    const newTask = {
      name: user?.displayName,
      email: user?.email,
      status: data?.userStatus?.status || null,
      taskType,
      hoursWorked,
      date,
    };

    if (hoursWorked) {
      try {
        const { data } = await axiosSecure.post(`/work-sheet`, newTask);
        console.log(data);
        if (data.insertedId) {
          toast.success("Work Add/Submit Successfully!");
          refetch();
          setTaskType("Sales");
          setHoursWorked("");
          setDate(new Date());
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please enter hours worked");
    }
  };

  return (
    <div className="">
      <Helmet>
        <title>Work Sheet | Dashboard | MultiCreatify</title>
      </Helmet>
      {isPending || loading ? (
        <div className="w-full flex justify-center min-h-[calc(100vh-50px)] items-center">
          <Loader />
        </div>
      ) : (
        <div className="container mx-auto lg:p-4">
          <h1 className="text-2xl lg:text-[40px] lg:mb-10 font-bold text-center mb-4">
            Work Sheet
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="h-20">
                  <th>
                    <select
                      className="border bg-white rounded p-2"
                      value={taskType}
                      onChange={(e) => setTaskType(e.target.value)}
                    >
                      <option value="Sales">Sales</option>
                      <option value="Support">Support</option>
                      <option value="Content">Content</option>
                      <option value="Paper-work">Paper-work</option>
                    </select>
                  </th>
                  <th>
                    <input
                      type="number"
                      min={0}
                      className="border bg-white rounded p-2"
                      placeholder="Hours Worked"
                      value={hoursWorked}
                      onChange={(e) => setHoursWorked(e.target.value)}
                    />
                  </th>
                  <th>
                    <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                      dateFormat={"dd/MM/yyyy"}
                      className="border bg-white rounded p-2"
                    />
                  </th>
                  <th className="min-w-[150px]">
                    <button
                      onClick={handleAddTask}
                      className="bg-gradient-to-r from-[#9C28B1] to-[#6839B7] btn btn-sm h-10 text-white p-2 rounded"
                    >
                      Add/Submit
                    </button>
                  </th>
                </tr>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">No.</th>
                  <th className="py-2 px-4 border-b">Task</th>
                  <th className="py-2 px-4 border-b">Hours Worked</th>
                  <th className="py-2 px-4 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.tasks?.map((task, index) => (
                  <tr
                    key={index}
                    className="bg-gray-50 text-center odd:bg-white"
                  >
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{task.taskType}</td>
                    <td className="py-2 px-4 border-b">{task.hoursWorked}</td>
                    <td className="py-2 px-4 border-b">
                      {new Date(task.date).toDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Toaster />
        </div>
      )}
    </div>
  );
};

export default WorkSheet;
