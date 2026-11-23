
"use client";

import { useState } from "react";
import { Plus, ShoppingCart } from "lucide-react";

import { salesData } from "@/components/data/mockData";
import { useInventory } from "@/context/InventoryContext";
import { useLocalStorage } from "@/lib/useLocalStorage";
import SalesSummary from "./SalesSummary";
import SalesTable, { type Sale } from "./SalesTable";
import SaleForm, { type NewSale } from "./SaleForm";

export default function Sales() {
  const { products, setProducts } = useInventory();
  const [sales, setSales] = useLocalStorage<Sale[]>(
    "stockflow_sales",
    salesData.map((sale) => ({
      ...sale,
      status: sale.status as Sale["status"],
    }))
  );
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleCreateSale(newSale: NewSale) {
    // Validate stock again before completing the sale.
    if (newSale.status === "Completed") {
      for (const item of newSale.items) {
        const product = products.find((p) => p.id === item.productId);

        if (!product || product.stock < item.quantity) {
          alert(`Insufficient stock for ${item.name}. Please check inventory.`);
          return;
        }
      }

      // Deduct stock only for completed sales.
      setProducts((prev) =>
        prev.map((product) => {
          const soldItem = newSale.items.find(
            (item) => item.productId === product.id
          );

          if (!soldItem) return product;

          return {
            ...product,
            stock: product.stock - soldItem.quantity,
          };
        })
      );
    }

    const sale: Sale = {
      id: `INV-${Date.now().toString().slice(-6)}`,
      customer: newSale.customer,
      date: new Date().toISOString().split("T")[0],
      items: newSale.items.reduce((sum, item) => sum + item.quantity, 0),
      total: newSale.total,
      status: newSale.status,
    };

    setSales((prev) => [sale, ...prev]);
  }

  return (
    <div className="space-y-6 p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage sales, customers, and invoices.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center cursor-pointer justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          New Sale
        </button>
      </div>

      <SalesSummary sales={sales} />

      <SalesTable sales={sales} />

      {isFormOpen && (
        <SaleForm
          products={products}
          onSave={handleCreateSale}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
