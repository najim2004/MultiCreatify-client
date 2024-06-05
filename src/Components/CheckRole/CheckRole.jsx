// import PropTypes from "prop-types";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CheckRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: [`${user?.email}`, user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/role/${user?.email}`);
      return data;
    },
  });

  return [data?.role, isLoading];
};

// CheckRole.propTypes = {};

export default CheckRole;
