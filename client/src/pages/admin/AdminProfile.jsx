import { useState } from "react";
import { User, Mail, Shield, Save } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminProfile() {
  const [form, setForm] = useState({
    username: "admin",
    email: "admin@whizperz.com",
    role: "Super Admin",
    password: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // call API to update
    toast.success("Profile updated successfully!");
    setForm({ ...form, password: "", newPassword: "" });
  };

  return (
    <div className=" mx-auto rounded-2xl shadow-lg p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-rose-700 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
          A
        </div>
        <div>
          <h2 className="text-2xl font-bold text-rose-400">Admin Profile</h2>
          <p className="text-gray-400">Manage your account information</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username */}
        <div>
          <label className="block mb-1 text-gray-300">Username</label>
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-3">
            <User className="text-gray-400" size={18} />
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full bg-transparent py-2 outline-none text-white"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-gray-300">Email</label>
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-3">
            <Mail className="text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-transparent py-2 outline-none text-white"
            />
          </div>
        </div>

        {/* Role (readonly) */}
        <div>
          <label className="block mb-1 text-gray-300">Role</label>
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-3">
            <Shield className="text-gray-400" size={18} />
            <input
              type="text"
              value={form.role}
              disabled
              className="w-full bg-transparent py-2 outline-none text-gray-400 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Password Update */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-gray-300">Current Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-gray-800 rounded-lg px-3 py-2 text-white outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-300">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full bg-gray-800 rounded-lg px-3 py-2 text-white outline-none"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 transition-colors px-4 py-2 rounded-lg text-white font-semibold shadow-lg shadow-rose-900/30 w-full md:w-auto"
        >
          <Save size={18} /> Save Changes
        </button>
      </form>
    </div>
  );
}
