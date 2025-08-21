const StatCard = ({ title, value }) => {
  return (
    <div className="bg-black border border-gray-700 rounded-xl p-4 text-center text-white  mx-auto shadow-md">
      {/* Title */}
      <h3 className="text-xl text-gray-300">{title}</h3>

      {/* Value */}
      <p className="text-emerald-500 text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};

export { StatCard };
