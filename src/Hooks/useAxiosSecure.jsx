import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOutUser } = useAuth();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log("error tracked in the interceptors", error.response);
        if (error.response.status === 401 || error.response.status === 403) {
          logOutUser().then(() => {
            navigate("/login");
          });
        }
      }
    );
  }, [logOutUser, navigate]);
  return axiosSecure;
};
export default useAxiosSecure;
