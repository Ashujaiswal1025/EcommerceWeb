import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../reduxToolkit/cartSlice";

export default function ProductDescription() {
  const [selectedImage, setSelectedImage] = useState(0);
  const location = useLocation();
  const product = location.state;
  console.log(product);
  

  const dispatch = useDispatch();

  return (
    <div className="max-w-6xl bg-white mx-auto my-2 px-5 py-10 text-gray-800">
      {/* ===== Product Section ===== */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left - Images */}
        <div>
          <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-2xl">
            {product.images.length > 0 ? (
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="max-h-[350px] object-contain"
              />
            ) : (
              <img
                src={product.image}
                alt={product.title}
                className="max-h-[350px] object-contain"
              />
            )}
          </div>
          {product.images.length > 1 ? (
            <div className="flex gap-3 mt-4 justify-center">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition ${
                    selectedImage === idx
                      ? "border-orange-500"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                />
              ))}
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Right - Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className={
                  i < Math.floor(product.rating)
                    ? "text-orange-400 fill-orange-400"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="text-gray-600 text-sm">{product.rating}</span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-orange-600">
            ${product.price.toLocaleString()}
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Key Features</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              Dimension: {product.dimensions.width} x{" "}
              {product.dimensions.height} x {product.dimensions.depth}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-3">
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
            <button className="border border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-2 rounded-full font-medium transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ===== Reviews Section ===== */}
      <div className="mt-14">
        <h2 className="text-2xl font-semibold mb-5 text-gray-800 border-b-2 border-orange-400 inline-block pb-1">
          Customer Reviews
        </h2>

        {product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((rev, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-800">
                    {rev.reviewerName}
                  </span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < rev.rating
                            ? "text-orange-400 fill-orange-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{rev.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
