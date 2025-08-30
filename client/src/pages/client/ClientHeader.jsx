import React from "react";

import { useEffect } from "react";
import { useState } from "react";
const ClientHeader = () => {
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
      <header className="bg-emerald-600 text-white p-8 flex justify-between items-center shadow-md rounded-b-xl">
        <h1 className="font-bold text-lg">eWaiter</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm">Hi, {name}</span>
          <div className="w-8 h-8 rounded-full bg-white text-emerald-600 flex items-center justify-center font-bold">
            {name.charAt(0)}
          </div>
        </div>
      </header>
    </>
  );
};

export { ClientHeader };
