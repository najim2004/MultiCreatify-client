import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <Helmet>
        <title>404 | MultiCreatify</title>
      </Helmet>
      <div className="text-center">
        <div className="relative inline-block w-48 h-48 md:w-64 md:h-64 mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="w-full h-full"
          >
            <path
              d="M50,0 C22.4,0 0,22.4 0,50 C0,77.6 22.4,100 50,100 C77.6,100 100,77.6 100,50 C100,22.4 77.6,0 50,0 Z"
              fill="#76E4F7"
            />
            <text
              x="50"
              y="55"
              textAnchor="middle"
              fill="#fff"
              fontSize="35"
              fontFamily="Arial"
              dy=".3em"
            >
              404
            </text>
          </svg>
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800 mt-6">
          Uh oh. That page doesn’t exist.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-4">
          Head to our{" "}
          <Link to="/" className="text-blue-600 underline">
            homepage
          </Link>{" "}
          that does exist
        </p>

        <div className="mt-8 flex justify-center space-x-4">
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
          >
            Home
          </Link>
          <Link
            to={-1}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded transition duration-300"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
