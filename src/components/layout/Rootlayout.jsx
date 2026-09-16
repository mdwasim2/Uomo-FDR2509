import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import MobileNav from "./MobileNav";

const Rootlayout = () => {
  return (
    <main>
      <Header />
      <div className="pb-20 lg:pb-0">
        <Outlet />
      </div>
      <MobileNav/>
    </main>
  );
};

export default Rootlayout;
