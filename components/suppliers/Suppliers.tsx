
"use client";

import { useState } from "react";
import { Plus, Truck } from "lucide-react";
import { supplierData } from "@/components/data/mockData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import SupplierTable, { type Supplier } from "@/components/suppliers/SuppliersTable";
import SupplierForm from "@/components/suppliers/SuppliersForm";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useLocalStorage<Supplier[]>(
    "stockflow_suppliers",
    supplierData
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  function handleSave(data: Omit<Supplier, "id">) {
    if (selectedSupplier) {
      setSuppliers((previous) =>
        previous.map((supplier) =>
          supplier.id === selectedSupplier.id
            ? { ...data, id: selectedSupplier.id }
            : supplier
        )
      );
    } else {
      setSuppliers((previous) => [
        ...previous,
        { ...data, id: Date.now() },
      ]);
    }

    setIsFormOpen(false);
    setSelectedSupplier(null);
  }

  function handleEdit(supplier: Supplier) {
    setSelectedSupplier(supplier);
    setIsFormOpen(true);
  }

  function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this supplier?"
    );

    if (!confirmed) return;

    setSuppliers((previous) =>
      previous.filter((supplier) => supplier.id !== id)
    );
  }

  function handleAdd() {
    setSelectedSupplier(null);
    setIsFormOpen(true);
  }

  return (
    <div className="space-y-6 md:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your supplier information.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium  cursor-pointer text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Supplier
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-xl  bg-white p-5">
          <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
            <Truck size={22} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Suppliers</p>
            <h2 className="text-2xl font-bold">{suppliers.length}</h2>
          </div>
        </div>
      </div>

      <SupplierTable
        suppliers={suppliers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <SupplierForm
          supplier={selectedSupplier}
          onSave={handleSave}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedSupplier(null);
          }}
        />
      )}
    </div>
  );
}
