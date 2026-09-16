import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import Product from "../common/Product";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic-light-dark.css";

// Fixed, Tailwind-safelist-friendly column classes per "view" mode.
// Mobile always starts at 1 column and scales up from there.
const GRID_COLS = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

const ShopAllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [view, setView] = useState(3);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/product?limit=100")
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
        setTotalPages(Math.ceil(res.data.products.length / 9));
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleView = (item) => setView(item);

  const sortedProducts = useMemo(() => {
    if (sortOrder === "asc") {
      return [...products].sort((a, b) => a.price - b.price);
    }
    if (sortOrder === "desc") {
      return [...products].sort((a, b) => b.price - a.price);
    }
    return products;
  }, [products, sortOrder]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="grid w-full grid-cols-1 content-start gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="mx-auto h-50 w-full max-w-sm rounded-md border border-gray-300 p-4"
          >
            <div className="flex animate-pulse space-x-4">
              <div className="size-10 shrink-0 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 rounded bg-gray-200" />
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 h-2 rounded bg-gray-200" />
                    <div className="col-span-1 h-2 rounded bg-gray-200" />
                  </div>
                  <div className="h-2 rounded bg-gray-200" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Toolbar: stacks on mobile, row on larger screens */}
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <Breadcrumb />

        <select
          id="countries"
          value={sortOrder}
          onChange={handleSortChange}
          className="bg-neutral-secondary-medium text-heading rounded-base focus:ring-brand focus:border-brand placeholder:text-body text-primary w-full border-b-2 pr-3 text-sm font-medium shadow-xs sm:w-auto sm:min-w-35"
        >
          <option value="default">DEFAULT SORTING</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>

        <div className="border-t-4 border-[#E4E4E4] pt-4 sm:border-t-0 sm:border-l-4 sm:pt-0 sm:pl-6 lg:pl-15">
          <ul className="text-primary flex items-center gap-2.75 text-sm font-medium">
            <li>VIEW</li>
            <li
              className={`cursor-pointer ${view === 2 ? "font-bold underline underline-offset-4" : ""}`}
              onClick={() => handleView(2)}
            >
              2
            </li>
            <li
              className={`hidden cursor-pointer sm:inline ${view === 3 ? "font-bold underline underline-offset-4" : ""}`}
              onClick={() => handleView(3)}
            >
              3
            </li>
            <li
              className={`hidden cursor-pointer lg:inline ${view === 4 ? "font-bold underline underline-offset-4" : ""}`}
              onClick={() => handleView(4)}
            >
              4
            </li>
          </ul>
        </div>
      </div>

      <div className={`mt-6 grid gap-6 lg:mt-9 lg:gap-7.5 ${GRID_COLS[view]}`}>
        {sortedProducts.slice((currentPage - 1) * 9, currentPage * 9).map((item) => (
          <Product key={item.id} item={item} view={view} />
        ))}
      </div>

      <div className="mt-8 overflow-x-auto">
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
          containerClassName="flex justify-center gap-1 flex-wrap"
          pageItemClassName="inline-flex items-center border border-red-500 text-sm"
          activeItemClassName="border-blue-800 bg-teal-500 text-white shadow-sm"
          inactiveItemClassName="border-slate-600 text-slate-400 shadow-sm hover:bg-blue-800 hover:text-white hover:shadow-lg"
          disabledItemClassName="pointer-events-none border-slate-600 text-slate-400 opacity-50"
          pageLinkClassName="px-3 py-2"
        />
      </div>
    </div>
  );
};

export default ShopAllProducts;