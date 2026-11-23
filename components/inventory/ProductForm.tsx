
"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Product } from "@/components/types";

interface ProductFormProps {
  product?: Product | null;
  onSave: (product: Product) => void;
  onClose: () => void;
}

const emptyForm = {
  name: "",
  sku: "",
  category: "",
  price: "",
  costPrice: "",
  stock: "",
  minStock: "",
  supplier: "",
};

type FormData = typeof emptyForm;

interface FieldProps {
  label: string;
  name: keyof FormData;
  type?: string;
  value: string;
  error?: string;
  onChange: (name: keyof FormData, value: string) => void;
}

// Field component is now outside ProductForm
function Field({
  label,
  name,
  type = "text",
  value,
  error,
  onChange,
}: FieldProps) {
  const inputClass =
    "w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        min={type === "number" ? "0" : undefined}
        step={type === "number" ? "any" : undefined}
        className={`${inputClass} ${error ? "border-red-400" : ""}`}
      />

      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

export default function ProductForm({
  product,
  onSave,
  onClose,
}: ProductFormProps) {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        sku: product.sku,
        category: product.category,
        price: String(product.price),
        costPrice: String(product.costPrice),
        stock: String(product.stock),
        minStock: String(product.minStock),
        supplier: product.supplier,
      });
    } else {
      setForm(emptyForm);
    }

    setErrors({});
  }, [product]);

  function handleChange(name: keyof FormData, value: string) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!form.sku.trim()) {
      newErrors.sku = "SKU is required";
    }

    if (!form.category) {
      newErrors.category = "Category is required";
    }

    if (!form.supplier.trim()) {
      newErrors.supplier = "Supplier is required";
    }

    if (
      form.price === "" ||
      !Number.isFinite(Number(form.price)) ||
      Number(form.price) <= 0
    ) {
      newErrors.price = "Enter a valid selling price";
    }

    if (
      form.costPrice === "" ||
      !Number.isFinite(Number(form.costPrice)) ||
      Number(form.costPrice) < 0
    ) {
      newErrors.costPrice = "Enter a valid cost price";
    }

    if (
      form.stock === "" ||
      !Number.isInteger(Number(form.stock)) ||
      Number(form.stock) < 0
    ) {
      newErrors.stock = "Enter a valid stock quantity";
    }

    if (
      form.minStock === "" ||
      !Number.isInteger(Number(form.minStock)) ||
      Number(form.minStock) < 0
    ) {
      newErrors.minStock = "Enter a valid minimum stock";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      id: product?.id ?? Date.now(),
      name: form.name.trim(),
      sku: form.sku.trim(),
      category: form.category,
      price: Number(form.price),
      costPrice: Number(form.costPrice),
      stock: Number(form.stock),
      minStock: Number(form.minStock),
      supplier: form.supplier.trim(),
    });

    onClose();
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {product ? "Edit Product" : "Add New Product"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Fill in the product details below.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">

            <Field
              label="Product Name"
              name="name"
              value={form.name}
              error={errors.name}
              onChange={handleChange}
            />

            <Field
              label="SKU"
              name="sku"
              value={form.sku}
              error={errors.sku}
              onChange={handleChange}
            />

            {/* Category */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>

              <select
                name="category"
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className={inputClass}
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
                <option value="Office Supplies">Office Supplies</option>
                <option value="Furniture">Furniture</option>
              </select>

              {errors.category && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.category}
                </p>
              )}
            </div>

            <Field
              label="Selling Price (₹)"
              name="price"
              type="number"
              value={form.price}
              error={errors.price}
              onChange={handleChange}
            />

            <Field
              label="Cost Price (₹)"
              name="costPrice"
              type="number"
              value={form.costPrice}
              error={errors.costPrice}
              onChange={handleChange}
            />

            <Field
              label="Stock Quantity"
              name="stock"
              type="number"
              value={form.stock}
              error={errors.stock}
              onChange={handleChange}
            />

            <Field
              label="Minimum Stock"
              name="minStock"
              type="number"
              value={form.minStock}
              error={errors.minStock}
              onChange={handleChange}
            />

            <Field
              label="Supplier"
              name="supplier"
              value={form.supplier}
              error={errors.supplier}
              onChange={handleChange}
            />

          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4">

            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              {product ? "Save Changes" : "Add Product"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}
