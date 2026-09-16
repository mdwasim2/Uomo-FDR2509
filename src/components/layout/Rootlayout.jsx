import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "./Header";
import MobileNav from "./MobileNav";

const Rootlayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
