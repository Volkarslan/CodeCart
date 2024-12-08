import { faker } from "@faker-js/faker";
import { ITEMS_PER_PAGE } from "../constants/const";

export interface Product {
  id: string;
  image: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

export const generateFakeProducts = (count: number): Product[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    image: faker.image.url(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    category: faker.commerce.department(),
  }));
};

export const fetchFakeProducts = async (count: number = ITEMS_PER_PAGE): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateFakeProducts(count));
    }, 1000); // 1 second delay
  });
};
