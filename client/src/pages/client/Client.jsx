import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router";

import { useState } from "react";

const Client = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export { Client };
