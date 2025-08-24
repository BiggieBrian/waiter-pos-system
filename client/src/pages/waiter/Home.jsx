import React from "react";
import { OrderCard } from "../../components/OrderCard";
import { useState } from "react";
import { useEffect } from "react";
import empty_cart from "../../assets/undraw_diet_zdwe.svg";

const WaiterHome = () => {
  const [sessionOrders, setSessionOrders] = useState([]);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("Session Orders")) || [];
    setSessionOrders(saved);
  }, []);
  return (
    <>
      {sessionOrders.length < 1 ? (
        <div className="flex justify-center items-center py-5 px-10 h-[70vh]">
          <div className="flex flex-col justify-center items-center">
            <img
              src={empty_cart}
              alt="Empty cart"
              className="w-xl h-auto mb-4"
            />
            <p className="p-10 text-3xl">No orders yet</p>
          </div>
        </div>
      ) : (
        <div className="">
          {sessionOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </>
  );
};

export { WaiterHome };
