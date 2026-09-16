import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { House, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { useSelector } from "react-redux";
import { auth } from "../../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";

const MobileNav = () => {
  const [user, setUser] = useState(null);
  const cart = useSelector((state) => state.cart.products);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <footer className="fixed bottom-0 z-50 flex w-full justify-between gap-12.5 bg-white px-10.25 py-2.5 shadow-2xl shadow-gray-500 lg:hidden">
      <Link to="/" className="flex flex-col items-center gap-x-2">
        <House size={18} className="text-primary" />
        <span className="text-sm font-medium">Home</span>
      </Link>

      <Link to="/shop" className="flex flex-col items-center gap-x-2">
        <ShoppingBag size={18} className="text-primary" />
        <span className="text-sm font-medium">Shop</span>
      </Link>

      <Link
        to={user ? "/profile" : "/signin"}
        className="flex flex-col items-center gap-x-2"
      >
        {user ? (
          <img
            src={user.photoURL || "/images/default-avatar.png"}
            alt={user.displayName || "Profile"}
            className="size-4.5 rounded-full object-cover"
          />
        ) : (
          <User size={18} className="text-primary" />
        )}
        <span className="max-w-15 truncate text-sm font-medium">
          {user ? user.displayName || "Profile" : "Signin"}
        </span>
      </Link>

      <Link to="/cart" className="relative flex flex-col items-center gap-x-2">
        <ShoppingCart size={18} className="text-primary" />
        <span className="absolute -top-1 -right-2 block size-4 rounded-full bg-[#B9A16B] text-[10px] font-medium text-white">
          {cart.length}
        </span>
        <span className="text-sm font-medium">Cart</span>
      </Link>
    </footer>
  );
};

export default MobileNav;
