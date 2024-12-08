import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";

/**
 * Configures and returns the Redux store.
 * Allows for easy testing with a setup function.
 */
export const setupStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
