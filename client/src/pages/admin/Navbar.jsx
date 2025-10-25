import { Menu, User, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mascot from "../../assets/mascot.png";

export default function Navbar({ setIsOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-transparent backdrop-blur text-gray-100 relative">
      {/* Left side */}
      <div className="flex items-center gap-2">
        <button
          className="md:hidden p-2 rounded hover:bg-gray-800"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-bold">Dashboard</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Restaurant Info */}
        <div className="flex items-center gap-2">
          <img
            src={mascot}
            alt="Restaurant Logo"
            className="w-8 h-8 rounded-full object-cover border border-gray-700"
          />
          <span className="font-semibold">Whizperz Cafe & Pizza</span>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="hidden sm:block px-3 py-1 rounded-md border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-400"
        />

        {/* User Menu */}
        <div className="relative">
          <div
            className="w-8 h-8 rounded-full bg-rose-700 flex items-center justify-center text-white font-bold cursor-pointer select-none"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            A
          </div>

          {menuOpen && (
            <div className="absolute  right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
              <button
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 w-full text-left"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/admin/profile");
                }}
              >
                <User size={16} /> Profile
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 w-full text-left"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/admin/settings");
                }}
              >
                <Settings size={16} /> Settings
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 w-full text-left text-rose-400"
                onClick={handleLogout}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
