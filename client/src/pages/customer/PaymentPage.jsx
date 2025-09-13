import { useState } from "react";
import {
  ArrowLeft,
  User,
  Banknote,
  Smartphone,
  CreditCard,
} from "lucide-react";
import { Link } from "react-router";

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("cash");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("0723916573");

  const total = 123456.78;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between border-b">
        <Link to={"/session"}>
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">Checkout</h1>
        <Link to={"/session/profile"}>
          <User className="w-8 h-8" />
        </Link>
      </div>

      <div className="p-4 space-y-4">
        {/* Cash Payment */}
        <div
          onClick={() => setSelectedMethod("cash")}
          className={`cursor-pointer bg-white rounded-xl p-4 border-2 ${
            selectedMethod === "cash" ? "border-red-500" : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Banknote className="w-8 h-8 text-gray-700" />
              <span className="font-bold text-lg">Cash</span>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === "cash"
                  ? "border-red-500 bg-red-500"
                  : "border-gray-300"
              }`}
            >
              {selectedMethod === "cash" && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Money */}
        <div
          onClick={() => setSelectedMethod("mobile")}
          className={`cursor-pointer bg-white rounded-xl p-4 border-2 ${
            selectedMethod === "mobile" ? "border-red-500" : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Smartphone className="w-8 h-8 text-gray-700" />
              <div>
                <div className="font-bold text-lg">Mobile</div>
                <div className="font-bold text-lg">Money</div>
              </div>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === "mobile"
                  ? "border-red-500 bg-red-500"
                  : "border-gray-300"
              }`}
            >
              {selectedMethod === "mobile" && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </div>
          </div>
          {selectedMethod === "mobile" && (
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full h-12 rounded-xl border-gray-200 px-3"
            />
          )}
        </div>

        {/* Credit/Debit Card */}
        <div
          onClick={() => setSelectedMethod("card")}
          className={`cursor-pointer bg-white rounded-xl p-4 border-2 ${
            selectedMethod === "card" ? "border-red-500" : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-gray-700" />
              <div>
                <div className="font-bold text-lg">Debit/</div>
                <div className="font-bold text-lg">Credit Card</div>
              </div>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === "card"
                  ? "border-red-500 bg-red-500"
                  : "border-gray-300"
              }`}
            >
              {selectedMethod === "card" && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </div>
          </div>
          {selectedMethod === "card" && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full h-12 rounded-xl border-gray-200 px-3"
              />
              <input
                type="text"
                placeholder="Name"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="w-full h-12 rounded-xl border-gray-200 px-3"
              />
              <input
                type="text"
                placeholder="Expiry Date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full h-12 rounded-xl border-gray-200 px-3"
              />
              <input
                type="text"
                placeholder="CVV/CVC"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-full h-12 rounded-xl border-gray-200 px-3"
              />
            </div>
          )}
        </div>

        {/* Total and Pay Button */}
        <div className="bg-white rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold">Total:</span>
            <div className="text-2xl font-bold">${total.toLocaleString()}</div>
          </div>
          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl text-lg font-bold">
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
