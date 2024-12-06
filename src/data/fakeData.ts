import { faker } from "@faker-js/faker";

export const generateFakeProducts = (count: number) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    image: faker.image.url(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    category: faker.commerce.department(),
  }));
};

export const fetchFakeProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateFakeProducts(12));
    }, 1000); // 1 second delay
  });
};
