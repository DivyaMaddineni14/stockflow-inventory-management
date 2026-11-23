
"use client";

import {useState} from "react";
import { Package, Plus, Boxes, AlertTriangle, IndianRupee } from "lucide-react";

import { useInventory } from "@/context/InventoryContext";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import type { Product } from "@/components/types";

export default function Inventory() {
const { products, setProducts } = useInventory();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const totalProducts = products.length;
  const totalUnits = products.reduce((sum, product) => sum + product.stock, 0);

  const lowStock = products.filter(
    (product) => product.stock > 0 && product.stock <= product.minStock
  ).length;

  const outOfStock = products.filter(
    (product) => product.stock === 0
  ).length;

  const stockValue = products.reduce(
    (sum, product) => sum + product.costPrice * product.stock,
    0
  );

  const cards = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Units",
      value: totalUnits,
      icon: Boxes,
      color: "bg-violet-50 text-violet-600",
    },
    {
      title: "Low Stock",
      value: lowStock + outOfStock,
      icon: AlertTriangle,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Stock Value",
      value: `₹${stockValue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  function handleAdd() {
    setSelectedProduct(null);
    setIsFormOpen(true);
  }

  function handleEdit(product: Product) {
    setSelectedProduct(product);
    setIsFormOpen(true);
  }

  function handleSave(product: Product) {
    setProducts((prev) => {
      const exists = prev.some((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? product : item
        );
      }

      return [product, ...prev];
    });
  }

  function handleDelete(id: number) {
    const product = products.find((item) => item.id === id);
    if (!product) return;

    if (window.confirm(`Delete ${product.name}?`)) {
      setProducts((prev) => prev.filter((item) => item.id !== id));
    }
  }

  return (
    <div className="space-y-6 p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your products and stock levels.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

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

      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <ProductForm
          product={selectedProduct}
          onSave={handleSave}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
