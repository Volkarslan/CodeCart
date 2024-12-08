import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../context/store";
import { removeItem, decrementQuantity, addItem } from "../features/cartSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TRANSLATIONS } from "../constants/translations";
import { getInitials } from "../utils/stringUtils";

/**
 * Shopping cart component for managing and displaying cart items.
 * @param {Function} onClose - Function to close the cart panel.
 * @returns {JSX.Element} The shopping cart component.
 */
const ShoppingCart: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const t = TRANSLATIONS["en"];

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <div className="h-full flex flex-col bg-slate-200 rounded-md border border-slate-400">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">{t.shoppingCart.title}</h2>
        <button
          onClick={onClose}
          className="text-gray-600 duration-300 hover:text-black transition focus:outline-none"
          aria-label={t.buttons.close}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">{t.shoppingCart.empty}</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 object-cover rounded-md"
                />
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-gray-700">
                    {getInitials(item.name)}
                  </span>
                  <span className="text-gray-500 text-sm">${item.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.quantity === 1 ? (
                    <button
                      onClick={() => dispatch(removeItem(item.id))}
                      className="w-6 h-6 bg-gray-200 rounded-full hover:bg-red-500 hover:text-white duration-300 flex items-center justify-center"
                      aria-label={t.shoppingCart.empty}
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  ) : (
                    <button
                      onClick={() => dispatch(decrementQuantity(item.id))}
                      className="w-6 h-6 bg-gray-200 rounded-full hover:bg-gray-300 duration-300 flex items-center justify-center"
                      aria-label={t.toastify.decreased}
                    >
                      -
                    </button>
                  )}

                  <span className="px-2 bg-white rounded-md">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => dispatch(addItem(item))}
                    className="w-6 h-6 bg-gray-200 rounded-full hover:bg-gray-300 duration-300 flex items-center justify-center"
                    aria-label={t.toastify.increased}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="p-4 border-t">
        <h3 className="text-lg font-semibold">
          {t.shoppingCart.total}
          <span className="text-blue-600"> ${totalPrice.toFixed(2)}</span>
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
