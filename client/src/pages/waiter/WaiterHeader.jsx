import React from "react";
const waiterName = "John";
const WaiterHeader = () => {
  return (
    <header className="bg-emerald-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="font-bold text-lg">eWaiter</h1>
      <div className="flex items-center gap-2">
        <span className="text-sm">Hi, {waiterName}</span>
        <div className="w-8 h-8 rounded-full bg-white text-emerald-600 flex items-center justify-center font-bold">
          {waiterName.charAt(0)}
        </div>
      </div>
    </header>
  );
};

export { WaiterHeader };
