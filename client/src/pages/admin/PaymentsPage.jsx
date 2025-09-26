import { mockPayments } from "../../data/mockData";
import { useState } from "react";

export default function PaymentsPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // number of rows per page

  // Filter orders
  const filteredPayments = mockPayments.filter((payment) => {
    const id = String(payment.orderId).toLowerCase();
    const method = String(payment.method).toLowerCase();
    const status = String(payment.status).toLowerCase();

    return (
      id.includes(search.toLowerCase()) ||
      method.includes(search.toLowerCase()) ||
      status.includes(search.toLowerCase())
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPayments.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentPayments = filteredPayments.slice(
    startIndex,
    startIndex + pageSize
  );
  return (
    <>
      <div className="p-6">
        {/* Header + Search */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">Payments</h2>
          <input
            type="text"
            placeholder="Search payments by Id, Method or Status..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset to page 1 when searching
            }}
            className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-600"
          />
        </div>
        <div className="p-4">
          <table className="w-full border-collapse bg-gray-900 rounded-xl overflow-hidden shadow-md">
            <thead className="bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Method</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentPayments.length > 0 ? (
                currentPayments.map((payment, index) => (
                  <tr
                    key={payment.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                    } hover:bg-gray-700 transition`}
                  >
                    <td className="px-4 py-2">{payment.orderId}</td>
                    <td className="px-4 py-2">{payment.method}</td>
                    <td className="px-4 py-2">{payment.amount}</td>
                    <td className="px-4 py-2 text-rose-500">
                      {payment.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-400 italic"
                  >
                    No matching payments found
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
    </>
  );
}
