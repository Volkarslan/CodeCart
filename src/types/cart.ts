import { Product } from "./product";

/**
 * Represents an item in the shopping cart.
 */
export interface CartItem extends Product {
  quantity: number;
}

/**
 * State structure for the shopping cart.
 */
export interface CartState {
  items: CartItem[];
}
