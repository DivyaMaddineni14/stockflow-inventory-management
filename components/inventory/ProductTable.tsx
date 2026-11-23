
"use client";

import { Search, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  costPrice: number;
  stock: number;
  minStock: number;
  supplier: string;
}

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(products.map((product) => product.category))),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  function getStatus(product: Product) {
    if (product.stock === 0) {
      return {
        label: "Out of Stock",
        style: "bg-red-50 text-red-600",
      };
    }

    if (product.stock <= product.minStock) {
      return {
        label: "Low Stock",
        style: "bg-amber-50 text-amber-600",
      };
    }

    return {
      label: "In Stock",
      style: "bg-emerald-50 text-emerald-600",
    };
  }

  const formatPrice = (price: number) =>
    `₹${price.toLocaleString("en-IN")}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Search and filter */}
      <div className="flex flex-col gap-3 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products or SKU..."
            className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Categories" : item}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="bg-gray-50">
            <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-5 py-4">Product</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">Stock</th>
              <th className="px-5 py-4">Supplier</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredProducts.map((product) => {
              const status = getStatus(product);

              return (
                <tr
                  key={product.id}
                  className="transition-colors hover:bg-gray-50/70"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {product.sku}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {product.category}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-gray-800">
                    {formatPrice(product.price)}
                  </td>

                  <td className="px-5 py-4">
                    <div className="text-sm font-medium text-gray-800">
                      {product.stock} units
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      Min: {product.minStock}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {product.supplier}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${status.style}`}
                    >
                      {status.label}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                        title="Edit product"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => onDelete(product.id)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                        title="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {filteredProducts.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-12 text-center text-sm text-gray-400"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
        Showing {filteredProducts.length} of {products.length} products
      </div>
    </div>
  );
}
