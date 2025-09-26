export default function KpiCard({ title, value }) {
  return (
    <div
      className="p-4 rounded-xl border border-gray-800 bg-gray-900
                 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <h4 className="text-sm font-medium text-gray-400">{title}</h4>
      <p className="mt-2 text-2xl font-bold text-rose-400">{value}</p>
    </div>
  );
}
