
"use client";

import { useEffect, useState } from "react";
import type { Customer } from "./CustomerTable";

interface Props {
  customer: Customer | null;
  onSave: (customer: Omit<Customer, "id">) => void;
  onClose: () => void;
}

export default function CustomerForm({ customer, onSave, onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (customer) {
      setForm({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
      });
    } else {
      setForm({ name: "", email: "", phone: "", address: "" });
    }
    setError("");
  }, [customer]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Name, email and phone are required.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      setError("Phone number must contain exactly 10 digits.");
      return;
    }

    onSave({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-4 rounded-xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {customer ? "Edit Customer" : "Add Customer"}
          </h2>
          <button type="button" onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Customer Name <span className="text-red-500">*</span></label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg bg-gray-100 p-2.5"
            placeholder="Enter customer name"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Email <span className="text-red-500">*</span></label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg bg-gray-100 p-2.5"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Phone <span className="text-red-500">*</span></label>
          <input
            type="tel"
            maxLength={10}
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })
            }
            className="w-full rounded-lg bg-gray-100 p-2.5"
            placeholder="10-digit phone number"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Address</label>
          <textarea
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full rounded-lg bg-gray-100 p-2.5"
            rows={3}
            placeholder="Enter address"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {customer ? "Update Customer" : "Save Customer"}
          </button>
        </div>
      </form>
    </div>
  );
}
