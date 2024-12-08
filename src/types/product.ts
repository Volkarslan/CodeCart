/**
 * Represents a product in the application.
 */
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: string;
  image: string;
  category: string;
}
