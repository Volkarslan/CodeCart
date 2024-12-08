import React from "react";
import { TRANSLATIONS } from "../constants/translations";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const t = TRANSLATIONS["en"];

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-4 relative">
      <label
        htmlFor="search"
        className="absolute top-2.5 left-2.5 cursor-pointer"
      >
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
      </label>
      <input
        id="search"
        type="text"
        placeholder={t.search.placeholder}
        className="w-full py-2 border rounded-lg pl-10 pr-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
