import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { fetchFakeProducts } from "../../data/fakeData";
import { MAX_PAGES, DEFAULT_CATEGORY } from "../../constants/const";
import { TRANSLATIONS } from "../../constants/translations";
import CategoryFilter from "../List/CategoryFilter";
import ProductList from "../List/ProductList";
import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "../List/SearchBar";
/**
 * Product interface representing individual product details.
 */
interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

/**
 * Main component for displaying a searchable, filterable, infinite scroll product list.
 * @returns {JSX.Element} Searchable and Filterable Product List
 */
const ProductBrowser: React.FC = () => {
  const t = TRANSLATIONS["en"];

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([DEFAULT_CATEGORY]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);

  /**
   * Fetch and load products, updating categories and pagination.
   */
  const loadProducts = useCallback(async () => {
    if (loading || !hasMore || page > MAX_PAGES) return;

    setLoading(true);
    const newProducts = await fetchFakeProducts();

    if (newProducts?.length > 0) {
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

  /**
   * Filter products based on the search term and selected category.
   */
  const filterProducts = useCallback(() => {
    let filtered = allProducts;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== DEFAULT_CATEGORY) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    setDisplayedProducts(filtered);
  }, [allProducts, searchTerm, selectedCategory]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        selectedCategory === DEFAULT_CATEGORY &&
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
    filterProducts();
  }, [filterProducts]);

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

            <div className="mb-5">
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

              {!loading && !hasMore && displayedProducts.length > 0 && (
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

export default ProductBrowser;
