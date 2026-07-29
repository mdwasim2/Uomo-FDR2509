import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import MobileNav from "./MobileNav";

const Rootlayout = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <MobileNav/>
    </main>
  );
};

export default Rootlayout;
