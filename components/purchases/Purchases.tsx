
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { purchaseData } from "@/components/data/mockData";
import { useInventory } from "@/context/InventoryContext";
import { useLocalStorage } from "@/lib/useLocalStorage";
import PurchaseSummary from "./PurchaseSummary";
import PurchaseTable, { type Purchase } from "./PurchaseTable";
import PurchaseForm, { type NewPurchase } from "./PurchaseForm";

export default function Purchases() {
  const { products, setProducts } = useInventory();
  const [purchases, setPurchases] = useLocalStorage<Purchase[]>(
  "stockflow_purchases",
    purchaseData.map((purchase) => ({
      ...purchase,
      status: purchase.status === "Received" ? "Received" : "Pending",
    })) as Purchase[]
);
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleCreatePurchase(newPurchase: NewPurchase) {
    // Add stock only when the purchase is received.
    if (newPurchase.status === "Received") {
      setProducts((prev) =>
        prev.map((product) => {
          const purchasedItem = newPurchase.items.find(
            (item) => item.productId === product.id
          );

          if (!purchasedItem) return product;

          return {
            ...product,
            stock: product.stock + purchasedItem.quantity,
            costPrice: purchasedItem.costPrice,
          };
        })
      );
    }

    const purchase: Purchase = {
      id: `PUR-${Date.now().toString().slice(-6)}`,
      supplier: newPurchase.supplier,
      date: new Date().toISOString().split("T")[0],
      items: newPurchase.items.reduce((sum, item) => sum + item.quantity, 0),
      total: newPurchase.total,
      status: newPurchase.status === "Received" ? "Received" : "Pending",
    };

    setPurchases((prev) => [purchase, ...prev]);
  }

  return (
    <div className="space-y-6 p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Purchases</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage supplier orders and incoming stock.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center justify-center cursor-pointer gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          New Purchase 
        </button>
      </div>

      <PurchaseSummary purchases={purchases} />

      <PurchaseTable purchases={purchases} />

      {isFormOpen && (
        <PurchaseForm
          products={products}
          onSave={handleCreatePurchase}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
