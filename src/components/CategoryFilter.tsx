import React from "react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="mb-4 flex flex-col gap-2 flex-wrap px-4">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 border rounded-lg ${
            selectedCategory === category
              ? "bg-blue-500 duration-300 text-white"
              : "bg-gray-200 duration-300 hover:outline hover:outline-1 text-gray-700"
          }`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
