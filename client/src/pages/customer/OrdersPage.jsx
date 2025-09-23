import { ArrowLeft, User, Package, DollarSign } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function StatCard({ icon, title, value, iconBg, iconColor, border }) {
  return (
    <div className="bg-white rounded-xl p-6 flex items-center gap-4 shadow-lg">
      <div
        className={`w-16 h-16 rounded-xl flex items-center justify-center ${iconBg} ${border}`}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function OrderCard({ order, index }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-lg flex items-center gap-4">
      <div className="flex-1 pl-3 border-l-4 border-red-500">
        <div className="flex justify-between">
          <h3 className="font-bold text-lg">Order #0{index + 1}</h3>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === "Ready"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {order.status}
          </div>
        </div>

        {/* Items */}
        <ul className="text-sm text-gray-600 mt-2 mb-1">
          {order.items?.map((item) => (
            <li key={item._id}>
              <div className="flex justify-between">
                <div>
                  {item.menuItem.name} × {item.qty}
                </div>
                <div>Ksh {Number(item.menuItem.price) * Number(item.qty)}</div>
              </div>
            </li>
          ))}
        </ul>

        <hr />
        <p className="text-xl font-bold text-right mt-2">
          Ksh {order.total?.toLocaleString() || 0}
        </p>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="p-4 pt-10 space-y-4">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="animate-pulse bg-white rounded-xl p-4 shadow-sm flex items-center gap-4"
        >
          <div className="rounded bg-gray-200 h-20 w-20"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function OrdersPage() {
  const { sessionId } = useParams();
  const [sessionOrders, setSessionOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const totalOrders = sessionOrders.length;
  const totalAmount = sessionOrders.reduce(
    (acc, order) => acc + (order.total || 0),
    0
  );

  useEffect(() => {
    const getSessionOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders/session/${sessionId}`
        );
        setSessionOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    getSessionOrders();
  }, [sessionId]);

  useEffect(() => {
    localStorage.setItem("Session Total", JSON.stringify(totalAmount));
  }, [totalAmount]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <Link to={`/session/${sessionId}`}>
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">Orders</h1>
        <Link to={`/session/${sessionId}/profile`}>
          <User className="w-8 h-8" />
        </Link>
      </div>
      {/* Stats */}
      <div className="p-4 space-y-4">
        <StatCard
          icon={<Package className="w-8 h-8 text-white" />}
          title="Total Orders"
          value={totalOrders}
          iconBg="bg-gray-900"
        />
        <StatCard
          icon={<DollarSign className="w-8 h-8 text-gray-700" />}
          title="Total Amount"
          value={`Ksh ${totalAmount.toLocaleString()}`}
          iconBg="bg-gray-100"
          border="border-2 border-gray-300"
        />
      </div>
      {/* Orders List */}
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="p-4 space-y-4">
          {sessionOrders
            .slice() // ✅ copy first
            .reverse() // ✅ then reverse
            .map((order, index) => (
              <OrderCard
                key={order._id}
                order={order}
                index={sessionOrders.length - index - 1}
              />
            ))}

          {!loading && sessionOrders.length === 0 && (
            <p className="text-center text-gray-500">No orders yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
