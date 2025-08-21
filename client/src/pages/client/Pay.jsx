import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillWave,
  faMobileAlt,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { faCcVisa, faCcMastercard } from "@fortawesome/free-brands-svg-icons";

const Pay = ({ onSelect }) => {
  const [sessionOrders, setSessionOrders] = useState([]);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("Session Orders")) || [];
    setSessionOrders(saved);
  }, []);
  const totalSessionAmount = () =>
    sessionOrders.reduce((total, order) => total + order.total, 0);

  const methods = [
    {
      id: "cash",
      title: "Cash",
      icon: faMoneyBillWave,
      color: "bg-green-600",
    },
    {
      id: "mpesa",
      title: "M-Pesa",
      icon: faMobileAlt,
      color: "bg-emerald-500",
    },
    {
      id: "airtel",
      title: "Airtel Money",
      icon: faMobileAlt,
      color: "bg-red-500",
    },
    {
      id: "card",
      title: "Credit/Debit Card",
      icon: faCreditCard,
      color: "bg-blue-600",
    },
  ];

  return (
    <>
      <div className="text-6xl text-emerald-500 font-black flex justify-center py-4">
        <h1>KES {totalSessionAmount() || 0}</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 py-4">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            className="flex flex-col items-center justify-center rounded-2xl shadow-md border bg-[#000000] p-6 cursor-pointer"
          >
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-full text-white ${method.color}`}
            >
              <FontAwesomeIcon icon={method.icon} size="lg" />
            </div>
            <span className="mt-3 font-medium text-lg">{method.title}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export { Pay };
