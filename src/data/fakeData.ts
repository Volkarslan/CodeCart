import { faker } from "@faker-js/faker";
import { ITEMS_PER_PAGE } from "../constants/const";
import { Product } from "./../types/product";

/**
 * Generates an array of fake products.
 * @param {number} count - The number of products to generate.
 * @returns {Product[]} An array of fake product objects.
 */
export const generateFakeProducts = (count: number): Product[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    image: faker.image.url(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    category: faker.commerce.department(),
  }));
};

/**
 * Simulates fetching fake products with a delay.
 * @param {number} count - The number of products to fetch (default: ITEMS_PER_PAGE).
 * @returns {Promise<Product[]>} A promise resolving to an array of fake products.
 */
export const fetchFakeProducts = async (count: number = ITEMS_PER_PAGE): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateFakeProducts(count));
    }, 1000); // 1 second delay
  });
};
