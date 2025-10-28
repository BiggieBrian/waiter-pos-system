// src/pages/admin/Dashboard.jsx
import KpiCard from "../../components/KpiCard";
import{SalesBarChart} from "../../components/Charts";
import { mockOrders, mockSessions, mockPayments } from "../../data/mockData";
import { PlusCircle, Users, ShoppingCart, CreditCard } from "lucide-react";
import "../../styles/animations.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {


  // Derived metrics
  const [activeSessions, setActiveSessions] = useState(0)
  const [ordersToday, setOrdersToday] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [salesToday, setSalesToday] = useState(0) 


    useEffect(() => {
     const getDailyOrders = async () => {
       try{
      const response = await axios.get("http://localhost:5000/api/orders/today")
      setOrdersToday(response.data.length)
    } catch (error) {
        console.error("Failed to get the Daily Orders:", error);
      }
     }
      const getDailySessions = async () => {
       try{
      const response = await axios.get("http://localhost:5000/api/sessions/today")
      setActiveSessions(response.data.length)
    } catch (error) {
        console.error("Failed to get th daily sessions:", error);
      }
     }
     const getTotalSales = async () => {
       try{
      const response = await axios.get("http://localhost:5000/api/payments/today")
      setSalesToday(response.data.totalSales)
    } catch (error) {
        console.error("Failed to get th daily sessions:", error);
      }
     }
     const getOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        setRecentOrders(response.data || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    getOrders();
     getDailyOrders()
     getDailySessions()
     getTotalSales()
    }, [])

  return (
    <div className="p-6 space-y-8  min-h-screen bg-transparent  text-gray-100 ">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>

      {/* Quick Actions */}
      <div className="">
        <h2 className="text-xl font-semibold mb-3 text-rose-400">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-rose-700/80 text-white rounded-lg hover:bg-rose-800 transition-colors shadow-lg shadow-rose-900/30">
            <PlusCircle className="w-4 h-4" />
            New Food Item
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-rose-700/80 text-white rounded-lg hover:bg-rose-800 transition-colors shadow-lg shadow-rose-900/30">
            <Users className="w-4 h-4" />
            New Waiter
          </button>
        </div>
      </div>

      <div className="bg-gray-900/70 border border-rose-800/40 rounded-xl p-6">
        <SalesBarChart />
      </div>

      {/* Snapshot & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        {/* Tables & Analytics Overview */}
        <div className="p-6 border border-rose-900/40 rounded-xl bg-gray-900/80 backdrop-blur">
          <h3 className="font-bold text-rose-300 mb-5">Waiter Performance</h3>
          <p className="text-sm text-gray-400">
            Real-time charts and table status will be displayed here.
          </p>
        </div>

        {/* Recent Orders */}
        <div className="p-6 border border-rose-900/40 rounded-xl bg-gray-900/80 backdrop-blur">
          <h3 className="font-bold text-rose-300 mb-5">Recent Orders</h3>
          <ul className="space-y-3 text-sm">
            {recentOrders.slice(0, 5).map((order) => (
              <li
                key={order._id}
                className="flex justify-between items-center border-b border-gray-800 pb-2"
              >
                <span>
                  <span className="text-rose-400">#{order._id.slice(-6).toUpperCase()}</span> –{" "}
                  {order.session?.customerName || "—"}
                </span>
                <span className="text-gray-300 font-medium">
                  KES {order.total.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
