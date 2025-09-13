import React from "react";
import { Outlet } from "react-router";
import BottomNav from "../components/bottom-nav";

const CustomerLayout = () => {
  return (
    <>
      <Outlet />
      <div className="mt-10">
        <BottomNav></BottomNav>
      </div>
    </>
  );
};

export default CustomerLayout;
