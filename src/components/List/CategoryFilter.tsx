import { TRANSLATIONS } from "../../constants/translations";
import React from "react";

const t = TRANSLATIONS["en"];

/**
 * Props for the CategoryFilter component.
 */
interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

/**
 * Renders a list of category buttons for filtering products.
 * @param {CategoryFilterProps} props - Categories, selected category, and setter function.
 * @returns {JSX.Element} Category filter component.
 */
const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="mb-4 flex flex-row md:flex-col gap-2 flex-wrap px-4">
      <div className="w-full">
        <h2 className="text-xl font-bold text-gray-800 pb-2.5 pl-2 pt-1 mb-2.5 relative mx-2">
          {t.categoryFilter.title}
          <span className="absolute bottom-0 left-0 w-52 md:w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></span>
        </h2>
      </div>

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
