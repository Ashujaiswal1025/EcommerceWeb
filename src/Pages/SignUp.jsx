import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../reduxToolkit/authSlice";
import { Eye, EyeOff } from "lucide-react";

function SignUp() {
  // const [value,setValue] = useState('');
  // const [password,setPassword] = useState('');
  const [showEye, setShowEye] = useState(true);
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUP = async (e) => {
    e.preventDefault();
    try {
      //const user = await registerUser(formDetails.email, formDetails.password);

      const user = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDetails),
      });

      const data = await user.json(user);

      dispatch(
        signup({
          name: formDetails.name,
          email: formDetails.email,
        })
      );
      console.log("User Registered:", data);
      alert("Registration successful!");
      navigate("/");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  return (
    <div className="w-full h-[calc(100vh-6rem)] flex justify-center items-center">
      <div className="w-1/2 h-3/4 bg-white shadow-lg rounded-lg">
        <div className="flex h-full">
          <img
            src="https://www.shutterstock.com/image-photo/sale-offer-black-friday-shopping-600nw-2366915559.jpg"
            alt="log-img"
            className=" sm:w-1/3 lg:w-1/2 h-full rounded-l-lg lg:block hidden"
          />
          <div className="w-full h-[35rem] flex flex-col justify-center items-center py-10">
            <h1 className="text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-orange-400 fresca-regular">
              Create your account
            </h1>
            <p className="text-sm xl:text-lg text-gray-500 mb-3 cursor-pointer">
              Let's start journey with us
            </p>

            <form onSubmit={handleSignUP}>
              <div className="xl:w-72 lg:w-64 border border-gray-300 rounded-md my-4">
                <input
                  type="text"
                  placeholder="Enter Username"
                  name="name"
                  value={formDetails.name}
                  onChange={handleChange}
                  className="w-full p-2 focus:outline-none rounded"
                  required
                />
              </div>
              <div className="xl:w-72 lg:w-64 border border-gray-300 rounded-md my-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  name="email"
                  value={formDetails.email}
                  onChange={handleChange}
                  className="w-full p-2 focus:outline-none rounded"
                  required
                />
              </div>
              <div className="xl:w-72 lg:w-64 border border-gray-300 rounded-md mt-4 mb-2 flex items-center px-2">
                <input
                  type={showEye ? "password" : "text"}
                  name="password"
                  placeholder="Create your password"
                  className="w-full p-2 focus:outline-none rounded"
                  value={formDetails.password}
                  onChange={handleChange}
                />

                {formDetails.password &&
                  (showEye ? (
                    <Eye
                      className="text-gray-800 cursor-pointer"
                      onClick={() => setShowEye(false)}
                    />
                  ) : (
                    <EyeOff
                      className="text-gray-800 cursor-pointer"
                      onClick={() => setShowEye(true)}
                    />
                  ))}
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-semibold py-2 mt-5 mb-2 rounded hover:bg-orange-600 transition-colors"
              >
                Sign Up
              </button>

              <p className=" text-gray-400 font-semibold text-sm text-center mb-3">
                already have account?{" "}
                <Link
                  to="/login"
                  className="hover:underline font-bold text-orange-600"
                >
                  login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
