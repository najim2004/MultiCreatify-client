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
import axios from "axios";
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

  // Get token from server
  const getToken = async (email) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASEURL}/jwt`,
      { email },
      { withCredentials: true }
    );
    return data;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // store the token
        getToken(currentUser.email);
      } else {
        axios.get(`${import.meta.env.VITE_BASEURL}/logout`, {
          withCredentials: true,
        });
        setUser(null);
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

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
