import React, { useEffect, useState } from "react";
import Title from "../common/Title";
import treadydata from "../../api/treadydata.json";
import Product from "../common/Product";
import axios from "axios";
const TrendyProducts = () => {
  let [activeCategory, setActiveCategory] = useState("all");
  let [products, setProducts] = useState([]);
  let [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        throw new Error("someting went wrong !");
      });
  });

  const handleTabs = (category) => {
    setActiveCategory(category);

    let filterProduct = products.filter((item) => item.category == category);
    setFilterProducts(filterProduct);
  };

  return (
    <section className="mt-23.5">
      <div className="container">
        <Title name="OUR TRENDY " namebold="PRODUCTS" />
        <ul className="mt-7.5 mb-10 flex justify-center gap-13.5">
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
        <div className="grid grid-cols-4">
          {filterProducts.length > 0
            ? filterProducts.map((item) => (
                <Product item={item} key={item.id} />
              ))
            : products.map((item) => <Product item={item} key={item.id} />)}
        </div>
      </div>
    </section>
  );
};

export default TrendyProducts;
