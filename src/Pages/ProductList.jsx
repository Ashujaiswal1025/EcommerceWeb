import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Heart } from "lucide-react";
import { addToCart } from "../reduxToolkit/cartSlice";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const categoryState = useSelector((state) => state.category.item);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  console.log(categoryState);

  useEffect(() => {
    if (categoryState.category === "electronics") {
      fetch(
        `https://fakestoreapi.com/products/category/${categoryState.category}`
      )
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
          console.log(data);
        })
        .catch((err) => console.error(err));
    } else {
      fetch(`https://dummyjson.com/products/category/${categoryState.category}`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data.products);
          console.log(data);
        })
        .catch((err) => console.error(err));
    }
    console.log(products);
  }, [categoryState]);

  const goCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        🛍️ Product Collection of {categoryState.title}
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto">
        {products.map((item) => (
          <div
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 p-4 cursor-pointer group relative"
            key={item.id}
            onClick={() => navigate(`/product/${item.title}`, { state: item })}
          >
            {/* Product Image */}
            <div className="w-full h-64 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
              <img
                src={categoryState.category === 'electronics' ? item.image : item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Wishlist Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // onWishlist?.(product);
                }}
                className="absolute top-3 right-3 p-2 rounded-full bg-white hover:bg-orange-100 text-orange-500 shadow-sm"
              >
                <Heart size={18} />
              </button>
            </div>

            {/* Product Info */}
            <div className="mt-4">
              <h3 className="text-gray-800 text-lg font-semibold line-clamp-1 hover:text-orange-500">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2 mt-1">
                {item.description}
              </p>

              <div className="flex justify-between items-center mt-4">
                <div>
                  <span className="text-lg font-bold text-orange-600">
                    ${item.price}
                  </span>
                  {item.oldPrice && (
                    <span className="text-sm text-gray-400 line-through ml-2">
                      ${item.price - item.discountPercentage * item.price}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => goCart(item)}
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-3 rounded-lg transition"
                >
                  <ShoppingCart size={18} />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
