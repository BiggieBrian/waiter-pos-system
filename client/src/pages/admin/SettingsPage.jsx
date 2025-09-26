// src/pages/admin/Settings.jsx
import React, { useState } from "react";

export default function AdminSettings() {
  const [restaurantName, setRestaurantName] = useState("My Restaurant");
  const [address, setAddress] = useState("123 Main Street, Nairobi");
  const [phone, setPhone] = useState("+254 712 345 678");
  const [currency, setCurrency] = useState("KES");
  const [taxRate, setTaxRate] = useState(16);

  const handleSave = () => {
    alert("Settings saved!");
    // You can later hook this into backend API
  };

  return (
    <div className="p-6 space-y-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {/* Restaurant Info */}
      <div className="p-4 bg-gray-900 rounded-lg border border-gray-700 space-y-4">
        <h2 className="text-lg font-semibold">Restaurant Information</h2>
        <div className="space-y-2">
          <label className="block text-sm">Restaurant Name</label>
          <input
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
        </div>
      </div>

      {/* Preferences */}
      <div className="p-4 bg-gray-900 rounded-lg border border-gray-700 space-y-4">
        <h2 className="text-lg font-semibold">Preferences</h2>
        <div className="space-y-2">
          <label className="block text-sm">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          >
            <option value="KES">KES - Kenyan Shilling</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm">Tax Rate (%)</label>
          <input
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
        </div>
      </div>

      {/* Save Button */}
      <div>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-rose-800 hover:bg-rose-900 rounded text-white"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
