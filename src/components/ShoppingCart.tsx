import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../context/store";
import { removeItem, decrementQuantity, addItem } from "../features/cartSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TRANSLATIONS } from "../constants/translations";
import { getInitials } from "../utils/stringUtils";

const t = TRANSLATIONS["en"];

interface ShoppingCartProps {
  onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ onClose }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <div className="h-full flex flex-col bg-slate-200 rounded-md border border-slate-400">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">{t.shoppingCart.title}</h2>
        <button
          onClick={onClose}
          className="text-gray-600 duration-300 hover:text-black transition"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {cartItems.length === 0 ? (
          <p>{t.shoppingCart.empty}</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center gap-2 mb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 object-cover"
                />
                <span className="font-bold text-gray-700">
                  {getInitials(item.name)} {/* Burada kullanıldı */}
                </span>{" "}
                <span>${item.price}</span>
                <div className="flex items-center">
                  {item.quantity === 1 ? (
                    <button
                      onClick={() => dispatch(removeItem(item.id))}
                      className="w-6 h-6 text-sm flex justify-center items-center bg-gray-200  rounded-full hover:bg-red-500 duration-300 hover:text-white"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  ) : (
                    <button
                      onClick={() => dispatch(decrementQuantity(item.id))}
                      className="w-6 h-6 text-sm bg-gray-200 rounded-full duration-300 hover:bg-gray-300"
                    >
                      -
                    </button>
                  )}
                  <span className="px-2 mx-1 bg-white rounded-md">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => dispatch(addItem(item))}
                    className="w-6 h-6 text-sm bg-gray-200 rounded-full duration-300 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <h3 className="text-lg font-semibold">
          {t.shoppingCart.total}{" "}
          <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
        </h3>
        <button
          disabled={cartItems.length === 0}
          className={`mt-4 w-full px-4 py-2 rounded-lg duration-300 ${
            cartItems.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
          onClick={() => alert(t.shoppingCart.proceed)}
        >
          {t.shoppingCart.checkout}
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
