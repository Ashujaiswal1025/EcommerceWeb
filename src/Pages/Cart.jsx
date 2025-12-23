import React, { useMemo } from "react";
import { Trash2, Minus, Plus, CreditCard } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} from "../reduxToolkit/cartSlice";

export default function CartUI() {
  const removeDispatch = useDispatch();
  const clearDispatch = useDispatch();
  const increaseDispatch = useDispatch();
  const decreaseDispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);

  const discount = useMemo(() => {
    return cartItems.reduce(
      (sum, it) =>
        sum +
        (it.discountPercentage
          ? (it.discountPercentage / 100) * it.price * it.quantity
          : 0),
      0
    );
  }, [cartItems]);

  const shipping = totalPrice > 199 || totalPrice === 0 ? 0 : 9.99;
  const total = Math.max(0, totalPrice - discount + shipping);

  const handleCheckout = () => {
    alert(`Proceeding to checkout — total: $${total.toFixed(2)}`);
  };

  return (
    <div className={`p-6 bg-gray-50 flex ${cartItems > 0 ? "items-start" : "min-h-[748px] items-center"} justify-center`}>
      <div className="w-full max-w-6xl">
        <div
          className={` ${
            cartItems.length > 0
              ? "grid grid-cols-1 lg:grid-cols-3 gap-6"
              : "flex justify-center items-center"
          }`}
        >
          {/* Left: Cart items */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
            {cartItems.length === 0 ? (
              <div className=" text-center text-gray-500">
                <p className="text-2xl">Your cart is empty.</p>
                <p className="mt-2">Add items to see them here.</p>
              </div>
            ) : (
              <>
                <div className="w-full space-y-4 xl:h-[500px] xl:overflow-y-auto">
                  {cartItems.map((it) => (
                    <div
                      key={it.id}
                      className="flex gap-4 items-center border rounded-lg p-4 bg-gray-50 "
                    >
                      <img
                        src={it.thumbnail}
                        alt={it.title}
                        className="w-28 h-28 object-cover rounded-md flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-medium text-gray-800 truncate">
                          {it.title}
                        </h2>
                        <div className="text-sm text-gray-500 mt-1">
                          {it.rating.toFixed(1)}⭐{" "}
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 bg-white rounded-lg border px-2 py-1">
                            <button
                              onClick={() =>
                                decreaseDispatch(decreaseQty(it.id))
                              }
                              className="p-1 rounded hover:bg-gray-100"
                            >
                              <Minus size={16} />
                            </button>
                            <div className="w-10 text-center text-sm font-medium">
                              {it.quantity}
                            </div>
                            <button
                              onClick={() =>
                                increaseDispatch(increaseQty(it.id))
                              }
                              className="p-1 rounded hover:bg-gray-100"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-sm text-gray-500">Price</div>
                            <div className="text-lg font-semibold text-gray-800">
                              ${(it.price * it.quantity).toFixed(0)}
                            </div>
                          </div>

                          <button
                            onClick={() => removeDispatch(removeFromCart(it))}
                            className="p-2 rounded-full hover:bg-gray-100"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => clearDispatch(clearCart())}
                  className="mt-6 w-full py-2 rounded-lg bg-white border-2 border-gray-200 text-orange-500 font-semibold hover:shadow-md hover:bg-slate-50"
                >
                  Clear Cart
                </button>
              </>
            )}
          </div>

          {/* Right: Summary */}
          {cartItems.length > 0 && (
            <aside className="bg-white rounded-2xl shadow-sm p-6 h-fit">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Order summary
              </h3>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="border-t pt-3 mt-3 flex justify-between items-center">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-xl font-semibold text-gray-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-md hover:brightness-95"
              >
                <CreditCard size={18} />
                Checkout
              </button>

              <div className="mt-4 text-xs text-gray-500">
                Secure checkout. Payments processed by your payment gateway.
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
