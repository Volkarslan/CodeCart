import Layout from "../components/Layout/Layout";
import React from "react";
import SearchableFilterableInfiniteScrollList from "../components/Layout/SearchableFilterableInfiniteScrollList";

/**
 * The main homepage component that wraps the infinite scroll list.
 * @returns {JSX.Element} The homepage layout.
 */
const HomePage: React.FC = () => {
  return (
    <Layout>
      <SearchableFilterableInfiniteScrollList />
    </Layout>
  );
};

export default HomePage;
