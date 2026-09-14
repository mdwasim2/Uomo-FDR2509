// import { onAuthStateChanged, signOut } from "firebase/auth";
// import React, { useState } from "react";
// import { auth } from "../../firebase.config";
// import { useNavigate } from "react-router";
// export default function Profile() {
//     const [user, setUser] = useState(null)
//     const navigate = useNavigate()
//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//             setUser(user)
//             console.log(user)
//         } else {
//             toast.error("user Logout")
//         }
//     });



//     const handleSignOut = () => {
//         signOut(auth).then(() => {
//             alert("logout successfull")
//             navigate("/")

//         }).catch((error) => {
//             alert(error)
//         });
//     }
//     return (
//         <div className="min-h-screen bg-white font-jost">
//             <div className="mx-auto flex min-h-screen w-full max-w-md items-center justify-center px-5">
//                 <div className="w-full">
//                     {/* Profile Photo */}
//                     <div className="flex justify-center">
//                         <img
//                             src={user?.photoURL}
//                             alt={user?.displayName}
//                             className="h-24 w-24 rounded-full object-cover"
//                         />
//                     </div>

//                     {/* Name */}
//                     <h1 className="mt-5 text-center text-2xl font-semibold text-primary">
//                         {user?.displayName}
//                     </h1>

//                     {/* Email */}
//                     <div className="mt-6">
//                         <label className="mb-2 block text-sm font-medium text-primary">
//                             Email
//                         </label>

//                         <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
//                             <span className="text-sm text-gray">
//                                 {user?.email}
//                             </span>

//                             {user?.emailVerified ? (
//                                 <span className="text-sm font-medium text-green-600">
//                                     Verified
//                                 </span>
//                             ) : (
//                                 <button className="text-sm font-medium text-primary underline underline-offset-2">
//                                     Verify
//                                 </button>
//                             )}
//                         </div>
//                     </div>

//                     {/* Logout */}
//                     <button onClick={handleSignOut}
//                         type="button"
//                         className="mt-8 w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-black"
//                     >
//                         Logout
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase.config";
import { useNavigate } from "react-router";
import { onValue, ref } from "firebase/database";
import toast, { Toaster } from "react-hot-toast";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();

    // Get logged in user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
                navigate("/");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    // Get user's orders
    useEffect(() => {
        if (!user?.uid) return;

        const ordersRef = ref(db, "orders");

        const unsubscribe = onValue(ordersRef, (snapshot) => {
            const data = snapshot.val();

            if (!data) {
                setOrders([]);
                return;
            }

            const userOrders = Object.entries(data)
                .filter(([id, order]) => {
                    const orderUserId = order?.userId || order?.customer?.userid;
                    return orderUserId === user.uid;
                })
                .map(([id, order]) => ({
                    id,
                    ...order,
                }));

            setOrders(userOrders);
        });

        return () => unsubscribe();
    }, [user]);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            toast.success("Logout successful");
            navigate("/");
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    return (
        <div className="min-h-screen bg-white font-jost px-5 py-10">
            <Toaster position="top-center" />

            <div className="mx-auto max-w-5xl">

                {/* Profile */}
                <div className="mx-auto max-w-md">
                    <div className="flex justify-center">
                        <img
                            src={user?.photoURL}
                            alt={user?.displayName}
                            className="h-24 w-24 rounded-full object-cover"
                        />
                    </div>

                    <h1 className="mt-5 text-center text-2xl font-semibold text-primary">
                        {user?.displayName}
                    </h1>

                    <div className="mt-6">
                        <label className="mb-2 block text-sm font-medium text-primary">
                            Email
                        </label>

                        <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
                            <span className="text-sm text-gray">
                                {user?.email}
                            </span>

                            {user?.emailVerified ? (
                                <span className="text-sm font-medium text-green-600">
                                    Verified
                                </span>
                            ) : (
                                <button className="text-sm font-medium text-primary underline">
                                    Verify
                                </button>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="mt-8 w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white hover:bg-black"
                    >
                        Logout
                    </button>
                </div>

                {/* Orders */}
                <div className="mt-16">
                    <h2 className="mb-6 text-2xl font-semibold text-primary">
                        My Orders
                    </h2>

                    {orders.length === 0 ? (
                        <div className="border border-gray-200 p-8 text-center">
                            <p className="text-sm text-gray">No orders found.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="border border-gray-200 p-6"
                                >
                                    <div className="flex flex-col justify-between gap-3 border-b border-gray-200 pb-5 md:flex-row">
                                        <div>
                                            <p className="text-xs text-gray">Order ID</p>
                                            <p className="mt-1 text-sm font-medium">
                                                #{order.id}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray">Status</p>
                                            <p className="mt-1 text-sm font-medium capitalize text-yellow-600">
                                                {order.status}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray">Date</p>
                                            <p className="mt-1 text-sm">
                                                {order.createdAt
                                                    ? new Date(
                                                          order.createdAt
                                                      ).toLocaleDateString()
                                                    : ""}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="py-5">
                                        <h3 className="mb-4 text-sm font-medium">Products</h3>

                                        <div className="space-y-4">
                                            {order.products?.map((product, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            src={product.image}
                                                            alt={product.title}
                                                            className="h-16 w-16 object-cover"
                                                        />

                                                        <div>
                                                            <p className="text-sm">
                                                                {product.title}
                                                            </p>

                                                            <p className="mt-1 text-xs text-gray">
                                                                Qty: {product.quantity}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <p className="text-sm">
                                                        ${(
                                                            Number(product.price) *
                                                            Number(product.quantity)
                                                        ).toFixed(2)}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-5">
                                        <p className="text-xs text-gray">Delivery Address</p>
                                        <p className="mt-1 text-sm">
                                            {order.customer?.address || "No address provided"}
                                        </p>
                                    </div>

                                    <div className="mt-5 flex justify-between border-t border-gray-200 pt-5">
                                        <span className="text-sm font-medium">Total</span>
                                        <span className="text-base font-semibold">
                                            ${Number(order.total || 0).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
