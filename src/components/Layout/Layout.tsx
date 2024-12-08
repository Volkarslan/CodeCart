import React from "react";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import BackToTopButton from "../shared/BackToTopButton";

/**
 * Layout component for wrapping pages with header, footer, and main content.
 * Includes a Back-to-Top button for improved user experience.
 * @param {React.ReactNode} children - The content to render inside the layout.
 * @returns {JSX.Element} The layout structure.
 */
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-8 px-4">{children}</main>

      <BackToTopButton />

      <Footer />
    </div>
  );
};

export default Layout;
