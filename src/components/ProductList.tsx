import React from "react";
import ProductCard from "./ProductCard";

/**
 * Props for the ProductList component.
 */
interface ProductListProps {
  products: {
    id: string;
    name: string;
    price: string;
    image: string;
    category: string;
  }[];
}

/**
 * Displays a grid of products using the ProductCard component.
 * @param {ProductListProps} props - List of products to display.
 * @returns {JSX.Element} Product list grid.
 */
const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          category={product.category}
        />
      ))}
    </div>
  );
};

export default ProductList;
