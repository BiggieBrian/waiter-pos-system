import React from "react";
import { Client } from "./pages/client/Client";
import { Outlet } from "react-router";

const App = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export { App };
