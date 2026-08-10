import React, { useEffect, useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import axios from "axios";
import Product from "../common/Product";

const ShopAllProducts = () => {
  let [products, setProducts] = useState([]);
  const [view, setView] = useState(3);
  useEffect(() => {
    axios
      .get("https://dummyjson.com/product?limit=200")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        throw new Error("someting went wrong !");
      });
  }, []);

  const handleView = (item) => {
    setView(item);
  };
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <Breadcrumb />
        {/* select dropdown */}

        <select
          id="countries"
          class="bg-neutral-secondary-medium text-heading rounded-base focus:ring-brand focus:border-brand placeholder:text-body text-primary block w-35 border-b-2 pr-3 text-sm font-medium shadow-xs"
        >
          <option selected>DEFAULT SORTING</option>
          <option value="US">Low to High</option>
          <option value="CA">High to Low</option>
        </select>
        <div className="ml-15 border-l-4 border-[#E4E4E4] pl-15">
          <ul className="text-primary flex gap-2.75 text-sm font-medium">
            <li>VIEW</li>
            <li className="cursor-pointer" onClick={() => handleView(2)}>
              2
            </li>
            <li className="cursor-pointer" onClick={() => handleView(3)}>
              3
            </li>
            <li className="cursor-pointer" onClick={() => handleView(4)}>
              4
            </li>
          </ul>
        </div>

        {/* select dropdown */}
      </div>
      {/* show all products */}
      <div className={`grid grid-cols-${view} justify-between gap-8`}>
        {products.map((item) => (
          <Product item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default ShopAllProducts;
