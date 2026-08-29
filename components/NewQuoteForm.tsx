"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { products } from "@/lib/inventory-data";
import { Quote, QuoteLine } from "@/lib/quote-types";

interface NewQuoteFormProps {
  onSave: (quote: Quote) => void;
  onCancel: () => void;
}

export default function NewQuoteForm({ onSave, onCancel }: NewQuoteFormProps) {
  const [customer, setCustomer] = useState("");
  const [lines, setLines] = useState<QuoteLine[]>([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [error, setError] = useState("");

  function addLine() {
    const product = products.find((p) => p.id === selectedProductId);
    if (!product) return;
    if (lines.some((l) => l.productId === product.id)) return;
    setLines((prev) => [...prev, { productId: product.id, name: product.name, priceUSD: product.priceUSD, quantity: 1 }]);
    setSelectedProductId("");
  }

  function updateQuantity(productId: string, quantity: number) {
    setLines((prev) => prev.map((l) => (l.productId === productId ? { ...l, quantity: Math.max(1, quantity) } : l)));
  }

  function removeLine(productId: string) {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }

  const total = lines.reduce((sum, l) => sum + l.priceUSD * l.quantity, 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!customer.trim() || lines.length === 0) {
      setError("Add a customer name and at least one line item.");
      return;
    }
    onSave({
      id: crypto.randomUUID(),
      quoteNumber: `QT-${1000 + Math.floor(Math.random() * 9000)}`,
      customer: customer.trim(),
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      lines,
      status: "Draft",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6">
      <div>
        <p className="text-lg font-semibold text-(--color-text-primary)">New Sales Quote</p>
        <p className="text-sm text-(--color-text-muted)">Build a quote to send to a customer.</p>
      </div>

      <div className="h-px w-full bg-(--color-border)" />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-(--color-text-primary)">Customer</label>
        <input
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          placeholder="Customer or organization name"
          className="h-10 rounded-md border border-(--color-border) px-3 text-base outline-none focus:border-(--color-brand) sm:text-sm"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-(--color-text-primary)">Line items</label>
        <div className="flex gap-2">
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="h-10 flex-1 rounded-md border border-(--color-border) px-3 text-sm outline-none focus:border-(--color-brand)"
          >
            <option value="">Select a product...</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — ${p.priceUSD.toFixed(2)}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={addLine}
            disabled={!selectedProductId}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-(--color-border) text-(--color-text-secondary) hover:bg-(--color-neutral-tint) disabled:opacity-40"
          >
            <Plus size={16} />
          </button>
        </div>

        {lines.length > 0 && (
          <div className="mt-1 flex flex-col divide-y divide-(--color-border) rounded-md border border-(--color-border)">
            {lines.map((line) => (
              <div key={line.productId} className="flex items-center gap-2 px-3 py-2">
                <span className="flex-1 text-sm text-(--color-text-primary)">{line.name}</span>
                <input
                  type="number"
                  min={1}
                  value={line.quantity}
                  onChange={(e) => updateQuantity(line.productId, parseInt(e.target.value, 10) || 1)}
                  className="w-16 rounded-md border border-(--color-border) px-2 py-1 text-sm outline-none"
                />
                <span className="w-20 text-right text-sm text-(--color-text-muted)">${(line.priceUSD * line.quantity).toFixed(2)}</span>
                <button type="button" onClick={() => removeLine(line.productId)} className="text-(--color-text-faint) hover:text-(--color-danger)">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between rounded-md bg-(--color-neutral-tint) px-3 py-2.5">
        <span className="text-sm font-medium text-(--color-text-secondary)">Total</span>
        <span className="text-base font-semibold text-(--color-text-primary)">${total.toFixed(2)}</span>
      </div>

      {error && <p className="text-sm text-(--color-danger)">{error}</p>}

      <div className="h-px w-full bg-(--color-border)" />

      <div className="flex gap-3">
        <button type="button" onClick={onCancel} className="h-10 flex-1 rounded-md border border-(--color-border) text-sm font-medium text-(--color-text-primary)">
          Cancel
        </button>
        <button type="submit" className="h-10 flex-1 rounded-md bg-(--color-brand) text-sm font-semibold text-white hover:opacity-90">
          Save as Draft
        </button>
      </div>
    </form>
  );
}