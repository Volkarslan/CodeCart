import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cartSlice";
import { PlusCircleIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

interface ProductProps {
  id: string;
  name: string;
  price: string;
  image: string;
  category?: string;
}

const ProductCard: React.FC<ProductProps> = ({
  id,
  name,
  price,
  image,
  category,
}) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="p-4 border rounded-lg">
      {!loaded && <Skeleton height={208} />}

      <img
        src={image}
        alt={name}
        className={`h-52 w-full object-cover ${loaded ? "block" : "hidden"}`}
        onLoad={() => setLoaded(true)}
      />

      <div className="flex justify-between items-center gap-2 px-5 sm:px-0">
        <div>
          <h2 className="text-md font-bold mt-2">{name}</h2>
          <p className="text-gray-600 italic">{category}*</p>
          <p className="text-blue-600 font-semibold">${price}</p>
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
          className="mt-2 p-2 bg-blue-500 text-white rounded float-end flex items-center justify-center gap-1 hover:bg-blue-700 duration-300"
        >
          <ShoppingCartIcon className="h-5 w-5" />
          <PlusCircleIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
