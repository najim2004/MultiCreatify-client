// components/Redirector.js
import { Navigate } from "react-router-dom";
import CheckRole from "./CheckRole/CheckRole";
import WorkSheet from "../Pages/Dashboard/WorkSheet/WorkSheet";
import EmployeeList from "../Pages/Dashboard/EmployeeList/EmployeeList";
import AllEmployeeList from "../Pages/Dashboard/AllEmployeeList/AllEmployeeList";
import Loader from "./Loader";
import EmployeeRoute from "../Routes/EmployeeRoute";

const Redirector = () => {
  const [role, isLoading] = CheckRole();
  if (isLoading) {
    return (
      <div className=" h-[calc(100vh-72px)] absolute z-50 w-full bg-white bg-opacity-60 backdrop-blur-[5px] grid place-items-center">
        <Loader />
      </div>
    );
  }
  switch (role) {
    case "Employee":
      return (
        <EmployeeRoute>
          <WorkSheet />
        </EmployeeRoute>
      );
    case "HR":
      return <EmployeeList />;
    case "Admin":
      return <AllEmployeeList />;
    default:
      return <Navigate to="/" />;
  }
};

export default Redirector;
