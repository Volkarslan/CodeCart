import React, { useState, useEffect, useCallback } from "react";
import { fetchFakeProducts } from "../data/fakeData";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductList from "../components/ProductList";
import { MAX_PAGES, DEFAULT_CATEGORY } from "../constants/const";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { TRANSLATIONS } from "../constants/translations";

const t = TRANSLATIONS["en"];

const SearchableFilterableInfiniteScrollList: React.FC = () => {
  interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
    category: string;
  }

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([DEFAULT_CATEGORY]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);

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
      setCategories([
        DEFAULT_CATEGORY,
        ...newCategories.filter((cat) => cat !== DEFAULT_CATEGORY),
      ]);

      if (page === MAX_PAGES) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }

    setLoading(false);
    setIsInitialLoading(false);
    setPage((prev) => prev + 1);
  }, [loading, hasMore, page, categories]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        selectedCategory === "All" &&
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
  }, [loadProducts, selectedCategory]);

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
    <div className="flex flex-col md:flex-row max-w-screen-2xl mx-auto">
      {isInitialLoading ? (
        <div className="flex items-center justify-center h-screen w-screen">
          <p className="text-gray-500 italic mt-4">{t.list.loading}</p>
        </div>
      ) : (
        <>
          <div className="md:w-1/5">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

          <div className="md:w-4/5 min-h-screen">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div>
              <ProductList products={displayedProducts} />

              {loading && (
                <p className="text-center col-span-3 text-gray-500 mt-4">
                  <ArrowPathIcon className="animate-spin h-10 w-10 inline text-blue-500" />
                </p>
              )}

              {!loading && displayedProducts.length === 0 && (
                <p className="text-center text-gray-500 italic mt-4">
                  {t.list.notFound}
                </p>
              )}

              {!loading &&
                hasMore === false &&
                displayedProducts.length > 0 && (
                  <p className="text-center col-span-3 mt-4 italic text-gray-500">
                    {t.list.noMore}
                  </p>
                )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchableFilterableInfiniteScrollList;
