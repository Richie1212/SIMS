"use client";

import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartLine, PaymentMethod } from "@/lib/pos-types";

const PAYMENT_METHODS: PaymentMethod[] = ["Cash", "Card", "Mobile Money"];
const TAX_RATE = 0.0; // adjust if your locale needs VAT applied at checkout

interface CartPanelProps {
  lines: CartLine[];
  onSetQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onCheckout: (method: PaymentMethod) => void;
}

export default function CartPanel({ lines, onSetQuantity, onRemove, onCheckout }: CartPanelProps) {
  const [method, setMethod] = useState<PaymentMethod>("Cash");
  const [confirmed, setConfirmed] = useState(false);

  const subtotal = lines.reduce((sum, l) => sum + l.priceUSD * l.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  function handleCheckout() {
    onCheckout(method);
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 2000);
  }

  return (
    <div className="flex w-full flex-col rounded-lg border border-(--color-border) bg-(--color-surface) xl:w-85">
      <div className="border-b border-(--color-border) px-4 py-3">
        <p className="text-sm font-semibold text-(--color-text-primary)">Current Sale</p>
        <p className="text-xs text-(--color-text-muted)">{lines.length} item{lines.length === 1 ? "" : "s"}</p>
      </div>

      <div className="flex max-h-90 flex-col gap-1 overflow-y-auto p-2">
        {lines.length === 0 ? (
          <p className="py-10 text-center text-sm text-(--color-text-muted)">Cart is empty — tap a product to add it.</p>
        ) : (
          lines.map((line) => (
            <div key={line.productId} className="flex items-center gap-2 rounded-md p-2 hover:bg-(--color-neutral-tint)">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-(--color-text-primary)">{line.name}</p>
                <p className="text-xs text-(--color-text-muted)">${line.priceUSD.toFixed(2)} each</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onSetQuantity(line.productId, line.quantity - 1)}
                  aria-label={`Decrease ${line.name}`}
                  className="flex h-6 w-6 items-center justify-center rounded-md border border-(--color-border) text-(--color-text-secondary) hover:bg-(--color-surface-muted)"
                >
                  <Minus size={12} />
                </button>
                <span className="w-5 text-center text-sm">{line.quantity}</span>
                <button
                  onClick={() => onSetQuantity(line.productId, line.quantity + 1)}
                  aria-label={`Increase ${line.name}`}
                  className="flex h-6 w-6 items-center justify-center rounded-md border border-(--color-border) text-(--color-text-secondary) hover:bg-(--color-surface-muted)"
                >
                  <Plus size={12} />
                </button>
              </div>
              <button onClick={() => onRemove(line.productId)} aria-label={`Remove ${line.name}`} className="text-(--color-text-faint) hover:text-(--color-danger)">
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="border-t border-(--color-border) p-4">
        <div className="mb-3 flex gap-1.5">
          {PAYMENT_METHODS.map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`flex-1 rounded-md px-2 py-2 text-xs font-medium transition ${
                method === m ? "bg-(--color-neutral-tint) text-(--color-text-primary)" : "border border-(--color-border) text-(--color-text-muted) hover:bg-(--color-neutral-tint)"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="mb-3 flex flex-col gap-1 text-sm">
          <div className="flex justify-between text-(--color-text-muted)">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold text-(--color-text-primary)">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={lines.length === 0}
          className="w-full rounded-md bg-(--color-brand) py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
        >
          {confirmed ? "Sale completed ✓" : "Complete Sale"}
        </button>
      </div>
    </div>
  );
}