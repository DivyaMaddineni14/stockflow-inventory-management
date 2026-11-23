
"use client";

import { useInventory } from "@/context/InventoryContext";

export default function StockReport() {
  const { products } = useInventory();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Current Stock Report
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">SKU</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Minimum Stock</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              const status =
                product.stock === 0
                  ? "Out of Stock"
                  : product.stock <= product.minStock
                  ? "Low Stock"
                  : "In Stock";

              return (
                <tr key={product.id} className="border-b border-gray-100">
                  <td className="p-3 font-medium">{product.name}</td>
                  <td className="p-3">{product.sku}</td>
                  <td className="p-3">{product.stock}</td>
                  <td className="p-3">{product.minStock}</td>
                  <td className="p-3">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
