"use client";

import { useState } from "react";
import { Package } from "lucide-react";
import { Product, StockStatus } from "@/lib/inventory-types";
import { categories as defaultCategories, suppliers as defaultSuppliers, warehouses as defaultWarehouses } from "@/lib/inventory-data";
import InlineAddButton from "./InlineAddButton";

function generateSKU(name: string): string {
  const prefix = name.trim().slice(0, 3).toUpperCase() || "SKU";
  const suffix = Math.floor(100 + Math.random() * 900);
  return `${prefix}-${suffix}`;
}

function statusFromQuantity(quantity: number): StockStatus {
  if (quantity <= 0) return "Out of Stock";
  if (quantity < 200) return "Low Stock";
  return "In Stock";
}

interface AddProductFormProps {
  onSave: (product: Product) => void;
  onCancel: () => void;
}

export default function AddProductForm({ onSave, onCancel }: AddProductFormProps) {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [autoSku, setAutoSku] = useState(true);
  const [supplier, setSupplier] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [warehouse, setWarehouse] = useState("");

  const [supplierOptions, setSupplierOptions] = useState(defaultSuppliers);
  const [categoryOptions, setCategoryOptions] = useState(defaultCategories.filter((c) => c !== "All"));
  const [warehouseOptions, setWarehouseOptions] = useState(defaultWarehouses);

  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const qty = parseInt(quantity, 10);
    const priceNum = parseFloat(price);

    if (!name.trim() || !category || !warehouse || isNaN(qty) || isNaN(priceNum)) {
      setError("Please fill in all required fields.");
      return;
    }

    const finalSku = autoSku ? generateSKU(name) : sku.trim() || generateSKU(name);

    onSave({
      id: crypto.randomUUID(),
      name: name.trim(),
      sku: finalSku,
      category,
      quantity: qty,
      priceUSD: priceNum,
      warehouse,
      status: statusFromQuantity(qty),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--color-brand-tint)">
          <Package size={20} className="text-(--color-brand)" />
        </div>
        <div>
          <p className="text-lg font-bold text-(--color-text-primary)">Add Product</p>
          <p className="text-sm text-(--color-text-muted)">Please provide details of this product</p>
        </div>
      </div>

      <div className="h-px w-full bg-(--color-border)" />

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2.5">
          <p className="text-xs font-bold uppercase tracking-wide text-(--color-text-muted)">Product Meta</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-1 flex-col gap-2">
              <label className="flex items-center gap-1 text-sm font-semibold text-(--color-text-primary)">
                Product Name <span className="text-(--color-danger)">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type your product name"
                className="h-11 rounded-xl border border-(--color-border) px-3.5 text-base outline-none focus:border-(--color-brand) sm:text-sm"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <label className="flex items-center gap-1 text-sm font-semibold text-(--color-text-primary)">
                SKU <span className="text-(--color-danger)">*</span>
              </label>
              <input
                value={autoSku ? generateSKU(name || "SKU") : sku}
                onChange={(e) => setSku(e.target.value)}
                disabled={autoSku}
                placeholder="TAB-500"
                className="h-11 rounded-xl border border-(--color-border) px-3.5 text-base outline-none focus:border-(--color-brand) disabled:bg-(--color-neutral-tint) disabled:text-(--color-text-muted) sm:text-sm"
              />
              <label className="flex items-center gap-2 text-[13px] text-(--color-text-muted)">
                <input
                  type="checkbox"
                  checked={autoSku}
                  onChange={(e) => setAutoSku(e.target.checked)}
                  className="h-4 w-4 rounded border-(--color-border) accent-(--color-brand)"
                />
                Auto-generate SKU
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="text-xs font-bold uppercase tracking-wide text-(--color-text-muted)">Supplier</p>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-(--color-text-primary)">Supplier</label>
            <select
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="h-11 rounded-xl border border-(--color-border) px-3.5 text-sm text-(--color-text-primary) outline-none focus:border-(--color-brand)"
            >
              <option value="">Select your supplier...</option>
              {supplierOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <InlineAddButton
              label="Supplier"
              onAdd={(value) => {
                setSupplierOptions((opts) => [...opts, value]);
                setSupplier(value);
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="text-xs font-bold uppercase tracking-wide text-(--color-text-muted)">Category</p>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-(--color-text-primary)">
              Category <span className="text-(--color-danger)">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 rounded-xl border border-(--color-border) px-3.5 text-sm text-(--color-text-primary) outline-none focus:border-(--color-brand)"
            >
              <option value="">Select your category...</option>
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <InlineAddButton
              label="Category"
              onAdd={(value) => {
                setCategoryOptions((opts) => [...opts, value]);
                setCategory(value);
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="text-xs font-bold uppercase tracking-wide text-(--color-text-muted)">Pricing & Stock</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-1 flex-col gap-2">
              <label className="flex items-center gap-1 text-sm font-semibold text-(--color-text-primary)">
                Quantity <span className="text-(--color-danger)">*</span>
              </label>
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value.replace(/\D/g, ""))}
                inputMode="numeric"
                placeholder="0"
                className="h-11 rounded-xl border border-(--color-border) px-3.5 text-base outline-none focus:border-(--color-brand) sm:text-sm"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <label className="flex items-center gap-1 text-sm font-semibold text-(--color-text-primary)">
                Price <span className="text-(--color-danger)">*</span>
              </label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                inputMode="decimal"
                placeholder="0.00"
                className="h-11 rounded-xl border border-(--color-border) px-3.5 text-base outline-none focus:border-(--color-brand) sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="text-xs font-bold uppercase tracking-wide text-(--color-text-muted)">Warehouse</p>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-(--color-text-primary)">
              Warehouse <span className="text-(--color-danger)">*</span>
            </label>
            <select
              value={warehouse}
              onChange={(e) => setWarehouse(e.target.value)}
              className="h-11 rounded-xl border border-(--color-border) px-3.5 text-sm text-(--color-text-primary) outline-none focus:border-(--color-brand)"
            >
              <option value="">Select your warehouse...</option>
              {warehouseOptions.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
            <InlineAddButton
              label="Warehouse"
              onAdd={(value) => {
                setWarehouseOptions((opts) => [...opts, value]);
                setWarehouse(value);
              }}
            />
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-(--color-danger)">{error}</p>}

      <div className="h-px w-full bg-(--color-border)" />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="h-11 flex-1 rounded-xl border border-(--color-border) text-sm font-semibold text-(--color-text-primary)"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="h-11 flex-1 rounded-xl bg-(--color-brand) text-sm font-bold text-white shadow-[0_10px_10px_rgba(59,130,246,0.2)] transition hover:opacity-90"
        >
          Save Product
        </button>
      </div>
    </form>
  );
}