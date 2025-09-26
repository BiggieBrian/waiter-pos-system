import { mockCustomers } from "../../data/mockData";

export default function CustomersPage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Customers</h2>
      <table className="w-full border border-gray-800 bg-gray-900 rounded-lg">
        <thead className="bg-gray-800 text-gray-400">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Visits</th>
            <th className="px-4 py-2 text-left">Last Visit</th>
          </tr>
        </thead>
        <tbody>
          {mockCustomers.map((customer) => (
            <tr
              key={customer.id}
              className="border-t border-gray-800 hover:bg-gray-800"
            >
              <td className="px-4 py-2">{customer.name}</td>
              <td className="px-4 py-2">{customer.email}</td>
              <td className="px-4 py-2">{customer.visits}</td>
              <td className="px-4 py-2">{customer.lastVisit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
