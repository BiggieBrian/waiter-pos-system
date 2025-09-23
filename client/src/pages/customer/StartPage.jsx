import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import mascot from "../../assets/mascot.png";

const StartPage = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sessionActive, setSessionActive] = useState(false);

  // ✅ Check if session already exists for this table
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/sessions/active`
        );
        const tableSession = res.data.find(
          (s) => s.table._id === tableId && s.status === "Active"
        );
        if (tableSession) {
          setSessionActive(true);
          toast.error("This table is already in use.");
        }
      } catch (err) {
        toast.error("Error checking table status.");
        console.error(err);
      }
    };
    checkSession();
  }, [tableId]);

  const handleStart = async () => {
    if (!name || !phone) {
      toast.error("Please enter your name and phone.");
      return;
    }

    localStorage.setItem("userPhone", JSON.stringify(phone));
    localStorage.setItem("userName", JSON.stringify(name));
    try {
      const res = await axios.post(
        `http://localhost:5000/api/sessions/${tableId}`,
        {
          customerName: name,
          customerPhone: phone,
        }
      );

      toast.success("Session started! Redirecting to menu...");

      const sessionId = res.data.session._id; // ✅ correct path

      // ⏩ Navigate to Menu page with sessionId
      navigate(`/session/${sessionId}`);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Error starting session. Try again."
      );
      console.error(err);
    }
  };

  if (sessionActive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">This table is in use</h2>
          <p className="text-gray-600">
            A session has already been started. Please wait for service.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#de2a25] flex flex-col items-center justify-end">
      <div className="bg-white rounded-t-3xl p-8 pb-15 w-full shadow-lg">
        <div className="text-start mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Start</h1>
          <div className="flex items-center justify-center">
            <img src={mascot} alt="mascot" />
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-12 h-12 border-2 border-black rounded-xl focus:border-[#de2a25] w-full"
          />
          <input
            type="tel"
            placeholder="Mobile"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="pl-12 h-12 border-2 border-black rounded-xl focus:border-[#de2a25] w-full"
          />
        </div>

        <button
          onClick={handleStart}
          disabled={!name || !phone}
          className="w-full h-12 bg-[#de2a25] hover:bg-red-600 text-white font-bold rounded-xl text-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default StartPage;
