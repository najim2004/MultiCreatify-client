import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import LoginSignup from "../Pages/Login-Signup/LoginSignup";
import Dashboard from "../Layout/Dashboard";
import WorkSheet from "../Pages/Dashboard/WorkSheet/WorkSheet";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import EmployeeList from "../Pages/Dashboard/EmployeeList/EmployeeList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <LoginSignup />,
      },
      {
        path: "/login",
        element: <LoginSignup />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <WorkSheet />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "employee-list",
        element: <EmployeeList />,
      },
    ],
  },
]);

export default router;
