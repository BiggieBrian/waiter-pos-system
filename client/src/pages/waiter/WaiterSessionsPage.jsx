import React, { useState, useEffect } from "react";
import { SessionCard } from "../../components/SessionCard";

const WaiterSessionsPage = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Retrieve session orders from localStorage
    const savedOrders =
      JSON.parse(localStorage.getItem("Session Orders")) || [];

    // Wrap into session object for frontend display
    const sessionData = [
      {
        sessionId: "sess_101",
        tableId: "T03",
        status: "Active",
        orders: savedOrders,
      },
    ];

    setSessions(sessionData);
  }, []);

  return (
    <div className="p-4 grid gap-4 mb-20">
      {sessions.length > 0 ? (
        sessions.map((s) => <SessionCard key={s.sessionId} session={s} />)
      ) : (
        <p className="text-center text-gray-500 mt-10">No active sessions</p>
      )}
    </div>
  );
};

export { WaiterSessionsPage };
