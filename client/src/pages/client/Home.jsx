import React from "react";
import { StatCard } from "../../components/StatCard";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const [sessionOrders, setSessionOrders] = useState([]);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("Session Orders")) || [];
    setSessionOrders(saved);
  }, []);
  const totalSessionAmount = () =>
    sessionOrders.reduce((total, order) => total + order.total, 0);

  const [profile, setProfile] = useState({ name: "", mobile: "" });
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("Profile Details"));
    if (storedProfile) {
      setProfile(storedProfile);
    }
  }, []);
  const name = profile.name.charAt(0).toUpperCase() + profile.name.slice(1);
  return (
    <>
      <header className="w-11/12 mx-auto py-2">
        <div className="flex flex-col md:flex-row justify-between py-3 gap-3">
          <div>
            <h1 className="text-2xl py-2">Whizperz Cafe and Pizza</h1>
            <p className="text-2xl text-emerald-500">
              Table <span>9</span>
            </p>
          </div>
        </div>
      </header>
      <br />
      <div className="p-4 space-y-4">
        <StatCard title="Total Orders Made" value={sessionOrders.length} />
        <StatCard
          title="Total Session Amount"
          value={`KES ${totalSessionAmount() || 0}`}
        />
      </div>
    </>
  );
};

export { Home };
