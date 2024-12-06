import React from "react";
import Header from "./header";
import Footer from "./footer";
import BackToTopButton from "./BackToTopButton";

interface LayoutProps {
  children: React.ReactNode;
  showCart?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="">
        <div className="flex-1 p-4">{children}</div>
      </main>

      <BackToTopButton />

      <Footer />
    </div>
  );
};

export default Layout;
