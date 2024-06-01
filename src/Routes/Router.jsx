import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import LoginSignup from "../Pages/Login-Signup/LoginSignup";

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
]);

export default router;
