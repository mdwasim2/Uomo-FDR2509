import React from "react";
import Banner from "../components/home/Banner";
import Category from "../components/home/Category";
import TrendyProducts from "../components/home/TrendyProducts";
import SpringCollection from "../components/home/SpringCollection";
import Starting from "../components/home/Starting";

const HomePage = () => {
  return (
    <>
      <Banner />
      <Category />
      <TrendyProducts />
      <SpringCollection />
      <Starting />
    </>
  );
};

export default HomePage;
