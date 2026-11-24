
"use client";

import { useState } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";

export interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Props {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => void;
}

export default function SupplierTable({
  suppliers,
  onEdit,
  onDelete,
}: Props) {
  const [search, setSearch] = useState("");

  const filteredSuppliers = suppliers.filter((supplier) =>
    `${supplier.name} ${supplier.email} ${supplier.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="rounded-xl bg-white">
      <div className=" p-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search suppliers..."
            className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4">Supplier</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Address</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredSuppliers.map((supplier) => (
              <tr key={supplier.id} className="">
                <td className="p-4 font-medium">{supplier.name}</td>
                <td className="p-4">{supplier.email}</td>
                <td className="p-4">{supplier.phone}</td>
                <td className="p-4">{supplier.address}</td>
                <td className="p-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => onEdit(supplier)}
                      className="text-blue-600"
                      aria-label={`Edit ${supplier.name}`}
                    >
                      <Pencil size={17} />
                    </button>
                    <button
                      onClick={() => onDelete(supplier.id)}
                      className="text-red-600"
                      aria-label={`Delete ${supplier.name}`}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredSuppliers.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No suppliers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
