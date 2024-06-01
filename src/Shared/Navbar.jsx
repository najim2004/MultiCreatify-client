import React from "react";
import { Navbar, Button, IconButton, Collapse } from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

export function StickyNavbar() {
  const { user, loading, logOutUser } = useAuth();
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 text-black font-poppins font-medium flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li>
        <NavLink>Dashboard</NavLink>
      </li>
      <li>
        <NavLink>Contact Us</NavLink>
      </li>
    </ul>
  );
  const auth = (
    <>
      {user ? (
        <div className="flex gap-3">
          <img
            className="size-12 rounded-full bg-gray-300 border object-cover border-white"
            src={user.photoURL}
            alt=""
          />
          <button onClick={logOutUser} className="hidden lg:inline-block">
            Logout
          </button>
        </div>
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

  return (
    <div className="max-h-[768px] bg-transparent w-full fixed">
      <Navbar className="top-0 z-10 !bg-transparent h-max !shadow-none border-none backdrop-saturate-100 backdrop-blur-0 max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center text-white justify-between">
          <Link className="mr-4 font-openSans md:text-2xl text-xl lg:text-3xl font-bold cursor-pointer py-1.5">
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
        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            {user ? (
              <Button
                onClick={logOutUser}
                fullWidth
                variant="text"
                size="sm"
                className="bg-gray-200"
              >
                <span>Logout</span>
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
        </Collapse>
      </Navbar>
      <hr className="opacity-15" />
    </div>
  );
}
