
"use client";

import { useState } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Props {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: number) => void;
}

export default function CustomerTable({
  customers,
  onEdit,
  onDelete,
}: Props) {
  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter((customer) =>
    `${customer.name} ${customer.email} ${customer.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="rounded-xl  bg-white">
      <div className="p-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Address</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="">
                <td className="p-4 font-medium">{customer.name}</td>
                <td className="p-4">{customer.email}</td>
                <td className="p-4">{customer.phone}</td>
                <td className="p-4">{customer.address}</td>
                <td className="p-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => onEdit(customer)}
                      className="text-blue-600"
                      aria-label={`Edit ${customer.name}`}
                    >
                      <Pencil size={17} />
                    </button>
                    <button
                      onClick={() => onDelete(customer.id)}
                      className="text-red-600"
                      aria-label={`Delete ${customer.name}`}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredCustomers.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
