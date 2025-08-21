import React from "react";
import { OrderCard } from "../../components/OrderCard";
import { useState } from "react";
import { useEffect } from "react";

const Orders = () => {
  const [sessionOrders, setSessionOrders] = useState([]);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("Session Orders")) || [];
    setSessionOrders(saved);
  }, []);
  return (
    <>
      <div className="">
        {sessionOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </>
  );
};

export { Orders };
