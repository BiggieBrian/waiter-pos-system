import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserCog } from "lucide-react"; // admin icon

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/admin/login",
        {
          username,
          password,
        }
      );

      if (response.data.success) {
        toast.success("Successful Log In");
        setUsername("");
        setPassword("");
        setIsAdmin(true); // updates state
        localStorage.setItem("isAdmin", "true"); // save persistent login
        navigate("/admin");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Invalid Username or Password");
      } else {
        toast.error("Server Error — Try Again Later");
      }
    }
  };

  return (
    <main className="bg-gradient-to-br from-rose-950 via-gray-900 to-black min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating background circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-rose-700 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-rose-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl space-y-6 w-96 border border-rose-700/50"
      >
        {/* Icon + Title */}
        <div className="flex flex-col items-center space-y-2">
          <UserCog className="w-12 h-12 text-rose-500" />
          <h1 className="text-2xl font-bold text-rose-400">Admin Login</h1>
          <p className="text-gray-400 text-sm text-center">
            Welcome back! Please log in with your admin credentials to access
            the dashboard.
          </p>
        </div>

        {/* Username */}
        <div>
          <label className="block mb-1 text-gray-300">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring focus:ring-rose-400/30 outline-none"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-rose-500 focus:ring focus:ring-rose-400/30 outline-none"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-rose-600 hover:bg-rose-700 transition-colors py-2 rounded-lg text-white font-semibold shadow-lg shadow-rose-900/30"
        >
          Log In
        </button>
      </form>
    </main>
  );
};

export default Login;
