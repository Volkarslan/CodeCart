import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TOAST_AUTO_CLOSE, TOAST_POSITION } from "../constants/const";

/**
 * Configuration for Toast notifications using react-toastify.
 * Includes global settings like position, auto-close time, and style.
 * @returns {JSX.Element} The ToastContainer component.
 */
const ToastConfig: React.FC = () => {
  return (
    <ToastContainer
      position={TOAST_POSITION}
      autoClose={TOAST_AUTO_CLOSE}
      hideProgressBar={false}
      newestOnTop={true}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      rtl={false}
      closeOnClick
    />
  );
};

export default ToastConfig;
