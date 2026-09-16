// ShopPage.jsx
import React from "react";
import ShopBanner from "../components/shop/ShopBanner";
import ShopAllProducts from "../components/shop/ShopAllProducts";
import ProductSidebar from "../components/shop/ShopFilter";

const ShopPage = () => {
  return (
    <>
      <ShopBanner />
      <div className="container mt-9 flex flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:justify-between lg:gap-15 lg:px-8">
        <ProductSidebar />
        <ShopAllProducts />
      </div>
    </>
  );
};

export default ShopPage;