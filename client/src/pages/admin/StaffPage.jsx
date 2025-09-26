import { useState } from "react";
import { mockStaff } from "../../data/mockData";
import { X, Edit2 } from "lucide-react";

export default function StaffPage() {
  const [staff, setStaff] = useState(mockStaff);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [search, setSearch] = useState("");

  const filteredStaff = staff.filter((staff) => {
    const id = String(staff.id).toLowerCase();
    const name = String(staff.name).toLowerCase();
    const email = String(staff.email).toLowerCase();
    const phone = String(staff.phone).toLowerCase();

    return (
      id.includes(search.toLowerCase()) ||
      name.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase()) ||
      phone.includes(search.toLowerCase())
    );
  });

  const handleCreate = (newStaff) => {
    setStaff([...staff, { id: staff.length + 1, ...newStaff }]);
    setShowCreateModal(false);
  };

  const handleEdit = (updatedStaff) => {
    setStaff(staff.map((s) => (s.id === updatedStaff.id ? updatedStaff : s)));
    setShowEditModal(false);
  };

  return (
    <div className="p-6 text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Staff</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-rose-600 rounded-lg hover:bg-rose-700"
        >
          + Add Waiter
        </button>
      </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search staff..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="px-3 py-2 w-full rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-600"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-800">
        <table className="w-full bg-gray-900">
          <thead className="bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Available</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((s, i) => (
              <tr
                key={s.id}
                className={`${
                  i % 2 === 0 ? "bg-gray-800/50" : "bg-gray-800"
                } hover:bg-gray-700 transition`}
              >
                <td className="px-4 py-3">{s.name}</td>
                <td className="px-4 py-3">{s.role}</td>
                <td className="px-4 py-3">{s.phone}</td>
                <td className="px-4 py-3">{s.email}</td>
                <td className="px-4 py-3">
                  {s.isAvailable ? (
                    <span className="text-green-400">Yes</span>
                  ) : (
                    <span className="text-rose-400">No</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      setSelectedStaff(s);
                      setShowEditModal(true);
                    }}
                    className="p-2 bg-gray-700 rounded hover:bg-gray-600"
                  >
                    <Edit2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <Modal onClose={() => setShowCreateModal(false)}>
          <StaffForm onSubmit={handleCreate} />
        </Modal>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedStaff && (
        <Modal onClose={() => setShowEditModal(false)}>
          <StaffForm staff={selectedStaff} onSubmit={handleEdit} />
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

/* ----------------- FORM ----------------- */
function StaffForm({ staff, onSubmit }) {
  const [form, setForm] = useState(
    staff || {
      name: "",
      email: "",
      phone: "",
      role: "Waiter",
      isAvailable: true,
      activeOrders: 0,
    }
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, id: staff ? staff.id : Date.now() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold mb-2">
        {staff ? "Edit Waiter" : "Add New Waiter"}
      </h3>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
      />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
      >
        <option value="Waiter">Waiter</option>
        <option value="Manager">Manager</option>
        <option value="Admin">Admin</option>
      </select>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="isAvailable"
          checked={form.isAvailable}
          onChange={handleChange}
        />
        Available
      </label>
      <button
        type="submit"
        className="w-full py-2 bg-rose-600 rounded-lg hover:bg-rose-700"
      >
        {staff ? "Save Changes" : "Create"}
      </button>
    </form>
  );
}
