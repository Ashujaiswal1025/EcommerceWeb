import React, { useEffect } from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchProduct from "./SearchProduct";

function Header() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const navlinks = ["Men", "Women", "Kid", "Accesories"];
  const navigate = useNavigate();
  const cartNum = useSelector((state) => state.cart.cartItems);
  const authDetail = useSelector((state) => state.auth.user);

  console.log(authDetail);

  const location = useLocation();

  const hideProfile = ["/login", "/signup"].includes(location.pathname);

  const dropdowns = {
    Men: ["T-Shirts", "Shirts", "Jeans", "Jackets", "Shoes"],
    Women: ["Tops", "Dresses", "Jeans", "Sarees", "Footwear"],
    Kid: ["Boys Wear", "Girls Wear", "Toys", "Shoes"],
    Accesories: ["SmartPhones", "Laptop", "Electronics"],
  };

  const handleClickCart = () => {
    navigate("./cart");
  };

  const handleClick = (path) => {
    setVisible(false);
    navigate(path);
  };
  return (
    <div>
      <header className="w-full fixed bg-white h-20 flex md:justify-center items-center backdrop-blur-md shadow-md z-10">
        <nav className="flex lg:justify-around gap-6 items-center w-3/4">
          <div className="lg:hidden block mr-2 lg:mr-7">
            <button onClick={() => setVisible(!visible)}>
              <div className="space-y-1">
                <span className="block w-5 h-0.5 bg-gray-700"></span>
                <span className="block w-5 h-0.5 bg-gray-700"></span>
                <span className="block w-5 h-0.5 bg-gray-700"></span>
              </div>
            </button>
          </div>
          <h1 className="text-4xl font-bold text-orange-500 fanwood-text-regular-italic">
            <Link to="/" className="text-4xl font-extrabold">
              UrbanCart
            </Link>
          </h1>
          <ul className="hidden lg:flex lg:justify-center lg:items-center space-x-6">
            {navlinks.map((item, index) => (
              <li
                key={index}
                className="relative p-2 text-lg hover:text-orange-600 cursor-pointer"
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(null)}
              >
                {item}
                {/* Dropdown Menu */}
                {hovered === item && (
                  <ul className="absolute left-5 top-10 bg-white border rounded-md shadow-lg p-2 w-40 z-50">
                    {dropdowns[item].map((sub, i) => (
                      <li
                        key={i}
                        className="p-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          navigate(`/category/${sub.toLowerCase()}`);
                          setHovered(null);
                        }}
                      >
                        {sub}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}

            <div className="border border-gray-300 rounded-md flex items-center px-2 ">
              <CiSearch className="w-6 h-6 text-gray-700 cursor-pointer" />
              <SearchProduct />
            </div>
          </ul>
          <div className="lg:block relative hidden">
            <div className="flex items-center space-x-6 ">
              <IoIosCart
                className="w-8 h-8 text-gray-700 hover:text-orange-500 cursor-pointer"
                onClick={handleClickCart}
              />
              {cartNum.length > 0 ? (
                <div className="w-5 h-5 rounded-full flex justify-center items-center text-sm -top-2 bg-orange-500 absolute text-white">
                  {cartNum.length}
                </div>
              ) : (
                ""
              )}
              {!hideProfile && (
                <FaUser
                  onClick={() => setVisible(!visible)}
                  className={`w-6 h-6 text-gray-700 hover:text-orange-500 cursor-pointer transition-transform duration-200 ${
                    visible ? "scale-110" : ""
                  }`}
                />
              )}
            </div>
          </div>
          <div className="lg:hidden absolute right-5">
            <button
              className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-gray-200"
              onClick={() => setShowSearch(!showSearch)}
            >
              <CiSearch className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          {showSearch && (
            <div className="absolute top-24 left-1/4">
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-gray-200">
                <CiSearch className="w-6 h-6 text-gray-600" />
                <SearchProduct />
              </div>
            </div>
          )}
          {visible && (
            <div className="w-80 flex flex-col items-baseline p-4 absolute top-16 right-10 bg-[#fbf6dd] rounded-md shadow-md border border-gray-200 z-50">
              {authDetail === null ? (
                <>
                  <p className="text-sm text-gray-600">Welcome,</p>
                  <div className="w-full flex justify-between items-center mt-2">
                    <h1 className="font-semibold text-gray-700 text-sm">
                      New Customer!
                    </h1>
                    <button
                      className="py-1 px-2 text-white text-xs bg-orange-400 rounded hover:bg-orange-500 transition-colors"
                      onClick={() => handleClick("/signup")}
                    >
                      Sign Up
                    </button>
                  </div>
                  <div className="border-t border-gray-300 my-3 w-full"></div>

                  <div className="flex justify-center w-full">
                    <button
                      className="py-1 px-5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                      onClick={() => handleClick("/login")}
                    >
                      Login
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h1>Welcome, {authDetail.name.toUpperCase()}</h1>
                  <div className="border-t border-gray-300 my-3 w-full"></div>

                  <div className="flex justify-center w-full">
                    <button
                      className="py-1 px-5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                      onClick={() => handleClick("/login")}
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
          {visible && (
            <div className="md:hidden absolute top-16 left-0 w-64 h-screen bg-white shadow-xl p-5 z-50">
              <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>

              {navlinks.map((cat, i) => (
                <div
                  key={i}
                  className="py-2 border-b text-gray-700 hover:text-orange-500 cursor-pointer"
                  onClick={() => navigate(`/category/${cat.toLowerCase()}`)}
                >
                  {cat}
                </div>
              ))}

              <div
                className="py-3 flex items-center gap-2 border-b cursor-pointer"
                onClick={handleClickCart}
              >
                <IoIosCart className="text-xl" /> Cart ({cartNum.length})
              </div>

              {!hideProfile && (
                <>
                  <button
                    onClick={() => handleClick("/login")}
                    className="w-full mt-5 py-2 bg-gray-200 rounded-md"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleClick("/signup")}
                    className="w-full mt-3 py-2 bg-orange-500 text-white rounded-md"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Header;
