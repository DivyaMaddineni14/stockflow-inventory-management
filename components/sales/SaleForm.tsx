
"use client";

import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import type { Product } from "@/components/types";

export interface SaleItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

export interface NewSale {
  customer: string;
  items: SaleItem[];
  total: number;
  status: "Completed" | "Pending";
}

interface SaleFormProps {
  products: Product[];
  onSave: (sale: NewSale) => void;
  onClose: () => void;
}

export default function SaleForm({
  products,
  onSave,
  onClose,
}: SaleFormProps) {
  const [customer, setCustomer] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [items, setItems] = useState<SaleItem[]>([]);
  const [status, setStatus] = useState<"Completed" | "Pending">("Completed");
  const [error, setError] = useState("");

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleAddItem() {
    setError("");

    const product = products.find((p) => p.id === Number(productId));
    const qty = Number(quantity);

    if (!product) {
      setError("Please select a product.");
      return;
    }

    if (!Number.isInteger(qty) || qty <= 0) {
      setError("Enter a valid quantity.");
      return;
    }

    const alreadyAdded = items
      .filter((item) => item.productId === product.id)
      .reduce((sum, item) => sum + item.quantity, 0);

    if (alreadyAdded + qty > product.stock) {
      setError(`Only ${product.stock} units of ${product.name} are available.`);
      return;
    }

    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);

      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }

      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          quantity: qty,
          price: product.price,
        },
      ];
    });

    setProductId("");
    setQuantity("1");
  }

  function removeItem(productId: number) {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!customer.trim()) {
      setError("Customer name is required.");
      return;
    }

    if (items.length === 0) {
      setError("Add at least one product to the sale.");
      return;
    }

    onSave({
      customer: customer.trim(),
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
            <h2 className="text-lg font-semibold text-gray-900">Create Sale</h2>
            <p className="mt-1 text-sm text-gray-500">
              Add customer and products to create an invoice.
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
                Customer Name <span className="text-red-500">*</span>
              </label>
              <input
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                placeholder="Enter customer name"
                className={inputClass}
              />
            </div>

            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <h3 className="mb-3 text-sm font-semibold text-gray-800">
                Add Products
              </h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_100px_auto]">
                <select
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select product</option>
                  {products.filter((product) => product.stock > 0).map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} — ₹{product.price} ({product.stock} available)
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className={inputClass}
                  placeholder="Qty"
                />

                <button
                  type="button"
                  onClick={handleAddItem}
                  className="flex items-center justify-center gap-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>
            </div>

            {items.length > 0 && (
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500">
                    <tr>
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Qty</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Subtotal</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {items.map((item) => (
                      <tr key={item.productId}>
                        <td className="px-4 py-3 font-medium">{item.name}</td>
                        <td className="px-4 py-3">{item.quantity}</td>
                        <td className="px-4 py-3">₹{item.price.toLocaleString("en-IN")}</td>
                        <td className="px-4 py-3 font-medium">
                          ₹{(item.quantity * item.price).toLocaleString("en-IN")}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
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
                Sale Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "Completed" | "Pending")}
                className={inputClass}
              >
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-sm text-blue-600">Sale Total</p>
              <p className="mt-1 text-2xl font-bold text-blue-700">
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
              className="rounded-xl border border-gray-200 px-4 py-2.5 cursor-pointer  text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2.5 cursor-pointer text-sm font-medium text-white hover:bg-blue-700"
            >
              Create Sale
            </button>
          </div>
        </form>
      </div>
</div>
  );
}
