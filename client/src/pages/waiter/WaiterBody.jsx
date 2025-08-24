import React from "react";
import { WaiterFooter } from "./WaiterFooter";
import { WaiterHeader } from "./WaiterHeader";
import { Outlet } from "react-router";

const WaiterBody = () => {
  return (
    <>
      <WaiterHeader />
      <div className="w-11/12 mx-auto pt-10 pb-50">
        <Outlet />
      </div>
      <WaiterFooter />
    </>
  );
};

export { WaiterBody };
