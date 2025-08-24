import React from "react";

const SessionCard = ({ session }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 border border-gray-200 text-black">
      <h2 className="font-bold text-lg text-emerald-600 mb-1">
        Table {session.tableId}
      </h2>
      <p className="text-sm text-gray-500 mb-3">Status: {session.status}</p>

      {/* Orders */}
      <div className="space-y-3">
        {session.orders.map((order, idx) => (
          <div
            key={idx}
            className="bg-gray-50 rounded-lg p-3 border border-gray-100"
          >
            <div className="flex justify-between text-sm font-semibold">
              <span>Order #{order.id}</span>
              <span
                className={
                  order.status === "Pending"
                    ? "text-red-500"
                    : "text-emerald-600"
                }
              >
                {order.status}
              </span>
            </div>

            {/* Items */}
            <ul className="mt-2 text-sm text-gray-700 space-y-1">
              {order.items.map((item, i) => (
                <li key={i} className="flex justify-between">
                  <span>
                    {item.name} <span className="text-xs">× {item.qty}</span>
                  </span>
                  <span>Ksh {item.price * item.qty}</span>
                </li>
              ))}
            </ul>

            {/* Order total */}
            <div className="flex justify-between mt-2 font-bold text-gray-800">
              <span>Total:</span>
              <span>Ksh {order.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { SessionCard };
