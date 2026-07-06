import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";

const Rootlayout = () => {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
};

export default Rootlayout;
