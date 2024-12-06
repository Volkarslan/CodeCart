import React from "react";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    category: string;
  }[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          image={product.image}
          category={product.category}
        />
      ))}
    </div>
  );
};

export default ProductList;
