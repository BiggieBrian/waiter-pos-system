import React from "react";

export const CashForm = () => (
  <form className="space-y-4">
    <div>
      <label className="block text-sm font-medium">Amount Received</label>
      <input
        type="number"
        className="mt-1 w-full rounded-lg border px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
        placeholder="Enter cash received"
        required
      />
    </div>
    <button
      type="submit"
      className="w-full rounded-lg bg-emerald-500 py-2 text-white"
    >
      Confirm Cash Payment
    </button>
  </form>
);

export const MpesaForm = () => (
  <form className="space-y-4">
    <div>
      <label className="block text-sm font-medium">M-Pesa Phone Number</label>
      <input
        type="tel"
        pattern="[0-9]{10}"
        className="mt-1 w-full rounded-lg border px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
        placeholder="07XXXXXXXX"
        required
      />
    </div>
    <button
      type="submit"
      className="w-full rounded-lg bg-emerald-500 py-2 text-white"
    >
      Send STK Push
    </button>
  </form>
);

export const AirtelForm = () => (
  <form className="space-y-4">
    <div>
      <label className="block text-sm font-medium">
        Airtel Money Phone Number
      </label>
      <input
        type="tel"
        pattern="[0-9]{10}"
        className="mt-1 w-full rounded-lg border px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
        placeholder="07XXXXXXXX"
        required
      />
    </div>
    <button
      type="submit"
      className="w-full rounded-lg bg-emerald-500 py-2 text-white"
    >
      Send Airtel Prompt
    </button>
  </form>
);

export const CardForm = () => (
  <form className="space-y-4">
    <div>
      <label className="block text-sm font-medium">Card Number</label>
      <input
        type="text"
        inputMode="numeric"
        className="mt-1 w-full rounded-lg border px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
        placeholder="1234 5678 9012 3456"
        required
      />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium">Expiry Date</label>
        <input
          type="text"
          placeholder="MM/YY"
          className="mt-1 w-full rounded-lg border px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">CVV</label>
        <input
          type="password"
          placeholder="123"
          className="mt-1 w-full rounded-lg border px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
          required
        />
      </div>
    </div>
    <button
      type="submit"
      className="w-full rounded-lg bg-emerald-500 py-2 text-white"
    >
      Pay Now
    </button>
  </form>
);
