import React from "react";
import { Provider } from "react-redux";
import { store } from "./context/store";
import HomePage from "./pages/HomePage";
import "react-loading-skeleton/dist/skeleton.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
};

export default App;
