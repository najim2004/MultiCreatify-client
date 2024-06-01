import { createContext, useEffect, useState } from "react";

import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../Firebase/Firebase.cnfig";
export const AuthData = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const googleProvider = new GoogleAuthProvider();
  const LoginByGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // store the token
        // const userInfo = { email: currentUser.email };
        // axiosPublic
        //   .post("/jwt", userInfo)
        //   .then(({ data }) => {
        //     if (data.token) {
        //       localStorage.setItem("access_token", data.token);
        //     }
        //   })
        //   .catch((err) => {
        //     console.log("jwt get related error from client", err);
        //   });
      } else {
        setUser(null);
        // localStorage.removeItem("access_token");
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (Name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: Name,
      photoURL: photo ? photo : " ",
    });
  };

  const dataObj = {
    user,
    loading,
    setLoading,
    registerUser,
    loginUser,
    logOutUser,
    updateUserProfile,
    LoginByGoogle,
  };
  return <AuthData.Provider value={dataObj}>{children}</AuthData.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
export default AuthProvider;
