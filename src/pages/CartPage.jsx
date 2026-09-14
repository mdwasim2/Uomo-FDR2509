import { useEffect, useState } from "react";
import CartItem from "../components/cart/Cartitem";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

export default function CartPage() {
  const navigate = useNavigate();

  let cartItems = useSelector((state) => state.cart.products);

  let totalprice = cartItems.reduce((prev, curr) => {
    return prev + curr.price * curr.quantity;
  }, 0);

  if (cartItems.length == 0) {
    return <h2>no product in cart page</h2>;
  }

  return (
    <main className="mt-6 px-4 md:px-8">
      <div className="container">
        <div className="mb-12 md:mb-16">
          <h1 className="text-2xl font-bold text-slate-900">Shopping Cart</h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Cart Items */}
          <ul className="divide-y divide-slate-300 lg:col-span-2">
            {cartItems.map((item, index) => (
              <CartItem key={item.id} item={item} isFirst={index === 0} />
            ))}
          </ul>

          {/* Order Details */}
          <div className="h-max rounded-md border border-slate-200 bg-gray-100 p-6 md:sticky md:top-0">
            <h2 className="text-xl font-semibold text-slate-900">
              Order details
            </h2>

            <ul className="mt-8 space-y-4 font-medium text-slate-600">
              <li className="flex flex-wrap gap-4 text-sm text-slate-900">
                Total{" "}
                <span className="ml-auto font-semibold">
                  ${totalprice.toFixed(2)}
                </span>
              </li>
            </ul>

            <div className="mt-8 space-y-3 text-center">
              <button
                onClick={() => {
                  navigate("/checkout");
                }}
                type="button"
                className="bg-primary w-full cursor-pointer px-4 py-2.5 text-sm font-semibold text-white"
              >
                Checkout
              </button>
              <Link
                to="/shop"
                className="text-primary inline-block text-sm font-semibold focus:outline-none focus-visible:ring-2"
              >
                Continue Shopping
              </Link>
            </div>

            <hr className="my-6 border-slate-300" />

            {/* Promo Code Form */}
            <form className="max-w-sm">
              <label
                htmlFor="promocode"
                className="mb-2 block text-sm font-medium text-slate-900"
              >
                Do you have a promo code?
              </label>
              <div className="flex flex-col gap-4 sm:flex-row">
                <input
                  type="text"
                  id="promocode"
                  name="promocode"
                  required
                  placeholder="Enter promo code"
                  autoComplete="postal-code"

                  className="w-full rounded-md bg-white px-3 py-2.5 text-sm text-slate-900 outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                />
                <button
                  type="submit"
                  className="bg-primary w-max cursor-pointer rounded-md border px-3.5 py-2 text-sm font-semibold text-white"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
