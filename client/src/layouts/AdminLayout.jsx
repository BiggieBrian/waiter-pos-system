import React, { useState } from "react";
import SideBar from "../pages/admin/SideBar";
import Navbar from "../pages/admin/Navbar";
import { Outlet } from "react-router";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-rose-950 via-gray-950 to-black text-gray-100">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex-1 flex flex-col">
        <Navbar setIsOpen={setIsOpen} />
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default AdminLayout;
