import { useContext } from "react";
import { AuthData } from "../Context/AuthProvider";

const useAuth = () => {
  const authInfo = useContext(AuthData);
  return authInfo;
};

export default useAuth;
