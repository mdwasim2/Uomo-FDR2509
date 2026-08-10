import React from "react";
import ShopBanner from "../components/shop/ShopBanner";
import ShopFilter from "../components/shop/ShopFilter";
import ShopAllProducts from "../components/shop/ShopAllProducts";
import ProductSidebar from "../components/shop/ShopFilter";

const ShopPage = () => {
  return (
    <>
      <ShopBanner />
      <div className="container mt-9 flex justify-between gap-15">
        <ProductSidebar />
        <ShopAllProducts />
      </div>
    </>
  );
};

export default ShopPage;
