import { useState, useEffect } from "react";
import axios from "axios";
import { X, Edit2, Trash2 } from "lucide-react";

export default function StaffPage() {
  const [staff, setStaff] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [search, setSearch] = useState("");

  // ✅ Fetch all users
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setStaff(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    getUsers();
  }, []);

  // ✅ Search Filter
  const filteredStaff = staff.filter((s) => {
    const term = search.toLowerCase();
    return (
      s.name?.toLowerCase().includes(term) ||
      s.email?.toLowerCase().includes(term) ||
      s.phone?.toLowerCase().includes(term) ||
      s.role?.toLowerCase().includes(term)
    );
  });

  // ✅ Create new staff
  const handleCreate = async (newStaff) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users", newStaff);
      setStaff((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setShowCreateModal(false);
    }
  };

  // ✅ Edit staff
  const handleEdit = async (updatedStaff) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${updatedStaff._id}`,
        updatedStaff
      );
      setStaff((prev) =>
        prev.map((s) => (s._id === updatedStaff._id ? response.data : s))
      );
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setShowEditModal(false);
    }
  };

  // ✅ Delete staff
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this staff member?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setStaff((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-6 text-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Staff</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-rose-600 rounded-lg hover:bg-rose-700"
        >
          + Add Staff Member
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search staff..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 w-full rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-600"
        />
      </div>

      {/* Staff Table */}
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
                key={s._id}
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
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedStaff(s);
                      setShowEditModal(true);
                    }}
                    className="p-2 bg-gray-700 rounded hover:bg-gray-600"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="p-2 bg-rose-700 rounded hover:bg-rose-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredStaff.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-400">
                  No staff found
                </td>
              </tr>
            )}
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

/* ----------------- MODAL ----------------- */
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

/* ----------------- STAFF FORM ----------------- */
function StaffForm({ staff, onSubmit }) {
  const [form, setForm] = useState(
    staff || {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "Waiter",
      isAvailable: true,
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
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold mb-2">
        {staff ? "Edit Staff Member" : "Add New Staff Member"}
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

            <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
      />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
      >
        <option value="Manager">Manager</option>
        <option value="Cashier">Cashier</option>
        <option value="Chef">Chef</option>
        <option value="Waiter">Waiter</option>
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
