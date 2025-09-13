import { ArrowLeft, User, Plus } from "lucide-react";
import { Link } from "react-router";
import bag from "../../assets/bag.png";

const orders = [
  { id: "#1234", restaurant: "Liceria & Co.", amount: 1.23, status: "Ready" },
  { id: "#1235", restaurant: "Liceria & Co.", amount: 1.23, status: "Pending" },
  { id: "#1236", restaurant: "Liceria & Co.", amount: 1.23, status: "Ready" },
  { id: "#1237", restaurant: "Liceria & Co.", amount: 1.23, status: "Pending" },
  { id: "#1238", restaurant: "Liceria & Co.", amount: 1.23, status: "Ready" },
  { id: "#1222", restaurant: "Liceria & Co.", amount: 1.23, status: "Ready" },
  { id: "#1266", restaurant: "Liceria & Co.", amount: 1.23, status: "Pending" },
  { id: "#1287", restaurant: "Liceria & Co.", amount: 1.23, status: "Ready" },
  { id: "#1299", restaurant: "Liceria & Co.", amount: 1.23, status: "Pending" },
  { id: "#1297", restaurant: "Liceria & Co.", amount: 1.23, status: "Ready" },
];

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <Link to={"/session"}>
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">Orders</h1>
        <Link to={"/session/profile"}>
          <User className="w-8 h-8" />
        </Link>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4"
          >
            <div className="">
              <img src={bag} alt="" className="size-20" />
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-lg">Order {order.id}</h3>
              <p className="text-gray-600">{order.restaurant}</p>
              <p className="text-lg font-bold">${order.amount}</p>
            </div>
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
        ))}
      </div>

      {/* Add Button */}
      <div className="fixed bottom-24 right-6 pb-10">
        <button
          aria-label="Add item"
          className="w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full shadow-lg flex justify-center items-center transition-transform hover:scale-110"
        >
          <Plus className="size-10 text-white font-black" />
        </button>
      </div>
    </div>
  );
}
