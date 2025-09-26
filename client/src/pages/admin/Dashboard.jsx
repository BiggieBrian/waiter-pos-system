// src/pages/admin/Dashboard.jsx
import KpiCard from "../../components/KpiCard";
import { mockOrders, mockSessions, mockPayments } from "../../data/mockData";
import { PlusCircle, Users, ShoppingCart, CreditCard } from "lucide-react";
import "../../styles/animations.css";

export default function Dashboard() {
  // Derived metrics
  const activeSessions = mockSessions.filter(
    (s) => s.status === "Active"
  ).length;
  const ordersToday = mockOrders.length;
  const pendingPayments = mockPayments.filter(
    (p) => p.status === "Pending"
  ).length;
  const salesToday = mockPayments
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="relative p-6 space-y-8  min-h-screen bg-transparent backdrop-blur text-gray-100 ">
      <div className="absolute inset-0 -z-10 opacity-[0.07] bg-[radial-gradient(circle,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:28px_28px]"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-rose-700 rounded-full opacity-20 blur-3xl animate-slow-float"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-rose-500 rounded-full opacity-15 blur-3xl animate-slow-float"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        <KpiCard
          title="Active Sessions"
          value={activeSessions}
          icon={<Users className="text-rose-400" />}
        />
        <KpiCard
          title="Orders Today"
          value={ordersToday}
          icon={<ShoppingCart className="text-rose-400" />}
        />
        <KpiCard
          title="Sales Today"
          value={`KES ${salesToday.toLocaleString()}`}
          icon={<CreditCard className="text-rose-400" />}
        />
        <KpiCard
          title="Pending Payments"
          value={pendingPayments}
          icon={<CreditCard className="text-rose-400" />}
        />
      </div>

      {/* Quick Actions */}
      <div className="relative z-10">
        <h2 className="text-xl font-semibold mb-3 text-rose-400">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-rose-700/80 text-white rounded-lg hover:bg-rose-800 transition-colors shadow-lg shadow-rose-900/30">
            <PlusCircle className="w-4 h-4" />
            New Order
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-rose-700/80 text-white rounded-lg hover:bg-rose-800 transition-colors shadow-lg shadow-rose-900/30">
            <Users className="w-4 h-4" />
            New Session
          </button>
        </div>
      </div>

      {/* Snapshot & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        {/* Tables & Analytics Overview */}
        <div className="p-6 border border-rose-900/40 rounded-xl bg-gray-900/80 backdrop-blur">
          <h3 className="font-semibold text-rose-300 mb-2">
            Tables & Analytics Overview
          </h3>
          <p className="text-sm text-gray-400">
            Real-time charts and table status will be displayed here.
          </p>
        </div>

        {/* Recent Orders */}
        <div className="p-6 border border-rose-900/40 rounded-xl bg-gray-900/80 backdrop-blur">
          <h3 className="font-semibold text-rose-300 mb-2">Recent Orders</h3>
          <ul className="space-y-3 text-sm">
            {mockOrders.slice(0, 5).map((order) => (
              <li
                key={order.id}
                className="flex justify-between items-center border-b border-gray-800 pb-2"
              >
                <span>
                  <span className="text-rose-400">#{order.id}</span> –{" "}
                  {order.customer}
                </span>
                <span className="text-gray-300 font-medium">
                  KES {order.total}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
