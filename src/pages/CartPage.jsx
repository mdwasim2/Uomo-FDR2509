import { useState } from "react";
import CartItem from "../components/cart/Cartitem";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function CartPage() {



   let cartItems = useSelector((state)=> state.cart.products)

    let totalprice = cartItems.reduce((prev, curr)=>{
       return  prev + (curr.price * curr.quantity)
    } , 0)

 
   return (
      <main className="px-4 md:px-8 mt-6">
         <div className="container">
            <div className="mb-12 md:mb-16">
               <h1 className="text-2xl font-bold text-slate-900">
                  Shopping Cart
               </h1>
            </div>

            <div className="grid gap-10 lg:grid-cols-3">
               {/* Cart Items */}
               <ul className="divide-y divide-slate-300 lg:col-span-2">
                  {cartItems.map((item, index) => (
                     <CartItem
                        key={item.id}
                        item={item}
                        isFirst={index === 0}
                  
                     />
                  ))}
               </ul>

               {/* Order Details */}
               <div className="bg-gray-100 border border-slate-200 rounded-md p-6 h-max md:sticky md:top-0">
                  <h2 className="text-xl font-semibold text-slate-900">
                     Order details
                  </h2>

                  <ul className="text-slate-600 font-medium mt-8 space-y-4">
                     <li className="flex flex-wrap gap-4 text-sm">
                        Discount{" "}
                        <span className="ml-auto text-slate-900 font-semibold">
                           $100
                        </span>
                     </li>
                     <li className="flex flex-wrap gap-4 text-sm">
                        Shipping{" "}
                        <span className="ml-auto text-slate-900 font-semibold">
                           $100
                        </span>
                     </li>
                     <li className="flex flex-wrap gap-4 text-sm">
                        Tax{" "}
                        <span className="ml-auto text-slate-900 font-semibold">
                           $100
                        </span>
                     </li>
                     <li className="flex flex-wrap gap-4 text-sm text-slate-900">
                        Total{" "}
                        <span className="ml-auto font-semibold">
                           ${totalprice.toFixed(2)}
                        </span>
                     </li>
                  </ul>

                  <div className="mt-8 space-y-3 text-center">
                     <button
                        type="button"
                        className="w-full px-4 py-2.5 text-white text-sm font-semibold  cursor-pointer  bg-primary"
                     >
                        Checkout
                     </button>
                     <Link
                        to='/shop'
                        className="inline-block text-primary text-sm font-semibold focus:outline-none focus-visible:ring-2 "
                     >
                        Continue Shopping
                     </Link>
                  </div>

                  <hr className="my-6 border-slate-300" />

                  {/* Promo Code Form */}
                  <form className="max-w-sm" >
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
                        
                 
                           className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                        />
                        <button
                           type="submit"
                           className="py-2 px-3.5 text-sm w-max bg-primary rounded-md font-semibold cursor-pointer text-white border "
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