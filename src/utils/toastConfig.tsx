import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastConfig: React.FC = () => {
  return (
    <ToastContainer
      position="top-left"
      autoClose={2000}
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
