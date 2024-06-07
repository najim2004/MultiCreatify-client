import { Typography } from "@material-tailwind/react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaReddit,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-black  p-8">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between">
        <Link
          to={"/"}
          className="mr-4 font-openSans text-white md:text-2xl text-xl lg:text-3xl font-bold cursor-pointer py-1.5"
        >
          MultiCreatify
        </Link>
        <ul className="flex  flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Link
              to={"/"}
              className="font-normal text-white transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Home
            </Link>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal text-white transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal text-white transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              License
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal text-white transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contribute
            </Typography>
          </li>
          <li>
            <Link
              to={"/contact"}
              className="font-normal text-white transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-full text-3xl text-white my-5 flex-wrap flex justify-center gap-6">
        <FaFacebook />
        <FaTwitter />
        <FaInstagram />
        <FaGithub />
        <FaReddit />
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography
        color="blue-gray"
        className="text-center text-white font-normal"
      >
        All Right Reserve By MultiCreatify &copy; {new Date().getFullYear()}
      </Typography>
    </footer>
  );
};

export default Footer;
