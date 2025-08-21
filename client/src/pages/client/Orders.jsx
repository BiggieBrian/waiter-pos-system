import React from "react";
import { OrderCard } from "../../components/OrderCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router";
import { Link } from "react-router";
const orders = [
  {
    id: 101,
    session_id: 20,
    status: "Completed",
    time: "Today, 10:45 AM",
    total: 1200,
    items: [
      { name: "Chicken Pizza", qty: 1, price: 800 },
      { name: "Coke", qty: 2, price: 200 },
    ],
  },
  {
    id: 102,
    session_id: 20,
    status: "Pending",
    time: "Today, 11:10 AM",
    total: 600,
    items: [{ name: "Burger", qty: 2, price: 300 }],
  },
  {
    id: 101,
    session_id: 20,
    status: "Completed",
    time: "Today, 10:45 AM",
    total: 1200,
    items: [
      { name: "Chicken Pizza", qty: 1, price: 800 },
      { name: "Coke", qty: 2, price: 200 },
    ],
  },
  {
    id: 102,
    session_id: 20,
    status: "Pending",
    time: "Today, 11:10 AM",
    total: 600,
    items: [{ name: "Burger", qty: 2, price: 300 }],
  },
  {
    id: 101,
    session_id: 20,
    status: "Completed",
    time: "Today, 10:45 AM",
    total: 1200,
    items: [
      { name: "Chicken Pizza", qty: 1, price: 800 },
      { name: "Coke", qty: 2, price: 200 },
    ],
  },
  {
    id: 102,
    session_id: 20,
    status: "Pending",
    time: "Today, 11:10 AM",
    total: 600,
    items: [{ name: "Burger", qty: 2, price: 300 }],
  },
];

const Orders = () => {
  return (
    <>
      <div className="p-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </>
  );
};

export { Orders };
export { orders };
