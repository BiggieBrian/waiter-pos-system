import { mockSessions } from "../../data/mockData";

export default function SessionsPage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Sessions</h2>
      <table className="w-full border border-gray-800 bg-gray-900 rounded-lg">
        <thead className="bg-gray-800 text-gray-400">
          <tr>
            <th className="px-4 py-2 text-left">Session ID</th>
            <th className="px-4 py-2 text-left">Table</th>
            <th className="px-4 py-2 text-left">Customer</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Started At</th>
          </tr>
        </thead>
        <tbody>
          {mockSessions.map((session) => (
            <tr
              key={session.id}
              className="border-t border-gray-800 hover:bg-gray-800"
            >
              <td className="px-4 py-2">{session.id}</td>
              <td className="px-4 py-2">{session.table}</td>
              <td className="px-4 py-2">{session.customer}</td>
              <td className="px-4 py-2 text-rose-500">{session.status}</td>
              <td className="px-4 py-2">{session.startedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
