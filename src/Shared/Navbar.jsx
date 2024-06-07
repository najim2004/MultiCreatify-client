import React, { useEffect, useState } from "react";
import {
  Navbar,
  Button,
  IconButton,
  Collapse,
  Typography,
  MenuItem,
  MenuList,
  Avatar,
  MenuHandler,
  Menu,
} from "@material-tailwind/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { MdExitToApp } from "react-icons/md";

export function StickyNavbar() {
  const { user, loading, logOutUser } = useAuth();
  const [openNav, setOpenNav] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 text-black font-poppins font-medium flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li>
        <NavLink to={"/dashboard"}>Dashboard</NavLink>
      </li>
      <li>
        <NavLink to={"/contact"}>Contact Us</NavLink>
      </li>
    </ul>
  );
  const auth = (
    <>
      {loading ? (
        <span className="loading loading-ring loading-lg"></span>
      ) : user ? (
        <Menu>
          <MenuHandler>
            <Avatar
              variant="circular"
              alt="tania andrew"
              className="cursor-pointer"
              src={user?.photoURL}
            />
          </MenuHandler>
          <MenuList>
            <MenuItem className="flex items-center gap-2">
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0ZM11.293 9.293C11.1108 9.4816 11.01 9.7342 11.0123 9.9964C11.0146 10.2586 11.1198 10.5094 11.3052 10.6948C11.4906 10.8802 11.7414 10.9854 12.0036 10.9877C12.2658 10.99 12.5184 10.8892 12.707 10.707L15.707 7.707C15.8945 7.51947 15.9998 7.26516 15.9998 7C15.9998 6.73484 15.8945 6.48053 15.707 6.293L12.707 3.293C12.6148 3.19749 12.5044 3.12131 12.3824 3.0689C12.2604 3.01649 12.1292 2.9889 11.9964 2.98775C11.8636 2.9866 11.7319 3.0119 11.609 3.06218C11.4861 3.11246 11.3745 3.18671 11.2806 3.2806C11.1867 3.3745 11.1125 3.48615 11.0622 3.60905C11.0119 3.73194 10.9866 3.86362 10.9877 3.9964C10.9889 4.12918 11.0165 4.2604 11.0689 4.3824C11.1213 4.50441 11.1975 4.61475 11.293 4.707L12.586 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H12.586L11.293 9.293Z"
                  fill="#90A4AE"
                />
              </svg>
              <Typography
                onClick={logOutUser}
                variant="small"
                className="font-medium"
              >
                Sign Out
              </Typography>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <>
          <Link
            to={"/login"}
            className="hidden font-poppins font-medium  lg:inline-block"
          >
            <span>Log In</span>
          </Link>
          <Link
            to={"/signup"}
            className="hidden font-poppins font-medium  lg:inline-block"
          >
            <span>Sign Up</span>
          </Link>
        </>
      )}
    </>
  );

  // scroll check
  const [isScroll, setScroll] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 30) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`z-50 bg-transparent  w-full fixed`}>
      <Navbar
        className={`top-0 z-10 !bg-transparent !backdrop-blur-0 h-max !shadow-none border-none backdrop-saturate-100  max-w-full rounded-none p-0`}
      >
        <div
          className={`flex items-center ${
            !isScroll && location.pathname === "/"
              ? "bg-transparent "
              : "bg-titleClr bg-opacity-90 "
          } text-white justify-between px-4 py-2 lg:px-8 lg:py-4`}
        >
          <Link
            to={"/"}
            className="mr-4 font-openSans md:text-2xl text-xl lg:text-3xl font-bold cursor-pointer py-1.5"
          >
            MultiCreatify
          </Link>
          <div className="flex items-center gap-4">
            <div className="mr-10 hidden *:text-white lg:block">{navList}</div>
            <div className="flex items-center  gap-x-5">{auth}</div>
            <IconButton
              variant="text"
              className="ml-auto flex h-6 w-6  text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse className="" open={openNav}>
          <div
            className={`${
              isScroll ? "bg-gray-100" : "bg-white"
            } p-4  m-4  rounded-lg`}
          >
            {navList}
            <div className="flex items-center gap-x-1">
              {user ? (
                <Button
                  onClick={logOutUser}
                  fullWidth
                  variant="text"
                  size="sm"
                  className="!bg-red-800 text-white"
                >
                  <span className="flex justify-center items-center gap-3 text-[15px]">
                    Logout <MdExitToApp className="text-xl" />
                  </span>
                </Button>
              ) : (
                <>
                  <Button fullWidth variant="text" size="sm" className="">
                    <span>Log In</span>
                  </Button>
                  <Button fullWidth variant="gradient" size="sm" className="">
                    <span>Sign in</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </Collapse>
      </Navbar>
      <hr className="opacity-15" />
    </div>
  );
}
