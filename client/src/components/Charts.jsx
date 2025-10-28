// src/components/SalesBarChart.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { name: "Mon", sales: 2400 },
  { name: "Tue", sales: 1398 },
  { name: "Wed", sales: 9800 },
  { name: "Thu", sales: 3908 },
  { name: "Fri", sales: 4800 },
  { name: "Sat", sales: 3800 },
  { name: "Sun", sales: 4300 },
];

function SalesBarChart() {
  return (
    <div className="w-full h-72 flex flex-col justify-center">
      <h3 className="text-rose-300 font-semibold mb-5 text-2xl">Weekly Sales</h3>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#bbb" />
          <YAxis stroke="#bbb" />
          <Tooltip />
          <Bar dataKey="sales" fill="#fb7185" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export {SalesBarChart}