import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen lg:flex">
      <div className="">
        <Sidebar />
      </div>
      <div className="lg:ml-64 overflow-x-hidden p-5 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
