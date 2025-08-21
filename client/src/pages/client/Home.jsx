import React from "react";
import { StatCard } from "../../components/StatCard";
import { orders } from "./Orders";
import { useEffect } from "react";
import { useState } from "react";

const totalSessionAmount = () => {
  let sum = 0;
  orders.forEach((order) => {
    sum += order.total;
  });
  return sum;
};

const Home = () => {
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
      <div>
        <h1 className="text-2xl">Welcome, {name}</h1>
      </div>
      <br />
      <div className="p-4 space-y-4">
        <StatCard title="Total Orders Made" value={orders.length} />
        <StatCard
          title="Total Session Amount"
          value={`KES ${totalSessionAmount()}`}
        />
      </div>
    </>
  );
};

export { Home };
export { totalSessionAmount };
