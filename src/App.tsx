import React from "react";
import { Provider } from "react-redux";
import { store } from "./context/store";
import HomePage from "./pages/HomePage";
import "react-loading-skeleton/dist/skeleton.css";
import ToastConfig from "./utils/toastConfig";

/**
 * Main App component that initializes the application.
 * Includes Redux store provider and Toast notifications.
 * @returns {JSX.Element} The App component.
 */
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ToastConfig />
      <HomePage />
    </Provider>
  );
};

export default App;
