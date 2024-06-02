import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";
import useAuth from "../../../Hooks/useAuth";

const WorkSheet = () => {
  const { user, loading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [taskType, setTaskType] = useState("Sales");
  const [hoursWorked, setHoursWorked] = useState("");
  const [date, setDate] = useState(new Date());

  const handleAddTask = () => {
    const newTask = { taskType, hoursWorked, date };
    setTasks([newTask, ...tasks]);
    setTaskType("Sales");
    setHoursWorked("");
    setDate(new Date());
  };

  return (
    <div className="container mx-auto  p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Work Sheet</h1>
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
            <tr>
              <th className="py-2 px-4 border-b">No.</th>
              <th className="py-2 px-4 border-b">Task</th>
              <th className="py-2 px-4 border-b">Hours Worked</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className="bg-gray-50 text-center odd:bg-white">
                <td className="py-2 px-4 border-b">{index}</td>
                <td className="py-2 px-4 border-b">{task.taskType}</td>
                <td className="py-2 px-4 border-b">{task.hoursWorked}</td>
                <td className="py-2 px-4 border-b">
                  {task.date.toDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkSheet;
