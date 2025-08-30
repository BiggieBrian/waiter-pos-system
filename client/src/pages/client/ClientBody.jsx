import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router";
import { ClientFooter } from "./ClientFooter";
import { ClientHeader } from "./ClientHeader";
import { useState } from "react";

const ClientBody = () => {
  return (
    <>
      <main className="min-h-screen">
        <ClientHeader />
        <div className="w-11/12 mx-auto pt-10 pb-50">
          <Outlet />
        </div>
        <ClientFooter />
      </main>
    </>
  );
};

export { ClientBody };
