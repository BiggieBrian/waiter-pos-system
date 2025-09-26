import { Menu } from "lucide-react";
import mascot from "../../assets/mascot.png";

export default function Navbar({ setIsOpen }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-transparent backdrop-blur text-gray-100">
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
        <input
          type="text"
          placeholder="Search..."
          className="hidden sm:block px-3 py-1 rounded-md border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-400"
        />
        <div className="w-8 h-8 rounded-full bg-rose-700 flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </div>
  );
}
