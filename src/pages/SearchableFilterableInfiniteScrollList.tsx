import React, { useState, useEffect, useCallback } from "react";
import { fetchFakeProducts } from "../data/fakeData";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductList from "../components/ProductList";

const MAX_PAGES = 8;

const SearchableFilterableInfiniteScrollList: React.FC = () => {
  interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    category: string;
  }

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadProducts = useCallback(async () => {
    if (loading || !hasMore || page > MAX_PAGES) return;

    setLoading(true);
    const newProducts = await fetchFakeProducts();
    if (newProducts.length > 0) {
      setAllProducts((prev) => [...prev, ...newProducts]);
      setDisplayedProducts((prev) => [...prev, ...newProducts]);

      const newCategories = Array.from(
        new Set([...categories, ...newProducts.map((p) => p.category)])
      );
      setCategories(["All", ...newCategories.filter((cat) => cat !== "All")]);
    } else {
      setHasMore(false);
    }
    setLoading(false);
    setPage((prev) => prev + 1);
  }, [loading, hasMore, page, categories]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 120
      ) {
        loadProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadProducts]);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = allProducts;

    if (searchTerm !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    setDisplayedProducts(filtered);
  }, [searchTerm, selectedCategory, allProducts]);

  return (
    <div className="flex">
      <div className="w-1/5">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      <div className="w-4/5">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div>
          <ProductList products={displayedProducts} />

          {loading && (
            <p className="text-center col-span-3 text-gray-500">Loading...</p>
          )}

          {!hasMore && !loading && (
            <p className="text-center col-span-3 text-gray-500">
              No more products to load.
            </p>
          )}

          {!loading && displayedProducts.length === 0 && (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchableFilterableInfiniteScrollList;
