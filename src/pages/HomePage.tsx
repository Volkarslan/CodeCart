import React from "react";
import Layout from "../components/shared/Layout";
import SearchableFilterableInfiniteScrollList from "./SearchableFilterableInfiniteScrollList";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <SearchableFilterableInfiniteScrollList />
    </Layout>
  );
};

export default HomePage;
