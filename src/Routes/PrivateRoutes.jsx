import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthData } from "../Context/AuthProvider";
import Loader from "../Components/Loader";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthData);
  if (loading) {
    return (
      <div className=" h-[calc(100vh-72px)] absolute z-50 w-full bg-white bg-opacity-60 backdrop-blur-[5px] grid place-items-center">
        <Loader />
      </div>
    );
  }
  if (user) {
    return children;
  }
  return (
    <Navigate to={"/login"} state={{ from: location.pathname }}></Navigate>
  );
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoutes;
