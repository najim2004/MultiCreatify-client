import { Navigate } from "react-router-dom";
import CheckRole from "../Components/CheckRole/CheckRole";
import PropTypes from "prop-types";
import Loader from "../Components/Loader";
const AdminRoute = ({ children }) => {
  const [role, isLoading] = CheckRole();
  if (isLoading) {
    return (
      <div className=" h-[calc(100vh-72px)] absolute z-50 w-full bg-white bg-opacity-60 backdrop-blur-[5px] grid place-items-center">
        <Loader />
      </div>
    );
  }
  if (role === "Admin") {
    return children;
  }
  return <Navigate to={"/"} />;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AdminRoute;
