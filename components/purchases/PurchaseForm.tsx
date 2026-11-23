
"use client";

import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import type { Product } from "@/components/types";

export interface PurchaseItem {
  productId: number;
  name: string;
  quantity: number;
  costPrice: number;
}

export interface NewPurchase {
  supplier: string;
  items: PurchaseItem[];
  total: number;
  status: "Received" | "Pending";
}

interface PurchaseFormProps {
  products: Product[];
  onSave: (purchase: NewPurchase) => void;
  onClose: () => void;
}

export default function PurchaseForm({
  products,
  onSave,
  onClose,
}: PurchaseFormProps) {
  const [supplier, setSupplier] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [costPrice, setCostPrice] = useState("");
  const [items, setItems] = useState<PurchaseItem[]>([]);
  const [status, setStatus] = useState<"Received" | "Pending">("Received");
  const [error, setError] = useState("");

  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.costPrice,
    0
  );

  function handleProductChange(id: string) {
    setProductId(id);

    const product = products.find((item) => item.id === Number(id));
    setCostPrice(product ? String(product.costPrice) : "");
  }

  function handleAddItem() {
    setError("");

    const product = products.find((item) => item.id === Number(productId));
    const qty = Number(quantity);
    const price = Number(costPrice);

    if (!product) {
      setError("Please select a product.");
      return;
    }

    if (!Number.isInteger(qty) || qty <= 0) {
      setError("Enter a valid quantity.");
      return;
    }

    if (costPrice === "" || !Number.isFinite(price) || price < 0) {
      setError("Enter a valid cost price.");
      return;
    }

    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);

      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + qty, costPrice: price }
            : item
        );
      }

      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          quantity: qty,
          costPrice: price,
        },
      ];
    });

    setProductId("");
    setQuantity("1");
    setCostPrice("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!supplier.trim()) {
      setError("Supplier name is required.");
      return;
    }

    if (items.length === 0) {
      setError("Add at least one product.");
      return;
    }

    onSave({
      supplier: supplier.trim(),
      items,
      total,
      status,
    });

    onClose();
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">New Purchase</h2>
            <p className="mt-1 text-sm text-gray-500">
              Add supplier and products received.
            </p>
          </div>

          <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 p-6">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Supplier <span className="text-red-500">*</span>
              </label>
              <input
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                placeholder="Enter supplier name"
                className={inputClass}
              />
            </div>

            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <h3 className="mb-3 text-sm font-semibold text-gray-800">
                Add Products <span className="text-red-500">*</span>
              </h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <select
                  value={productId}
                  onChange={(e) => handleProductChange(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Quantity"
                  className={inputClass}
                />

                <input
                  type="number"
                  min="0"
                  step="any"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  placeholder="Cost price"
                  className={inputClass}
                />
              </div>

              <button
                type="button"
                onClick={handleAddItem}
                className="mt-3 flex items-center gap-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 cursor-pointer"
              >
                <Plus size={16} />
                Add Item
              </button>
            </div>

            {items.length > 0 && (
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500">
                    <tr>
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Qty</th>
                      <th className="px-4 py-3">Cost</th>
                      <th className="px-4 py-3">Subtotal</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {items.map((item) => (
                      <tr key={item.productId}>
                        <td className="px-4 py-3 font-medium">{item.name}</td>
                        <td className="px-4 py-3">{item.quantity}</td>
                        <td className="px-4 py-3">
                          ₹{item.costPrice.toLocaleString("en-IN")}
                        </td>
                        <td className="px-4 py-3 font-medium">
                          ₹{(item.quantity * item.costPrice).toLocaleString("en-IN")}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() =>
                              setItems((prev) =>
                                prev.filter((p) => p.productId !== item.productId)
                              )
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Purchase Status <span className="text-red-500">*</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "Received" | "Pending")}
                className={inputClass}
              >
                <option value="Received">Received</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-sm text-emerald-600">Purchase Total</p>
              <p className="mt-1 text-2xl font-bold text-emerald-700">
                ₹{total.toLocaleString("en-IN")}
              </p>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 cursor-pointer"
            >
              Create Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
