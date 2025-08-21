import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router";
import { ClientFooter } from "./ClientFooter";
import { ClientHeader } from "./ClientHeader";

const Client = () => {
  return (
    <>
      <main className="min-h-screen bg-[#0A0A0A] text-white">
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
