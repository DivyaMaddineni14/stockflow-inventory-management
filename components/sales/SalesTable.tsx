
"use client";

import { useState } from "react";
import { Search, Eye } from "lucide-react";

export interface Sale {
  id: string;
  customer: string;
  date: string;
  items: number;
  total: number;
  status: "Completed" | "Pending";
}

interface SalesTableProps {
  sales: Sale[];
}

export default function SalesTable({ sales }: SalesTableProps) {
  const [search, setSearch] = useState("");

  const filteredSales = sales.filter(
    (sale) =>
      sale.id.toLowerCase().includes(search.toLowerCase()) ||
      sale.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 p-5">
        <div className="relative max-w-sm">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search invoice or customer..."
            className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px] text-left">
          <thead className="bg-gray-50">
            <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-5 py-4">Invoice</th>
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Items</th>
              <th className="px-5 py-4">Total</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredSales.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-50">
                <td className="px-5 py-4 text-sm font-semibold text-blue-600">
                  {sale.id}
                </td>

                <td className="px-5 py-4 text-sm font-medium text-gray-800">
                  {sale.customer}
                </td>

                <td className="px-5 py-4 text-sm text-gray-500">
                  {sale.date}
                </td>

                <td className="px-5 py-4 text-sm text-gray-600">
                  {sale.items}
                </td>

                <td className="px-5 py-4 text-sm font-semibold text-gray-800">
                  ₹{sale.total.toLocaleString("en-IN")}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      sale.status === "Completed"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {sale.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <button
                    title="View invoice"
                    onClick={() => alert(`Invoice ${sale.id}`)}
                    className="rounded-lg p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Eye size={17} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredSales.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-sm text-gray-400">
                  No sales found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
        Showing {filteredSales.length} of {sales.length} sales
      </div>
    </div>
  );
}
