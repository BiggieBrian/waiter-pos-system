import React from "react";
import { Client } from "./pages/client/Client";
import { Outlet } from "react-router";
import "./App.css";
const App = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export { App };
