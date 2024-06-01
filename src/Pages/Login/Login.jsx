import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  const onSubmit = (data) => {
    console.log(data);
  };

  const toggleAuthMode = () => {
    if (location.pathname.includes("login")) {
      navigate("/signup");
    }
    if (location.pathname.includes("signup")) {
      navigate("/login");
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
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold mt-4">
            {isLogin ? "Please Login" : "Please Sign Up"}
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!isLogin && (
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
          )}
          {!isLogin && (
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
          )}
          {!isLogin && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="role"
              >
                Role
              </label>
              <select
                defaultValue={"default"}
                id="role"
                {...register("role", { required: "Role is required" })}
                className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option disabled value={"default"}>
                  Select Role
                </option>
                <option value="Employee">Employee</option>
                <option value="HR">HR</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.role.message}
                </p>
              )}
            </div>
          )}
          <div className="mb-4 ">
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
          <div className="mb-4 ">
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
                className="absolute inset-y-0 right-0  pr-3 flex items-center text-gray-500"
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
            <div className="mb-4 ">
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
                  className="absolute inset-y-0 right-0 pr-3  flex items-center text-gray-500"
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

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isLogin ? "Get Login" : "Sign Up Now"}
            </button>
            <button
              type="button"
              onClick={toggleAuthMode}
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              {isLogin ? "Create an account" : "Login with existing account"}
            </button>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="w-full flex items-center justify-center bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {}}
            >
              <FcGoogle className="mr-2 text-2xl" /> Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
