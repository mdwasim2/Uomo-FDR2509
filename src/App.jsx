import React from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Rootlayout from "./components/layout/Rootlayout";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ShopSingle from "./pages/ShopSingle";
import CartPage from "./pages/CartPage";
import Signin from "./pages/Signin";
import SignUp from "./pages/Signup";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Rootlayout,
      children: [
        { index: true, Component: HomePage },
        { path: "shop", Component: ShopPage },
        { path: "shop/:id", Component: ShopSingle },
        { path: "cart", Component: CartPage },
        { path: "signin", Component: Signin },
        { path: "signup", Component: SignUp },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
