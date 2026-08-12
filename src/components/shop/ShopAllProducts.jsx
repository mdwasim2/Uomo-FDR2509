import axios from "axios";
import { useEffect, useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import Product from "../common/Product";
import Paginate from "./Paginate";
const ShopAllProducts = () => {
  let [products, setProducts] = useState([]);
  const [view, setView] = useState(3);
  const [loading, setLoading]=useState(true)
  useEffect(() => {
    axios
      .get("https://dummyjson.com/product?limit=200")
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        throw new Error("someting went wrong !");
      });
  }, []);

  const handleView = (item) => {
    setView(item);
  };


  if(loading){
    return (
      <div className=" grid grid-cols-3 w-full gap-7.5 content-start">
      {Array.from({ length: 12 }, ()=>(
          <div className="mx-auto w-full h-50 max-w-sm rounded-md border border-gray-300 p-4">
          <div className="flex animate-pulse space-x-4">
            <div className="size-10 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 rounded bg-gray-200" />
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-gray-200" />
                  <div className="col-span-1 h-2 rounded bg-gray-200" />
                </div>
                <div className="h-2 rounded bg-gray-200" />
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-gray-200" />
                  <div className="col-span-1 h-2 rounded bg-gray-200" />
                </div>
                <div className="h-2 rounded bg-gray-200" />
              </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-gray-200" />
                  <div className="col-span-1 h-2 rounded bg-gray-200" />
                </div>
              
            </div>
          </div>
        </div>
      ))}
      
      
      </div>
    )
  }



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
      <Paginate itemsPerPage={4}/>
    </div>
  );
};

export default ShopAllProducts;
