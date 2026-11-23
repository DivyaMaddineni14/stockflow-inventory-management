
"use client";

import { IndianRupee, ShoppingBag, Receipt, Clock } from "lucide-react";

interface Purchase {
  id: string;
  supplier: string;
  date: string;
  items: number;
  total: number;
  status: "Received" | "Pending";
}

interface PurchaseSummaryProps {
  purchases: Purchase[];
}

export default function PurchaseSummary({ purchases }: PurchaseSummaryProps) {
  const receivedPurchases = purchases.filter(
    (purchase) => purchase.status === "Received"
  );

  const totalPurchased = receivedPurchases.reduce(
    (sum, purchase) => sum + purchase.total,
    0
  );

  const cards = [
    {
      title: "Purchase Value",
      value: `₹${totalPurchased.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Received Orders",
      value: receivedPurchases.length,
      icon: ShoppingBag,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Total Purchases",
      value: purchases.length,
      icon: Receipt,
      color: "bg-violet-50 text-violet-600",
    },
    {
      title: "Pending Orders",
      value: purchases.filter((p) => p.status === "Pending").length,
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
