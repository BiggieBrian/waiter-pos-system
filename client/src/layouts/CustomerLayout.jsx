import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router";
import BottomNav from "../components/bottom-nav";
import axios from "axios";
import { toast } from "react-hot-toast";

const CustomerLayout = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/sessions/${sessionId}`
        );
        const data = res.data;

        if (!data) {
          setError("Session not found");
          return;
        }

        if (data.status === "closed") {
          setError("This session is already closed");
          return;
        }

        setSession(data);
      } catch (err) {
        const msg = err.response?.data?.message || "Invalid session";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchSession();
    }
  }, [sessionId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading session...</p>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">⚠ {error}</h1>
        <p className="text-gray-600">
          Please contact a waiter or scan a qr to start a new session.
        </p>
        <a
          href="/"
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Go Home
        </a>
      </div>
    );
  }

  return (
    <>
      <Outlet />
      <div className="mt-10">
        <BottomNav />
      </div>
    </>
  );
};

export default CustomerLayout;
