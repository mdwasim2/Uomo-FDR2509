import React, { use, useEffect, useState } from "react";
import Title from "../common/Title";
import treadydata from "../../api/treadydata.json";
import Product from "../common/Product";
import axios from "axios";
const TrendyProducts = () => {
  let [activeCategory, setActiveCategory] = useState("all");
  let [products, setProducts] = useState([]);
  let [filterProducts, setFilterProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        throw new Error("someting went wrong !");
      });
  }, []);

  const handleTabs = (category) => {
    setActiveCategory(category);

    let filterProduct = products.filter((item) => item.category == category);
    setFilterProducts(filterProduct);
  };

  const handleShowAllProducts = () => {
    setShowAllProducts(!showAllProducts);
  };
  return (
    <section className="mt-9.25 lg:mt-23.5 mb-12.5 lg:mb-25">
      <div className="container px-2 ">
        <Title name="OUR TRENDY " namebold="PRODUCTS" />
        <ul className="mt-7.5 mb-10 flex flex-wrap justify-center gap-x-11.5 gap-y-5 lg:gap-13.5">
          {treadydata.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleTabs(item.name)}
                className={`${item.name == activeCategory ? "text-primary" : "text-gray "} text-base font-medium uppercase`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="grid gap-x-3.5 lg:gap-x-0 grid-cols-2 lg:grid-cols-4">
          {filterProducts.length > 0
            ? filterProducts.map((item) => (
                <Product item={item} key={item.id} />
              ))
            : showAllProducts
              ? products.map((item) => <Product item={item} key={item.id} />)
              : products
                  .slice(0, 8)
                  .map((item) => <Product item={item} key={item.id} />)}
        </div>
        <div className="text-center">
          <button
            onClick={handleShowAllProducts}
            className="text-primary after:bg-primary relative mt-5.5 lg:mt-10.5 cursor-pointer text-sm leading-6 font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:duration-500 after:content-[''] hover:after:w-[70%]"
          >
            {showAllProducts ? "SEE LESS PRODUCT" : "SEE ALL PRODUCT"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendyProducts;
