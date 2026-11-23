
"use client";

import { useState } from "react";
import { Search, Eye } from "lucide-react";

export interface Purchase {
  id: string;
  supplier: string;
  date: string;
  items: number;
  total: number;
  status: "Received" | "Pending";
}

interface PurchaseTableProps {
  purchases: Purchase[];
}

export default function PurchaseTable({ purchases }: PurchaseTableProps) {
  const [search, setSearch] = useState("");

  const filteredPurchases = purchases.filter(
    (purchase) =>
      purchase.id.toLowerCase().includes(search.toLowerCase()) ||
      purchase.supplier.toLowerCase().includes(search.toLowerCase())
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
            placeholder="Search purchase or supplier..."
            className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px] text-left">
          <thead className="bg-gray-50">
            <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-5 py-4">Purchase ID</th>
              <th className="px-5 py-4">Supplier</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Items</th>
              <th className="px-5 py-4">Total</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredPurchases.map((purchase) => (
              <tr key={purchase.id} className="hover:bg-gray-50">
                <td className="px-5 py-4 text-sm font-semibold text-blue-600">
                  {purchase.id}
                </td>
                <td className="px-5 py-4 text-sm font-medium text-gray-800">
                  {purchase.supplier}
                </td>
                <td className="px-5 py-4 text-sm text-gray-500">
                  {purchase.date}
                </td>
                <td className="px-5 py-4 text-sm text-gray-600">
                  {purchase.items}
                </td>
                <td className="px-5 py-4 text-sm font-semibold text-gray-800">
                  ₹{purchase.total.toLocaleString("en-IN")}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      purchase.status === "Received"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {purchase.status}
                  </span>
                </td>
              </tr>
            ))}

            {filteredPurchases.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-400">
                  No purchases found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
        Showing {filteredPurchases.length} of {purchases.length} purchases
      </div>
    </div>
  );
}
