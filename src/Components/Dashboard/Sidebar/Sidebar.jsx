import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { BsPersonWorkspace } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { NavLink } from "react-router-dom";

import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { FaUsers } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { MdPayments, MdSettings } from "react-icons/md";
import CheckRole from "../../CheckRole/CheckRole";

const Sidebar = () => {
  const { logOutUser } = useAuth();
  const [isActive, setActive] = useState(false);
  const [role] = CheckRole();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-titleClr text-white flex justify-between lg:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link
              to={"/"}
              className="mr-4 font-openSans md:text-2xl text-xl lg:text-3xl font-bold cursor-pointer py-1.5"
            >
              MultiCreatify
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-white focus:bg-opacity-10"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 lg:fixed flex flex-col justify-between overflow-x-hidden bg-opacity-85 bg-titleClr  text-white w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  lg:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden lg:flex  rounded-lg justify-center items-center bg-rose-100 mx-auto">
              <Link
                to={"/"}
                className="mr-4 font-openSans md:text-2xl text-xl lg:text-3xl font-bold cursor-pointer py-1.5"
              >
                MultiCreatify
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col font-po justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {role === "Employee" && (
                <>
                  {/* Work Sheet */}
                  <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5 rounded-lg  transition-colors duration-300 transform  hover:bg-white  hover:text-titleClr ${
                        isActive ? "bg-white  text-titleClr" : "text-white"
                      }`
                    }
                  >
                    <BsPersonWorkspace className="w-5 h-5" />

                    <span className="mx-4 font-medium">Work Sheet</span>
                  </NavLink>

                  {/* Payment History */}
                  <NavLink
                    to="payment-history"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5 rounded-lg  transition-colors duration-300 transform  hover:bg-white  hover:text-titleClr ${
                        isActive ? "bg-white  text-titleClr" : "text-white"
                      }`
                    }
                  >
                    <MdPayments className="w-5 h-5" />

                    <span className="mx-4 font-medium">Payment History</span>
                  </NavLink>
                </>
              )}

              {role === "HR" && (
                <>
                  {/* Employee List */}
                  <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5 rounded-lg  transition-colors duration-300 transform  hover:bg-white  hover:text-titleClr ${
                        isActive ? "bg-white  text-titleClr" : "text-white"
                      }`
                    }
                  >
                    <FaUsers className="w-5 h-5" />

                    <span className="mx-4 font-medium">Employee List</span>
                  </NavLink>
                  {/* progress */}
                  <NavLink
                    to="progress"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5 rounded-lg  transition-colors duration-300 transform  hover:bg-white  hover:text-titleClr ${
                        isActive ? "bg-white  text-titleClr" : "text-white"
                      }`
                    }
                  >
                    <FaBarsProgress className="w-5 h-5" />

                    <span className="mx-4 font-medium">Progress</span>
                  </NavLink>
                </>
              )}
              {role === "Admin" && (
                <>
                  {/* all-employee-list */}
                  <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5 rounded-lg  transition-colors duration-300 transform  hover:bg-white  hover:text-titleClr ${
                        isActive ? "bg-white  text-titleClr" : "text-white"
                      }`
                    }
                  >
                    <GrUserAdmin className="w-5 h-5" />

                    <span className="mx-4 font-medium">All Employee List</span>
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5 rounded-lg  transition-colors duration-300 transform  hover:bg-white  hover:text-titleClr ${
                isActive ? "bg-white  text-titleClr" : "text-white"
              }`
            }
          >
            <MdSettings className="w-5 h-5" />

            <span className="mx-4 font-medium">Profile</span>
          </NavLink>
          <button
            onClick={logOutUser}
            className="flex w-full items-center px-4 py-2 mt-5 rounded-lg text-white hover:bg-white   hover:text-titleClr transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
