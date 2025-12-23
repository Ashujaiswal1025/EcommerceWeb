import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCategory } from "../reduxToolkit/categorySlice";

function ProductBanner({ title, products }) {

  
  const navigate = useNavigate();
   const dispatch = useDispatch();

  const handleCategory = (cat)=>{
    console.log(cat);
    dispatch(setCategory(cat));
    navigate(`/product/category/${cat.category}`);
  }

  return (
    <div>
      <div className="py-7 px-3 ">
        <div className="bg-white w-full p-8 shadow-md rounded-lg">
          <h1 className="text-4xl font-semibold mb-10 text-gray-700">{title}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" >
            {products.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 hover:shadow-lg transition duration-300 text-center"
                onClick={()=>handleCategory(item)}
              >
                {/* 🖼️ Image */}
                <div className="w-full h-64 flex items-center justify-center overflow-hidden rounded-md bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* 🏷️ Text */}
                <h2 className="text-lg font-semibold mt-4 text-gray-800">
                  {item.title}
                </h2>
                <p className="text-2xl text-orange-600 font-bold mt-2">
                  {item.des}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductBanner;
