
"use client";

import { IndianRupee, ShoppingCart, Receipt, Clock } from "lucide-react";

interface Sale {
  id: string;
  customer: string;
  date: string;
  items: number;
  total: number;
  status: string;
}

interface SalesSummaryProps {
  sales: Sale[];
}

export default function SalesSummary({ sales }: SalesSummaryProps) {
  const completedSales = sales.filter((sale) => sale.status === "Completed");
  const totalRevenue = completedSales.reduce(
    (sum, sale) => sum + sale.total,
    0
  );
  const totalOrders = completedSales.length;
  const pendingOrders = sales.filter(
    (sale) => sale.status === "Pending"
  ).length;

  const cards = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Completed Sales",
      value: totalOrders,
      icon: ShoppingCart,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Invoices",
      value: sales.length,
      icon: Receipt,
      color: "bg-violet-50 text-violet-600",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{card.title}</p>
              <div className={`rounded-xl p-2.5 ${card.color}`}>
                <Icon size={20} />
              </div>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              {card.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}
