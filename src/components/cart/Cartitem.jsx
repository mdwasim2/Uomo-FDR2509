import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeproduct,
} from "../../slices/cartSlice";

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="inline w-4 fill-current"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
      data-original="#000000"
    />
    <path
      d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
      data-original="#000000"
    />
  </svg>
);

const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-2.5 fill-current"
    viewBox="0 0 124 124"
  >
    <path
      d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
      data-original="#000000"
    />
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-2.5 fill-current"
    viewBox="0 0 42 42"
  >
    <path
      d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
      data-original="#000000"
    />
  </svg>
);
function CartItem({ item, isFirst, onRemove, onQuantityChange, onSizeChange }) {
  const dispatch = useDispatch();
  const handleQuantityIncrement = () => {
    dispatch(incrementQuantity(item));
  };
  const handleQuantityDecement = () => {
    dispatch(decrementQuantity(item));
  };

  const handleCartRemove = () => {
    dispatch(removeproduct(item));
  };
  return (
    <li
      className={`grid grid-cols-2 items-start gap-6 py-6 sm:grid-cols-3 sm:gap-4 ${isFirst ? "pt-0" : ""}`}
    >
      <div className="col-span-2 flex items-start gap-4">
        <div className="h-24 w-24 shrink-0 rounded-md bg-gray-100 p-3 sm:h-28 sm:w-28">
          <img
            src={item.image}
            className="h-full w-full object-contain"
            alt={item.title}
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-base font-semibold text-slate-900">
            {item.title}
          </h3>

          {/* Remove button */}
          <button
            type="button"
            onClick={handleCartRemove}
            className="mt-6 flex w-max shrink-0 cursor-pointer items-center gap-2 rounded text-xs font-semibold text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <TrashIcon />
            REMOVE
          </button>
        </div>
      </div>

      <div className="sm:justify-none col-span-full flex flex-row justify-between gap-4 sm:col-span-1 sm:ml-auto sm:flex-col sm:gap-0">
        <p className="text-base font-semibold text-slate-900">${item.price * item.quantity}</p>
        {/* Quantity Selector */}
        <div className="flex items-center rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-900 sm:mt-6">
          <button
            onClick={handleQuantityDecement}
            type="button"
            aria-label="Decrease quantity"

            className="cursor-pointer rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <MinusIcon />
          </button>
          <span className="mx-3">{item.quantity}</span>
          <button
            onClick={handleQuantityIncrement}
            type="button"
            aria-label="Increase quantity"

            className="cursor-pointer rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
