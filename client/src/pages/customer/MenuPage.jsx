import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Search, User, ChevronDown, Plus, ShoppingCart, Flame } from "lucide-react";
import { Tooltip } from "../../components/tooltip";
import axios from "axios";
import toast from "react-hot-toast";
import bag from "../../assets/bag.png";
import placeholder from "../../assets/menuPlaceholder.jpg"

//
// 🔹 Menu Page
//
const MenuPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [tableNumber, setTableNumber] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Order state
  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [orderExpanded, setOrderExpanded] = useState(false);

  const redbg = "bg-black";

  const categories = [
    "All",
    ...new Set(menuItems.map((item) => item.category)),
  ];

  // Filtering logic
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const getMenu = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/menu");
        setMenuItems(response.data);
      } catch (error) {
        toast.error("Error in getting menu items.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    const getTableNumber = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/sessions/${sessionId}`
        );
        setTableNumber(response.data.table?.number || "Unknown");
      } catch (error) {
        console.error(error);
      }
    };
    getMenu();
    getTableNumber();
  }, [sessionId]);

  //
  // 🔹 Order Handlers
  //
  const handleStartOrder = () => {
    setOrderStarted(true);
    setOrderExpanded(true);
    toast.success("New order started!");
  };

  const handleAddItem = (item) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const handleConfirmOrder = async () => {
    try {
      const orderPayload = {
        sessionId,
        items: orderItems.map((i) => ({ menuItem: i._id, qty: i.qty })),
      };

      const res = await axios.post(
        "http://localhost:5000/api/orders",
        orderPayload
      );

      toast.success("Order confirmed!");
      console.log("Saved order:", res.data);

      // Reset
      setOrderStarted(false);
      setOrderExpanded(false);
      setOrderItems([]);

      //Navigate Awaaaaay
      navigate(`/session/${sessionId}/orders`);
    } catch (error) {
      toast.error("Error confirming order.");
      console.error(error);
    }
  };

  const totalAmount = orderItems.reduce((acc, i) => acc + i.price * i.qty, 0);
  const totalQty = orderItems.reduce((acc, i) => acc + i.qty, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 overflow-x-hidden">
      {/* Header */}
      <div className={`${redbg} text-white p-6  shadow-2xl`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-rose-600">
            <Flame className="size-10 "/>
            <h1 className="text-4xl font-bold Lobster">Platter</h1>
          </div>
          <h3 className="text-2xl font-bold">Table {tableNumber}</h3>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Whizperz Cafe & Pizza</h3>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your favorite food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 w-full rounded-xl border-gray-200 focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Category dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-12 rounded-xl border-gray-300 text-gray-700 pl-3 pr-8 bg-white focus:ring-2 focus:ring-red-500"
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Menu Items */}
      {loading ? (
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
      ) : (
        <div className="px-4 space-y-4 pb-25">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow-sm flex gap-4"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
                  <img
                    src={item.imageUrl || bag}
                    alt=""
                    className="size-20 rounded-xl"
                    onError={(e) => (e.currentTarget.src = bag)}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-red-500 font-bold text-lg">
                      Ksh {item.price}
                    </span>

                    <Tooltip
                      message={
                        !orderStarted
                          ? "Press ➕ to start an order before adding items"
                          : ""
                      }
                    >
                      <button
                        onClick={() => handleAddItem(item)}
                        disabled={!orderStarted}
                        className={`bg-red-500 hover:bg-rose-950 text-white px-6 py-2 rounded-xl ${
                          !orderStarted
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-red-600"
                        }`}
                      >
                        Add
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No items found.</p>
          )}
        </div>
      )}

      {/* Floating + Button (hidden if order started) */}
      {!orderStarted && (
        <div className="fixed bottom-24 right-6 pb-10 z-50">
          <Tooltip message="Start a new order">
            <button
              aria-label="Add item"
              onClick={handleStartOrder}
              className="w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full shadow-lg flex justify-center items-center transition-transform hover:scale-110"
            >
              <Plus className="size-10 text-white font-black" />
            </button>
          </Tooltip>
        </div>
      )}

      {/* Order Bar */}
      {orderStarted && (
        <div
          className={`fixed bottom-27 left-2 right-2 bg-white shadow-lg border  transition-all rounded-3xl z-50 ${
            orderExpanded ? "h-64" : "h-20"
          }`}
        >
          <div
            className="p-4 flex justify-between items-center cursor-pointer"
            onClick={() => setOrderExpanded(!orderExpanded)}
          >
            <span className="font-bold">
              {totalQty} item(s) • Ksh {totalAmount}
            </span>
            <ChevronDown
              className={`transform transition-transform ${
                orderExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
          {orderExpanded && (
            <div className="p-4 space-y-2 overflow-y-auto h-40">
              {orderItems.map((i) => (
                <div
                  key={i._id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span>
                    {i.name} x{i.qty}
                  </span>
                  <span>Ksh {i.price * i.qty}</span>
                </div>
              ))}
              <button
                onClick={handleConfirmOrder}
                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl"
              >
                Confirm Order
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuPage;
