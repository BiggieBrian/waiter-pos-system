// src/pages/admin/OrdersPage.jsx
import { useState } from "react";
import { mockOrders } from "../../data/mockData";

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // number of rows per page

  // Filter orders
  const filteredOrders = mockOrders.filter((order) => {
    const id = String(order.id).toLowerCase();
    const customer = String(order.customer).toLowerCase();
    const table = String(order.table).toLowerCase();

    return (
      id.includes(search.toLowerCase()) ||
      customer.includes(search.toLowerCase()) ||
      table.includes(search.toLowerCase())
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + pageSize);

  const getStatusBadge = (status) => {
    const base = "px-2 py-1 text-xs font-semibold rounded-full capitalize";
    switch (status) {
      case "Pending":
        return `${base} bg-yellow-600 text-yellow-100`;
      case "Preparing":
        return `${base} bg-blue-600 text-blue-100`;
      case "Served":
        return `${base} bg-green-600 text-green-100`;
      case "Cancelled":
        return `${base} bg-rose-600 text-rose-100`;
      default:
        return `${base} bg-gray-700 text-gray-200`;
    }
  };

  return (
    <div className="p-6">
      {/* Header + Search */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">Orders</h2>
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset to page 1 when searching
          }}
          className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-600"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-gray-900 rounded-xl overflow-hidden shadow-md">
          <thead className="bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">Table</th>
              <th className="px-6 py-3 text-left text-sm font-bold">
                Total (KES)
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length > 0 ? (
              currentOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                  } hover:bg-gray-700 transition`}
                >
                  <td className="px-6 py-3 text-white">{order.id}</td>
                  <td className="px-6 py-3 text-white">{order.customer}</td>
                  <td className="px-6 py-3 text-white">{order.table}</td>
                  <td className="px-6 py-3 text-white">
                    {order.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-3">
                    <span className={getStatusBadge(order.status)}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-400 italic"
                >
                  No matching orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-6 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className={`px-3 py-1 rounded-lg ${
              currentPage === 1
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 rounded-lg ${
                num === currentPage
                  ? "bg-rose-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className={`px-3 py-1 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
