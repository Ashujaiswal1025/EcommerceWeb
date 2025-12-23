import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });

   const [showEye, setShowEye] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDetails),
    });

    const data = await user.json();

    console.log(data);

    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login successful");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-6rem)] flex justify-center items-center">
      <div className="w-1/2 bg-white shadow-lg rounded-lg">
        <div className="flex">
          <img
            src="https://www.shutterstock.com/image-photo/sale-offer-black-friday-shopping-600nw-2366915559.jpg"
            alt="log-img"
            width={600}
            height={1200}
            className="rounded-l-lg"
          />
          <div className="w-full h-[35rem] flex flex-col justify-center items-center py-10">
            <h1 className="text-4xl font-semibold text-orange-400 fresca-regular">
              Login your account
            </h1>
            <p className="text-lg text-gray-500 mb-3 cursor-pointer">
              resume your journey with us
            </p>

            <form action="" onSubmit={handleLogin}>
              <div className="w-72 border border-gray-300 rounded-md my-4">
                <input
                  type="email"
                  name="email"
                  value={formDetails.email}
                  placeholder="Enter email address"
                  className="w-full p-2 focus:outline-none rounded"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="xl:w-72 lg:w-64 border border-gray-300 rounded-md mt-4 mb-2 flex items-center px-2">
                <input
                  type={showEye ? "password" : "text"}
                  name="password"
                  placeholder="Enter your password"
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

              <Link className="text-orange-400 font-semibold text-sm text-right mb-3 hover:underline">
                Forget your password?
              </Link>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-semibold py-2 my-5 rounded hover:bg-orange-600 transition-colors"
              >
                Login
              </button>

              <p className=" text-gray-400 font-semibold text-sm text-center mb-3">
                Don't have account{" "}
                <Link
                  to="/signup"
                  className="hover:underline font-bold text-orange-600"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
