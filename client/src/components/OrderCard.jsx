import React from "react";

const OrderCard = ({ order }) => {
  return (
    <div className="bg-black border border-gray-700 rounded-xl p-4 text-white shadow-md mb-3">
      {/* Order Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold">Order #{order.id}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            order.status === "Completed"
              ? "bg-emerald-500/20 text-emerald-400"
              : order.status === "Pending"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* Items */}
      <ul className="mt-2 space-y-1 text-sm text-gray-300">
        {order.items.map((item, i) => (
          <li key={i} className="flex justify-between">
            <span>
              {item.name} × {item.qty}
            </span>
            <span>KES {item.price * item.qty}</span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="flex justify-between items-center mt-3 text-sm">
        <span className="text-gray-400">{order.time}</span>
        <span className="font-bold text-emerald-500">KES {order.total}</span>
      </div>
    </div>
  );
};

export { OrderCard };
