

import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { ref, push, set } from "firebase/database";
import { db } from "../../firebase.config";
import { auth } from "../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { clearcart } from "../slices/cartSlice";

const DHAKA_DELIVERY_CHARGE = 60;
const OUTSIDE_DHAKA_DELIVERY_CHARGE = 120;

const Checkout = () => {
    const [user, setUser]=useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.products || []);
  const [divisions, setDivisions] = useState([]);

     useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
  
      return () => unsubscribe();
    }, []);

  useEffect(() => {
    axios
      .get("https://bdapis.pro.bd/geo/v2.0/divisions")
      .then((res) => {
        setDivisions(res.data?.data || []);
      })
      .catch(() => {
        setDivisions([]);
      });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    division: "",
  });

  const [loading, setLoading] = useState(false);

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return (
        total +
        Number(item.price || 0) * Number(item.quantity || 1)
      );
    }, 0);
  }, [cartItems]);

  const deliveryCharge = useMemo(() => {
    if (!formData.division) return 0;
    return formData.division === "Dhaka"
      ? DHAKA_DELIVERY_CHARGE
      : OUTSIDE_DHAKA_DELIVERY_CHARGE;
  }, [formData.division]);

  const totalPrice = subtotal + deliveryCharge;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate user information
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim()
    ) {
      toast.error("Please fill in all the fields");
      return;
    }

    // Validate delivery division
    if (!formData.division) {
      toast.error("Please select your delivery division");
      return;
    }

    // Validate cart
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      // Generate a new order reference
      const orderRef = push(ref(db, "orders"));

      const orderData = {
        userId: user?.uid,
        customer: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          division: formData.division,
          userid: user?.uid,
        },

        products: cartItems.map((item) => ({
          id: item.id,
          title: item.title,
          image: item.image,
          price: Number(item.price || 0),
          quantity: Number(item.quantity || 1),
        })),

        paymentMethod: "Cash on Delivery",

        subtotal: Number(subtotal.toFixed(2)),
        deliveryCharge,
        total: Number(totalPrice.toFixed(2)),

        status: "pending",

        createdAt: new Date().toISOString(),
      };

      // Save order to Firebase Realtime Database
      await set(orderRef, orderData);

      console.log("Order saved:", {
        orderId: orderRef.key,
        ...orderData,
      });

      toast.success("Order placed successfully!");

      // Empty the cart now that the order has been placed
      dispatch(clearcart());

      // Reset form
      setFormData({
        name: "",
        phone: "",
        address: "",
        division: "",
      });

      navigate("/profile");
    } catch (error) {
      console.error("Firebase order error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-5 py-10 md:px-10 lg:px-20">
      <Toaster position="top-center" reverseOrder={true} />

      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h1 className="text-2xl font-normal text-primary md:text-3xl">
            Checkout
          </h1>

          <p className="mt-2 text-sm text-gray">
            Complete your information to place your order.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Customer Information */}
          <div className="lg:col-span-2">
            <div className="border border-gray-200 p-6 md:p-8">
              <h2 className="mb-7 text-lg font-normal text-primary">
                Customer Information
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-5">
                  <label className="mb-2 block text-sm text-primary">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="h-12 w-full border border-gray-300 px-4 text-sm text-primary outline-none transition focus:border-black"
                  />
                </div>

                {/* Phone */}
                <div className="mb-5">
                  <label className="mb-2 block text-sm text-primary">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    className="h-12 w-full border border-gray-300 px-4 text-sm text-primary outline-none transition focus:border-black"
                  />
                </div>

                {/* Address */}
                <div className="mb-5">
                  <label className="mb-2 block text-sm text-primary">
                    Delivery Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your complete delivery address"
                    rows="5"
                    className="w-full resize-none border border-gray-300 px-4 py-3 text-sm text-primary outline-none transition focus:border-black"
                  />
                </div>

                {/* Division */}
                <div className="mb-7">
                  <label className="mb-2 block text-sm text-primary">
                    Division
                  </label>

                  <select
                    name="division"
                    value={formData.division}
                    onChange={handleChange}
                    className="h-12 w-full border border-gray-300 bg-white px-4 text-sm text-primary outline-none transition focus:border-black"
                  >
                    <option value="">Select your division</option>
                    {divisions.map((division) => (
                      <option key={division.id} value={division.name}>
                        {division.name}
                      </option>
                    ))}
                  </select>

                  <p className="mt-2 text-xs text-gray">
                    Delivery charge: ${DHAKA_DELIVERY_CHARGE} inside Dhaka, $
                    {OUTSIDE_DHAKA_DELIVERY_CHARGE} outside Dhaka.
                  </p>
                </div>

                {/* Payment */}
                <div>
                  <h2 className="mb-4 text-lg font-normal text-primary">
                    Payment Method
                  </h2>

                  <div className="flex items-center gap-3 border border-black px-4 py-4">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border border-black">
                      <div className="h-2.5 w-2.5 rounded-full bg-black"></div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-primary">
                        Cash on Delivery
                      </p>

                      <p className="mt-1 text-xs text-gray">
                        Pay when your order is delivered.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Place Order */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-8 h-12 w-full bg-black text-sm font-medium tracking-wide text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 lg:hidden"
                >
                  {loading ? "PLACING ORDER..." : "PLACE ORDER"}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="border border-gray-200 p-6 md:p-8 lg:sticky lg:top-5">
              <h2 className="mb-6 text-lg font-normal text-primary">
                Order Summary
              </h2>

              <div className="space-y-5">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-16 w-16 object-cover"
                        />

                        <div>
                          <h3 className="max-w-35 text-sm font-normal text-primary">
                            {item.title}
                          </h3>

                          <p className="mt-1 text-xs text-gray">
                            Qty: {item.quantity || 1}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-primary">
                        $
                        {(
                          Number(item.price || 0) *
                          Number(item.quantity || 1)
                        ).toFixed(2)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="py-5 text-center text-sm text-gray">
                    Your cart is empty.
                  </p>
                )}
              </div>

              <div className="my-6 border-t border-gray-200"></div>

              <div className="flex justify-between text-sm text-gray">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="mt-3 flex justify-between text-sm text-gray">
                <span>Delivery</span>
                <span>
                  {formData.division ? `$${deliveryCharge.toFixed(2)}` : "Select division"}
                </span>
              </div>

              <div className="my-5 border-t border-gray-200 pt-5">
                <div className="flex justify-between">
                  <span className="text-base font-medium text-primary">
                    Total
                  </span>

                  <span className="text-base font-medium text-primary">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Desktop Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="hidden h-12 w-full cursor-pointer bg-black text-sm font-medium tracking-wide text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 lg:block"
              >
                {loading ? "PLACING ORDER..." : "PLACE ORDER"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
