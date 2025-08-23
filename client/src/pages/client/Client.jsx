import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router";
import { ClientFooter } from "./ClientFooter";
import { ClientHeader } from "./ClientHeader";
import { useState } from "react";

const Client = () => {
  return (
    <>
      <main className="min-h-screen bg-[#000000] text-white">
        <ClientHeader />
        <div className="w-11/12 mx-auto py-2 pb-50">
          <Outlet />
        </div>
        <ClientFooter />
      </main>
    </>
  );
};

export { Client };
