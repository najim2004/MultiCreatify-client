import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const LoginSignup = () => {
  const { registerUser, user, loginUser, LoginByGoogle, updateUserProfile } =
    useAuth();
  const location = useLocation();
  const from = location?.state?.from || "/";
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("signup")) {
      setIsLogin(false);
    } else setIsLogin(true);
  }, [location]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const {
      email,
      password,
      name,
      role,
      image,
      bankAccount,
      salary,
      designation,
    } = data;
    if (!isLogin) {
      try {
        const formData = new FormData();
        formData.append("image", image[0]);

        const { data: res } = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBBAPIKRY
          }`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const userRes = await registerUser(email, password);
        await updateUserProfile(name, res.data.display_url);
        if (userRes.user.email) {
          Swal.fire({
            title: "Successfully Registered!",
            icon: "success",
            timer: 1000,
          });
          navigate(from);
          const userInfo = {
            name,
            email,
            image: res.data.display_url || " ",
            role,
            bankAccount,
            salary,
            verified: false,
            designation,
          };
          const { data } = await axiosPublic.post("/users", userInfo);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const result = await loginUser(email, password);
      Swal.fire({
        title: "Login Successful!",
        icon: "success",
        timer: 1000,
      });
      navigate(from);
    }
  };

  const handleGoogleLogin = () => {
    try {
      LoginByGoogle().then(async (res) => {
        Swal.fire({
          title: "Login Successful!",
          icon: "success",
          timer: 1000,
        });
        navigate(from);
        const userInfo = {
          name: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
          role: "Employee",
          bankAccount: null,
          salary: null,
          verified: false,
          designation: null,
        };
        const { data } = await axiosPublic.post("/users", userInfo);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const toggleAuthMode = () => {
    if (location.pathname.includes("login")) {
      navigate("/signup", { state: { from }, replace: true });
    }
    if (location.pathname.includes("signup")) {
      navigate("/login", { state: { from }, replace: true });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-5 bg-gray-100">
      <div
        className={`bg-white p-8 rounded-lg shadow-lg w-full ${
          isLogin ? "max-w-md" : "max-w-4xl"
        }`}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold mt-4">
            {isLogin ? "Please Login" : "Please Sign Up"}
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className={`grid grid-cols-1 ${
              !isLogin ? "lg:grid-cols-2 gap-4" : ""
            }`}
          >
            {!isLogin && (
              <>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    placeholder="Enter your name"
                    className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="image"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    {...register("image", { required: "Image is required" })}
                    className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.image && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.image.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="role"
                  >
                    Role
                  </label>
                  <select
                    defaultValue={"Employee"}
                    id="role"
                    {...register("role")}
                    className="shadow bg-white appearance-auto border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="Employee">Employee</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="designation"
                  >
                    Designation
                  </label>
                  <select
                    defaultValue={"default"}
                    id="role"
                    {...register("designation")}
                    className="shadow bg-white appearance-auto border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="default">Sales Assistant</option>
                    <option>Social Media executive</option>
                    <option>Digital Marketer</option>
                    <option>Front End Developer</option>
                    <option>Back End Developer</option>
                    <option>App Developer</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="bankAccount"
                  >
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    id="bankAccount"
                    {...register("bankAccount", {
                      required: "Bank account number is required",
                    })}
                    placeholder="Enter your bank account number"
                    className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.bankAccount && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.bankAccount.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="salary"
                  >
                    Salary
                  </label>
                  <input
                    min={0}
                    type="number"
                    id="salary"
                    {...register("salary", { required: "Salary is required" })}
                    placeholder="Enter your salary"
                    className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.salary && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.salary.message}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* password */}
          <div className="flex justify-between gap-6">
            <div className="mb-4 flex-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                      message:
                        "Password must contain at least one uppercase letter and one special character",
                    },
                  })}
                  placeholder="Enter your password"
                  className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>
            {!isLogin && (
              <div className="mb-4 flex-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="repeat-password"
                >
                  Repeat Password
                </label>
                <div className="relative">
                  <input
                    type={showRepeatPassword ? "text" : "password"}
                    id="repeat-password"
                    {...register("repeatPassword", {
                      required: "Please repeat your password",
                      validate: (value) =>
                        value === document.getElementById("password").value ||
                        "Passwords do not match",
                    })}
                    placeholder="Repeat your password"
                    className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    onClick={toggleRepeatPasswordVisibility}
                  >
                    {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.repeatPassword && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.repeatPassword.message}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:justify-between space-y-4">
            <button
              type="button"
              onClick={toggleAuthMode}
              className="lg:inline-block hidden align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              {isLogin ? "Create an account" : "Login with existing account"}
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isLogin ? "Get Login" : "Sign Up Now"}
            </button>
            <button
              type="button"
              onClick={toggleAuthMode}
              className="inline-block lg:hidden align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              {isLogin ? "Create an account" : "Login with existing account"}
            </button>
          </div>
          <div className="mt-4">
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="max-w-[700px] mx-auto flex items-center justify-center bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <FcGoogle className="mr-2 text-2xl" /> Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
