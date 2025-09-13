import React, { useState, useEffect } from "react";
import { Search, User, ChevronDown } from "lucide-react";
import { Link } from "react-router";
import bag from "../../assets/bag.png";
import axios from "axios";

// Sample menu

// Extract categories dynamically

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const redbg = "bg-[#de2a25]";

  const categories = [
    "All",
    ...new Set(menuItems.map((item) => item.category)),
  ];

  // Filtering logic (both search + category)
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const getMenu = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/menu");
        setMenuItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getMenu();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className={`${redbg} text-white p-6 rounded-b-3xl`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Whizperz Cafe</h1>
            <h2 className="text-2xl font-bold">& Pizza</h2>
          </div>
          <Link to={"/session/profile"}>
            <User className="w-8 h-8" />
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Table 9</h3>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your favorite food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 w-full rounded-xl border-gray-200 focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Category dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-12 rounded-xl border-gray-300 text-gray-700 pl-3 pr-8 bg-white focus:ring-2 focus:ring-red-500"
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm flex gap-4"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
                <img src={bag} alt="" className="size-15" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-red-500 font-bold text-lg">
                    Ksh {item.price}
                  </span>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No items found.</p>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
