"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import ProductPickerGrid from "@/components/ProductPickerGrid";
import CartPanel from "@/components/CartPanel";
import { products } from "@/lib/inventory-data";
import { Product } from "@/lib/inventory-types";
import { CartLine, PaymentMethod } from "@/lib/pos-types";

export default function POSPage() {
  const [lines, setLines] = useState<CartLine[]>([]);

  function addToCart(product: Product) {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === product.id);
      if (existing) {
        return prev.map((l) => (l.productId === product.id ? { ...l, quantity: l.quantity + 1 } : l));
      }
      return [...prev, { productId: product.id, name: product.name, priceUSD: product.priceUSD, quantity: 1 }];
    });
  }

  function setQuantity(productId: string, quantity: number) {
    setLines((prev) =>
      quantity <= 0 ? prev.filter((l) => l.productId !== productId) : prev.map((l) => (l.productId === productId ? { ...l, quantity } : l))
    );
  }

  function removeLine(productId: string) {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }

  function handleCheckout(method: PaymentMethod) {
    console.log("Checkout", { lines, method });
    setLines([]);
  }

  return (
    <AppShell>
      <div>
        <h1 className="text-xl font-semibold text-(--color-text-primary)">
          <span>Sales/</span> <span className="text-(--color-text-muted)">Point of Sale</span>
        </h1>
        <p className="text-sm text-(--color-text-muted)">Select products to build a sale.</p>
      </div>

      <div className="flex flex-1 flex-col gap-4 xl:flex-row">
        <ProductPickerGrid products={products} onSelect={addToCart} />
        <CartPanel lines={lines} onSetQuantity={setQuantity} onRemove={removeLine} onCheckout={handleCheckout} />
      </div>
    </AppShell>
  );
}