
"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { salesOverview } from "@/components/data/mockData";
export default function SalesOverview() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Sales Overview
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Monthly sales and purchases
        </p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesOverview}>
            <defs>
              <linearGradient id="salesColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="purchaseColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f4" />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />

            <Tooltip
              formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`]}
            />

            <Area
              type="monotone"
              dataKey="sales"
              stroke="#2563eb"
              strokeWidth={2.5}
              fill="url(#salesColor)"
            />

            <Area
              type="monotone"
              dataKey="purchases"
              stroke="#10b981"
              strokeWidth={2.5}
              fill="url(#purchaseColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
          Sales
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          Purchases
        </div>
      </div>
    </div>
  );
}
