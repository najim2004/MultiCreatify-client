import { useState } from "react";
import { useForm } from "react-hook-form";

const Signup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          
          <p className="text-gray-600">
            A workspace to over 12 Million influencers around the global world.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-2">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-2">
                {errors.password.message}
              </p>
            )}
          </div>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="repeat-password"
                >
                  Repeat Password
                </label>
                <input
                  type="password"
                  id="repeat-password"
                  {...register("repeatPassword", {
                    required: "Please repeat your password",
                    validate: (value) =>
                      value === document.getElementById("password").value ||
                      "Passwords do not match",
                  })}
                  placeholder="Repeat your password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.repeatPassword && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.repeatPassword.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone-number"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone-number"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Invalid phone number",
                    },
                  })}
                  placeholder="Enter your phone number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </>
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
              className="text-blue-500 hover:text-blue-700 text-sm"
              onClick={toggleAuthMode}
            >
              {isLogin ? "Sign Up Now" : "Get Login"}
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-600">Or you can join with</p>
            <div className="flex justify-center mt-2">
              <button className="bg-white p-2 rounded-full shadow-md mx-1">
                <img
                  src="/path/to/google-icon.png"
                  alt="Google"
                  className="w-6"
                />
              </button>
              <button className="bg-white p-2 rounded-full shadow-md mx-1">
                <img
                  src="/path/to/facebook-icon.png"
                  alt="Facebook"
                  className="w-6"
                />
              </button>
              <button className="bg-white p-2 rounded-full shadow-md mx-1">
                <img
                  src="/path/to/twitter-icon.png"
                  alt="Twitter"
                  className="w-6"
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
