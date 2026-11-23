
"use client";

import { useState } from "react";
import { Plus, Users } from "lucide-react";
import { customerData } from "@/components/data/mockData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import CustomerTable, { type Customer } from "./CustomerTable";
import CustomerForm from "./CustomerForm";

export default function Customers() {
  const [customers, setCustomers] = useLocalStorage<Customer[]>(
    "stockflow_customers",
    customerData
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  function handleSave(data: Omit<Customer, "id">) {
    if (selectedCustomer) {
      setCustomers((previous) =>
        previous.map((customer) =>
          customer.id === selectedCustomer.id
            ? { ...data, id: selectedCustomer.id }
            : customer
        )
      );
    } else {
      setCustomers((previous) => [
        ...previous,
        { ...data, id: Date.now() },
      ]);
    }

    setIsFormOpen(false);
    setSelectedCustomer(null);
  }

  function handleEdit(customer: Customer) {
    setSelectedCustomer(customer);
    setIsFormOpen(true);
  }

  function handleDelete(id: number) {
    const confirmed = window.confirm("Are you sure you want to delete this customer?");
    if (!confirmed) return;

    setCustomers((previous) =>
      previous.filter((customer) => customer.id !== id)
    );
  }

  function handleAdd() {
    setSelectedCustomer(null);
    setIsFormOpen(true);
  }

  return (
    <div className="space-y-6 md:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your customer information.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 cursor-pointer"
        >
          <Plus size={18} />
          Add Customer
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-xl  bg-white p-5">
          <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
            <Users size={22} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Customers</p>
            <h2 className="text-2xl font-bold">{customers.length}</h2>
          </div>
        </div>
      </div>

      <CustomerTable
        customers={customers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <CustomerForm
          customer={selectedCustomer}
          onSave={handleSave}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedCustomer(null);
          }}
        />
      )}
    </div>
  );
}
