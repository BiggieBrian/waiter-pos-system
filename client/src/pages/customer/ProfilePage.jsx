"use client";

import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router";

export default function ProfilePage() {
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const { sessionId } = useParams();

  useEffect(() => {
    const getSessionUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/sessions/${sessionId}`
        );
        setUserName(response.data.customerName);
        setUserPhone(response.data.customerPhone);
      } catch (error) {
        console.log(error);
      }
    };
    getSessionUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between border-b">
        <Link to={`/session/${sessionId}`}>
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">Profile</h1>
        <div></div>
      </div>

      <div className="p-4 space-y-6">
        {/* User Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-bold">{userName}</h2>
          </div>
          <p className="text-xl text-gray-600">{userPhone}</p>
        </div>

        {/* Stats Cards */}

        {/* Divider */}
        <div className="border-t-1 border-gray-900 my-6"></div>

        {/* Community Section */}
        <div className="text-center space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Loved our services? Consider joining our community to get news on
            offers and events at our restaurant.
          </p>

          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl text-lg font-bold">
            Join the Whizperz Cafe & Pizza community
          </button>
        </div>
      </div>
    </div>
  );
}
