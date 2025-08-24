import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillWave,
  faMobileAlt,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import {
  CashForm,
  MpesaForm,
  AirtelForm,
  CardForm,
} from "../../components/Modals/PaymentModals";
import { ModalBase } from "../../components/Modals/ModalBase";

const Pay = () => {
  const [sessionOrders, setSessionOrders] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("Session Orders")) || [];
    setSessionOrders(saved);
  }, []);

  const totalSessionAmount = () =>
    sessionOrders.reduce((total, order) => total + (order.total || 0), 0);

  const methods = [
    { id: "cash", title: "Cash", icon: faMoneyBillWave, color: "bg-green-600" },
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
      color: "bg-red-600",
    },
    {
      id: "card",
      title: "Credit/Debit Card",
      icon: faCreditCard,
      color: "bg-blue-600",
    },
  ];

  const titleMap = {
    cash: "Cash",
    mpesa: "M-Pesa",
    airtel: "Airtel Money",
    card: "Credit/Debit Card",
  };

  const formMap = {
    cash: <CashForm />,
    mpesa: <MpesaForm />,
    airtel: <AirtelForm />,
    card: <CardForm />,
  };

  return (
    <>
      {/* Total */}
      <div className="flex justify-center py-4 text-5xl font-black text-emerald-500">
        <h1>KES {totalSessionAmount() || 0}</h1>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
        {methods.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedMethod(m.id)}
            className={`my-4 mx-auto flex w-8/12 flex-col items-center justify-center rounded-3xl border ${m.color} p-5 text-white`}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-white">
              <FontAwesomeIcon icon={m.icon} size="2x" />
            </div>
            <span className="mt-3 text-lg font-medium">{m.title}</span>
          </button>
        ))}
      </div>

      {/* One modal that switches content */}
      <ModalBase
        open={!!selectedMethod}
        onClose={() => setSelectedMethod(null)}
        title={`Pay with ${titleMap[selectedMethod] || ""}`}
      >
        <div className="mb-3 text-sm text-gray-600">
          Amount:{totalSessionAmount() || 0}
          <span className="font-semibold">KES {totalSessionAmount() || 0}</span>
        </div>
        {formMap[selectedMethod] || null}
      </ModalBase>
    </>
  );
};

export { Pay };
