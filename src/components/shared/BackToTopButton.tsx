import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect, useCallback } from "react";

/**
 * Back-to-Top button component for smooth scrolling to the top of the page.
 * Appears when the user scrolls down a certain distance.
 * @returns {JSX.Element | null} The Back-to-Top button.
 */
const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return isVisible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-3 rounded-full shadow-lg duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      aria-label="Back to top"
    >
      <ChevronDoubleUpIcon className="h-6 w-6" />
    </button>
  ) : null;
};

export default BackToTopButton;
