import React, { useState } from "react";
import { MenuItemCard } from "../../components/MenuItemCard";

const menuItems = [
  {
    id: 1,
    name: "Grilled Chicken",
    category: "Main",
    price: 550,
    inStock: false,
  },
  { id: 2, name: "Beef Burger", category: "Main", price: 450, inStock: true },
  { id: 3, name: "French Fries", category: "Side", price: 200, inStock: true },
  { id: 4, name: "Coca Cola", category: "Drink", price: 100, inStock: true },
  { id: 5, name: "Milkshake", category: "Drink", price: 250, inStock: true },
  {
    id: 6,
    name: "Chocolate Cake",
    category: "Dessert",
    price: 300,
    inStock: true,
  },
];

const NewOrder = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [order, setOrder] = useState([]);

  const filteredItems = menuItems.filter((item) => {
    return (
      (filter === "All" || item.category === filter) &&
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  // const addToOrder = (item) => {
  //   setOrder((prev) => {
  //     const existing = prev.find((o) => o.id === item.id);
  //     if (existing) {
  //       return prev.map((o) =>
  //         o.id === item.id ? { ...o, qty: o.qty + 1 } : o
  //       );
  //     }
  //     return [...prev, { ...item, qty: 1 }];
  //   });
  // };

  // const removeFromOrder = (id) => {
  //   setOrder((prev) => prev.filter((item) => item.id !== id));
  // };

  // const totalPrice = order.reduce(
  //   (acc, item) => acc + item.price * item.qty,
  //   0
  // );

  const addToOrder = (item) => {
    setOrder((prev) => {
      if (!item.inStock) {
        alert("Item is out of stock");
        return;
      }
      console.log(item);
    });
  };

  return (
    <>
      {/* <div className="border rounded-lg p-4 flex flex-col m-5 bg-gray-950">
        <h2 className="text-lg font-semibold mb-4">Current Order</h2>
        <div className="flex-1 overflow-y-auto space-y-2">
          {order.length === 0 && <p className="text-gray-500">No items yet</p>}
          {order.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                {item.name} x {item.qty}
              </div>
              <div className="flex items-center gap-2">
                <span>Ksh {item.price * item.qty}</span>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600"
                  // onClick={() => removeFromOrder(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t pt-2 flex justify-between font-semibold">
          <span>Total</span>
          {/* <span>Ksh {totalPrice}</span> 
        </div>
        <button className="mt-4 w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600">
          Confirm Order
        </button>
      </div> */}
      // <hr />
      <div className="grid grid-cols-3 gap-4 p-4 my-4">
        {/* Left - Menu & Filters */}
        <div className="col-span-3 space-y-4">
          {/* Search & Filter */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search for items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border rounded-lg p-2"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-lg p-2"
            >
              <option>All</option>
              <option>Main</option>
              <option>Side</option>
              <option>Drink</option>
              <option>Dessert</option>
            </select>
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} onAdd={addToOrder} />
            ))}
          </div>
        </div>

        {/* Right - Order Summary */}
      </div>
    </>
  );
};
export { NewOrder };
