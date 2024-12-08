import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white p-3 rounded-full shadow-lg duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 min-w-12"
        >
          <ChevronDoubleUpIcon className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
