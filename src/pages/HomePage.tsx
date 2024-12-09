import Layout from "../components/Layout/Layout";
import React from "react";
import ProductBrowser from "../components/Layout/ProductBrowser";

/**
 * The main homepage component that wraps the infinite scroll list.
 * @returns {JSX.Element} The homepage layout.
 */
const HomePage: React.FC = () => {
  return (
    <Layout>
      <ProductBrowser />
    </Layout>
  );
};

export default HomePage;
