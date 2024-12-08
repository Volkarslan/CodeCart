import React, { useState } from "react";
import ShoppingCart from "../ShoppingCart";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { TRANSLATIONS } from "../../constants/translations";

const t = TRANSLATIONS["en"];

const Header: React.FC = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const projectName = t.project.name;
  const projectDescription = t.project.description;

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const toggleCartVisibility = () => {
    setIsCartVisible((prev) => !prev);
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div
          className="mx-auto flex max-w-7xl items-center justify-between p-4 md:px-8"
          aria-label="Global"
        >
          {/* Left Section: Logo */}
          <div className="hidden md:block flex-1">
            <img
              src="./src/assets/codecart-logo.webp"
              alt="Home Ticket Logo"
              className="inline-block h-10 md:h-16 scale-90 hover:scale-100 transition-transform duration-300 ease-in-out"
            />
          </div>

          {/* Center Section: Project Info */}
          <div className="flex flex-1 md:justify-center md:items-center flex-col">
            <div className="font-semibold leading-6 text-gray-900 md:text-center">
              <span className="text-xl">{projectName}</span>
            </div>
            <div className="italic text-sm text-gray-400 font-normal md:text-center">
              {projectDescription}
            </div>
          </div>

          {/* Right Section: Cart Info */}
          <div className="flex flex-1 justify-end items-center relative">
            <button
              className="text-sm flex text-gray-600 duration-300 hover:text-gray-800 transition"
              onClick={toggleCartVisibility}
            >
              <span className="mr-2"> {t.buttons.cart} </span>
              <ShoppingCartIcon className="h-6 w-6" />

              {/* Ürün Sayısını Gösteren Kırmızı Daire */}
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 translate-x-2 -translate-y-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Shopping Cart Panel */}
      {isCartVisible && (
        <div className="fixed top-24 right-6 w-80 h-2/3 shadow-lg z-50 ">
          <ShoppingCart onClose={toggleCartVisibility} />
        </div>
      )}
    </>
  );
};

export default Header;
