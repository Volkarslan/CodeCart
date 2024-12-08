import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getInitials } from "../utils/stringUtils";
import { TRANSLATIONS } from "../constants/translations";

const t = TRANSLATIONS["en"];

interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      const initials = getInitials(action.payload.name);
      if (existingItem) {
        /* Todo: Can be moved to a separate function */
        if (existingItem.quantity >= 4) {
          toast.warn(t.shoppingCart.maxItemsAlert);
          return;
        }
        existingItem.quantity += 1;
        toast.info(`${t.toastify.increased} ${initials}`);
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        toast.success(`${initials} ${t.toastify.added}`);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemToRemove = state.items.find((item) => item.id === action.payload);
      if (itemToRemove) {
        const initials = getInitials(itemToRemove.name);
        state.items = state.items.filter((item) => item.id !== action.payload);
        toast.warn(`${initials} ${t.toastify.removed}`);
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find((item) => item.id === action.payload);
      if (existingItem) {
        const initials = getInitials(existingItem.name);
        existingItem.quantity -= 1;
        toast.info(` ${t.toastify.decreased}  ${initials}`);
      }
    },
  },
});

export const { addItem, removeItem, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
