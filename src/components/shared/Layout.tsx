import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BackToTopButton from "./BackToTopButton";

interface LayoutProps {
  children: React.ReactNode;
  showCart?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="pt-8">
        <div className="flex-1 p-4">{children}</div>
      </main>

      <BackToTopButton />

      <Footer />
    </div>
  );
};

export default Layout;
