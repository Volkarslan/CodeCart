import { RootState } from "../../context/store";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { TRANSLATIONS } from "../../constants/translations";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import ShoppingCart from "./ShoppingCart";

/**
 * Header component that displays project info and shopping cart toggle.
 * @returns {JSX.Element} Header component.
 */
const Header: React.FC = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const t = TRANSLATIONS["en"];
  const projectName = t.project.name;
  const projectDescription = t.project.description;

  const totalItems = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
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
          <div className="hidden md:block flex-1">
            <img
              src="/assets/codecart-logo.webp"
              alt={t.project.name}
              className="inline-block h-10 md:h-16 scale-90 hover:scale-100 transition-transform duration-300 ease-in-out"
            />
          </div>

          <div className="flex flex-1 md:justify-center md:items-center flex-col">
            <div className="font-semibold leading-6 text-gray-900 md:text-center">
              <span className="text-xl">{projectName}</span>
            </div>
            <div className="italic text-sm text-gray-400 font-normal md:text-center">
              {projectDescription}
            </div>
          </div>

          <div className="flex flex-1 justify-end items-center relative ">
            <button
              className="text-sm flex text-gray-600 duration-300 hover:text-gray-800 transition"
              onClick={toggleCartVisibility}
            >
              <span className="mr-2">{t.buttons.cart}</span>
              <ShoppingCartIcon className="h-6 w-6" />

              {totalItems > 0 && (
                <span className="absolute top-0 right-0 translate-x-2 -translate-y-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {isCartVisible && (
              <div className="absolute top-10 right-0 w-80 h-[66vh] shadow-lg z-50 bg-white ">
                <ShoppingCart onClose={toggleCartVisibility} />
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
