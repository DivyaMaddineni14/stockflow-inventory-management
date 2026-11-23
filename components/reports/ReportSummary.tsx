
const stats = [
  { title: "Total Revenue", value: "₹44,799", color: "text-green-600" },
  { title: "Total Purchases", value: "₹1,19,250", color: "text-blue-600" },
  { title: "Total Products", value: "8", color: "text-purple-600" },
  { title: "Low Stock Items", value: "3", color: "text-orange-600" },
];

export default function ReportSummary() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.title} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">{stat.title}</p>
          <h2 className={`mt-2 text-2xl font-bold ${stat.color}`}>
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}
