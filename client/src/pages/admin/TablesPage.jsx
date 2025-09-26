import { useState } from "react";
import { mockTables } from "../../data/mockData";
import { X } from "lucide-react";

export default function AdminTables() {
  const [tables, setTables] = useState(mockTables);
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);

  // Filter by table number
  const filteredTables = tables.filter((table) =>
    table.number.toString().includes(search)
  );

  const handleCreateTable = (newTable) => {
    setTables([...tables, { id: tables.length + 1, ...newTable }]);
    setShowCreateModal(false);
  };

  const handleBulkCreate = (count) => {
    const newTables = Array.from({ length: count }, (_, i) => ({
      id: tables.length + i + 1,
      number: tables.length + i + 1,
      capacity: Math.floor(Math.random() * 6) + 2,
      status: "Available",
      qrData: `https://restaurant.com/tables/${tables.length + i + 1}`,
      qrCode: "placeholder.png",
    }));
    setTables([...tables, ...newTables]);
    setShowBulkModal(false);
  };

  return (
    <div className="p-6 text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tables</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-rose-600 rounded-lg hover:bg-rose-700"
          >
            + Create Table
          </button>
          <button
            onClick={() => setShowBulkModal(true)}
            className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            + Bulk Create
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by table number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-rose-500"
        />
      </div>

      {/* Table Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTables.map((table) => (
          <div
            key={table.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold mb-2">Table {table.number}</h3>
            <p className="text-sm text-gray-400 mb-1">
              Capacity: {table.capacity}
            </p>
            <p className="text-sm mb-2">
              Status:{" "}
              <span
                className={
                  table.status === "Available"
                    ? "text-green-500"
                    : table.status === "Occupied"
                    ? "text-yellow-500"
                    : "text-rose-500"
                }
              >
                {table.status}
              </span>
            </p>
            <button className="mt-2 text-sm px-3 py-1 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700">
              View QR
            </button>
          </div>
        ))}
      </div>

      {/* Create Table Modal */}
      {showCreateModal && (
        <Modal onClose={() => setShowCreateModal(false)}>
          <CreateTableForm onSubmit={handleCreateTable} />
        </Modal>
      )}

      {/* Bulk Create Modal */}
      {showBulkModal && (
        <Modal onClose={() => setShowBulkModal(false)}>
          <BulkCreateForm onSubmit={handleBulkCreate} />
        </Modal>
      )}
    </div>
  );
}

/* ----------------- MODALS ----------------- */
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}

function CreateTableForm({ onSubmit }) {
  const [form, setForm] = useState({
    number: "",
    capacity: "",
    status: "Available",
    qrData: "",
    qrCode: "placeholder.png",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <h3 className="text-xl font-semibold">Create Table</h3>
      <input
        type="number"
        name="number"
        placeholder="Table Number"
        value={form.number}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
        required
      />
      <input
        type="number"
        name="capacity"
        placeholder="Capacity"
        value={form.capacity}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
        required
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
      >
        <option value="Available">Available</option>
        <option value="Occupied">Occupied</option>
        <option value="Reserved">Reserved</option>
      </select>
      <input
        type="text"
        name="qrData"
        placeholder="QR Data URL"
        value={form.qrData}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
      />
      <button
        type="submit"
        className="w-full py-2 bg-rose-600 rounded-lg hover:bg-rose-700"
      >
        Create
      </button>
    </form>
  );
}

function BulkCreateForm({ onSubmit }) {
  const [count, setCount] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(Number(count));
      }}
      className="space-y-4"
    >
      <h3 className="text-xl font-semibold">Bulk Create Tables</h3>
      <input
        type="number"
        placeholder="Number of tables"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
        required
      />
      <button
        type="submit"
        className="w-full py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
      >
        Create
      </button>
    </form>
  );
}
