import { useState } from "react";
import { mockMenu } from "../../data/mockData.js";
import menuPlaceholder from "../../assets/menuPlaceholder.jpg";

export default function MenuPage() {
  const [menu, setMenu] = useState(mockMenu);
  const [search, setSearch] = useState("");
  const [newItem, setNewItem] = useState({
    name: "",
    category: "Main",
    description: "",
    price: "",
    inStock: true,
    imageUrl: "",
    stockQty: 0,
  });
  const [editingItem, setEditingItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Filtered list
  const filteredMenu = menu.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Add new item
  const handleAddItem = () => {
    if (!newItem.name || !newItem.price) return;
    setMenu([
      ...menu,
      { ...newItem, id: Date.now().toString(), price: Number(newItem.price) },
    ]);
    setNewItem({
      name: "",
      category: "Main",
      description: "",
      price: "",
      inStock: true,
      imageUrl: "",
      stockQty: 0,
    });
    setShowAddModal(false);
  };

  // Save edited item
  const handleSaveEdit = () => {
    setMenu(
      menu.map((item) => (item.id === editingItem.id ? editingItem : item))
    );
    setEditingItem(null);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-brand">Menu</h2>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-rose-600 rounded-lg hover:bg-rose-700"
        >
          Add New Item
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="px-3 py-2 w-full rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-600"
        />
      </div>

      {/* 🍽 Menu Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5">
        {filteredMenu.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 border border-gray-700 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={item.imageUrl || menuPlaceholder}
              alt={item.name}
              className="w-full h-32 sm:h-40 object-cover"
              onError={(e) => (e.currentTarget.src = menuPlaceholder)}
            />
            <div className="p-3 space-y-2">
              <h3 className="text-base sm:text-lg font-semibold text-white truncate">
                {item.name}
              </h3>
              <p className="text-xs text-gray-400">{item.category}</p>
              <p className="text-sm text-gray-300 line-clamp-2">
                {item.description}
              </p>
              <p className="text-brand font-bold">KES {item.price}</p>
              <p className="text-xs">
                {item.inStock ? (
                  <span className="text-green-500">In Stock</span>
                ) : (
                  <span className="text-rose-500">Out of Stock</span>
                )}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingItem(item)}
                  className="flex-1 px-4 py-2 text-xs sm:text-sm bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => setMenu(menu.filter((m) => m.id !== item.id))}
                  className="flex-1 px-4 py-2 text-xs sm:text-sm bg-rose-600 rounded hover:bg-rose-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ➕ Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 max-w-[90%] space-y-3">
            <h3 className="text-lg font-bold text-white">Add New Item</h3>

            <label className="block text-sm text-gray-300">
              Name
              <input
                type="text"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                className="mt-1 w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
              />
            </label>

            <label className="block text-sm text-gray-300">
              Category
              <select
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({ ...newItem, category: e.target.value })
                }
                className="mt-1 w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
              >
                <option>Main</option>
                <option>Side</option>
                <option>Drink</option>
                <option>Dessert</option>
                <option>Other</option>
              </select>
            </label>

            <label className="block text-sm text-gray-300">
              Price (KES)
              <input
                type="number"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: e.target.value })
                }
                className="mt-1 w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
              />
            </label>

            <label className="block text-sm text-gray-300">
              Description
              <textarea
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
                className="mt-1 w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
              />
            </label>

            <label className="block text-sm text-gray-300">
              Image URL
              <input
                type="text"
                value={newItem.imageUrl}
                onChange={(e) =>
                  setNewItem({ ...newItem, imageUrl: e.target.value })
                }
                className="mt-1 w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
              />
            </label>

            <label className="flex items-center space-x-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={newItem.inStock}
                onChange={(e) =>
                  setNewItem({ ...newItem, inStock: e.target.checked })
                }
                className="rounded"
              />
              <span>In Stock</span>
            </label>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✏️ Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 max-w-[90%] space-y-3">
            <h3 className="text-lg font-bold text-white">Edit Item</h3>

            <label className="block text-sm text-gray-300">
              Name
              <input
                type="text"
                value={editingItem.name}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, name: e.target.value })
                }
                className="mt-1 w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
              />
            </label>

            <label className="block text-sm text-gray-300">
              Category
              <select
                value={editingItem.category}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, category: e.target.value })
                }
                className="mt-1 w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
              >
                <option>Main</option>
                <option>Side</option>
                <option>Drink</option>
                <option>Dessert</option>
                <option>Other</option>
              </select>
            </label>

            <label className="block text-sm text-gray-300">
              Price (KES)
              <input
                type="number"
                value={editingItem.price}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, price: e.target.value })
                }
                className="mt-1 w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
              />
            </label>

            <label className="block text-sm text-gray-300">
              Description
              <textarea
                value={editingItem.description}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    description: e.target.value,
                  })
                }
                className="mt-1 w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
              />
            </label>

            <label className="block text-sm text-gray-300">
              Image URL
              <input
                type="text"
                value={editingItem.imageUrl}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, imageUrl: e.target.value })
                }
                className="mt-1 w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
              />
            </label>

            <label className="flex items-center space-x-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={editingItem.inStock}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    inStock: e.target.checked,
                  })
                }
                className="rounded"
              />
              <span>In Stock</span>
            </label>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
