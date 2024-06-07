import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import LoginSignup from "../Pages/Login-Signup/LoginSignup";
import Dashboard from "../Layout/Dashboard";
import WorkSheet from "../Pages/Dashboard/WorkSheet/WorkSheet";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import EmployeeList from "../Pages/Dashboard/EmployeeList/EmployeeList";
import EmployeeDetails from "../Pages/Dashboard/EmployeeDetails/EmployeeDetails";
import Progress from "../Pages/Dashboard/Progress/Progress";
import AllEmployeeList from "../Pages/Dashboard/AllEmployeeList/AllEmployeeList";
import PrivateRoutes from "./PrivateRoutes";
import HRRoute from "./HRRoute";
import EmployeeRoute from "./EmployeeRoute";
import Redirector from "../Components/Redirector";
import Contact from "../Pages/Contact/Contact";

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
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: <Redirector />,
      },
      // {
      //   path: "work-sheet",
      //   element: (
      //     <EmployeeRoute>
      //       <WorkSheet />
      //     </EmployeeRoute>
      //   ),
      // },
      {
        path: "payment-history",
        element: (
          <EmployeeRoute>
            <PaymentHistory />
          </EmployeeRoute>
        ),
      },
      // {
      //   path: "employee-list",
      //   element: (
      //     <HRRoute>
      //       <EmployeeList />
      //     </HRRoute>
      //   ),
      // },
      {
        path: "details/:id",
        element: (
          <HRRoute>
            <EmployeeDetails />
          </HRRoute>
        ),
      },
      {
        path: "progress",
        element: (
          <HRRoute>
            <Progress />
          </HRRoute>
        ),
      },
      // {
      //   path: "all-employee-list",
      //   element: (
      //     <AdminRoute>
      //       <AllEmployeeList />
      //     </AdminRoute>
      //   ),
      // },
    ],
  },
]);

export default router;
