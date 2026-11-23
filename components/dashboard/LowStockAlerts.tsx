
import { AlertTriangle, ArrowRight } from "lucide-react";
import { lowStockItems } from "@/components/data/mockData";

export default function LowStockAlerts() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Low Stock Alerts
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Products that need attention
          </p>
        </div>

        <div className="rounded-xl bg-amber-50 p-2 text-amber-600">
          <AlertTriangle size={20} />
        </div>
      </div>

      <div className="space-y-5">
        {lowStockItems.map((item) => (
          <div key={item.id}>
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400">{item.sku}</p>
              </div>

              <span className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                {item.stock} left
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-amber-500"
                style={{
                  width: `${Math.min(
                    (item.stock / item.minStock) * 100,
                    100
                  )}%`,
                }}
              />
            </div>

            <p className="mt-1 text-xs text-gray-400">
              Minimum stock: {item.minStock}
            </p>
          </div>
        ))}
      </div>

      <button className="mt-6 flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
        View Inventory
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
