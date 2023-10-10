import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios"

function Login() {
  const navigate=useNavigate()
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    // confirmPassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validationfunc()) {
      try {
        const { username, email, password, confirmPassword } = values;
        console.log("object");
        const { data } = await axios.post(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/login`,
          {username:username,
          email:email,
          password:password,
          // confirmPassword:confirmPassword,
          }
        );

        console.log(data);
        if (data.success) {
          setTimeout(() => {
            toast.success(data.message);
          }, 1000);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("something went wrong");
      }
    }
  };

  const validationfunc = () => {
    const { username, password, confirmPassword } = values;
    if (username.length < 4) {
      toast.error("username should be 4 character long");
      return false;
    }
    if (password.length < 6) {
      toast.error("password should 6 character long");
      return false;
    }
    // if (password !== confirmPassword) {
    //   toast.error("password not match");
    //   return false;
    // }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="flex justify-center min-h-screen bg-gray-100">
        <div className="container sm:mt-40 mt-16 my-auto max-w-md border-2 border-gray-200 p-3 bg-white">
          {/* header */}
          <div className="text-center my-6">
            <h1 className="text-3xl font-semibold text-gray-700">Sign In</h1>
            {/* <p className="text-gray-500">Sign up to create your account</p> */}
          </div>
          {/* sign-in */}
          <div className="m-6">
            <form className="mb-4" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  User Name
                </label>
                <input
                  required
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="username"
                  placeholder="Your user name"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Email Address
                </label>
                <input
                  required
                  onChange={(e) => handleChange(e)}
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Password
                  </label>
                </div>
                <input
                  required
                  onChange={(e) => handleChange(e)}
                  type="password"
                  name="password"
                  placeholder="Your password"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              {/* <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Confirm Password
                  </label>
                </div>
                <input
                  required
                  onChange={(e) => handleChange(e)}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div> */}
              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out"
                >
                  Login
                </button>
              </div>
              <p className="text-sm text-center text-gray-400">
                Don't have account?.
                <Link
                  to="/login"
                  className="font-semibold text-indigo-500 focus:text-indigo-600 focus:outline-none focus:underline"
                >
                  Sign Up
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
