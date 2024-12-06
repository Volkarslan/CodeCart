import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cartSlice";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category?: string;
}

const ProductCard: React.FC<ProductProps> = ({
  id,
  name,
  description,
  price,
  image,
  category,
}) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="p-4 border rounded-lg flex flex-col justify-between">
      <div>
        {!loaded && <Skeleton height={208} />}
        <img
          src={image}
          alt={name}
          className={`h-52 w-full object-cover ${loaded ? "block" : "hidden"}`}
          onLoad={() => setLoaded(true)}
        />
        <h2 className="text-lg font-bold mt-2">{name}</h2>
        <p className="text-gray-600">{description}</p>
        <p className="text-gray-600">Category: {category}</p>
        <p className="text-blue-600 font-semibold float-end">${price}</p>
      </div>

      <button
        onClick={() =>
          dispatch(
            addItem({
              id,
              name,
              price,
              image,
              quantity: 1,
            })
          )
        }
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded float-end flex items-center justify-center gap-2"
      >
        Add to Cart
        <PlusCircleIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ProductCard;
