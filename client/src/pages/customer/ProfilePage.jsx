"use client";

import { ArrowLeft, Edit, Package, DollarSign } from "lucide-react";
import { Link } from "react-router";

export default function ProfilePage() {
  const userName = "John Doe";
  const userPhone = "0723916573";
  const totalOrders = 5;
  const totalAmount = 123456.78;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between border-b">
        <Link to={"/session"}>
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">Profile</h1>
        <div></div>
      </div>

      <div className="p-4 space-y-6">
        {/* User Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-bold">{userName}</h2>
            <Edit className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-xl text-gray-600">{userPhone}</p>
        </div>

        {/* Stats Cards */}
        <div className="space-y-4">
          {/* Total Orders */}
          <div className="bg-white rounded-xl p-6 flex items-center gap-4 shadow-sm">
            <div className="w-16 h-16 bg-gray-900 rounded-xl flex items-center justify-center">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Total Orders</h3>
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
            </div>
          </div>

          {/* Total Amount */}
          <div className="bg-white rounded-xl p-6 flex items-center gap-4 shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-gray-300">
              <DollarSign className="w-8 h-8 text-gray-700" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Total Amount</h3>
              <p className="text-2xl font-bold text-gray-900">
                ${totalAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-1 border-gray-900 my-6"></div>

        {/* Community Section */}
        <div className="text-center space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Loved our services? Consider joining our community to get news on
            offers and events at our restaurant.
          </p>

          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl text-lg font-bold">
            Join the Whizperz Cafe & Pizza community
          </button>
        </div>
      </div>
    </div>
  );
}
