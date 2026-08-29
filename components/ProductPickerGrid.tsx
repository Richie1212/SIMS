"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Product } from "@/lib/inventory-types";
import { categories } from "@/lib/inventory-data";

interface ProductPickerGridProps {
  products: Product[];
  onSelect: (product: Product) => void;
}

export default function ProductPickerGrid({ products, onSelect }: ProductPickerGridProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    let rows = products.filter((p) => p.status !== "Out of Stock");
    if (category !== "All") rows = rows.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    }
    return rows;
  }, [products, category, search]);

  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-(--color-border) bg-(--color-surface) px-3 py-2">
          <Search size={16} className="shrink-0 text-(--color-text-faint)" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="w-full bg-transparent text-base outline-none placeholder:text-(--color-text-muted) sm:text-sm"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-md px-3 py-2 text-xs font-medium transition ${
                category === c ? "bg-(--color-neutral-tint) text-(--color-text-primary)" : "text-(--color-text-muted) hover:bg-(--color-neutral-tint)"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-4">
        {filtered.length === 0 ? (
          <p className="col-span-full py-10 text-center text-sm text-(--color-text-muted)">No products match.</p>
        ) : (
          filtered.map((product) => (
            <button
              key={product.id}
              onClick={() => onSelect(product)}
              className="flex flex-col items-start gap-1 rounded-lg border border-(--color-border) bg-(--color-surface) p-3 text-left transition hover:border-(--color-border-strong) hover:bg-(--color-neutral-tint)"
            >
              <p className="text-sm font-medium text-(--color-text-primary)">{product.name}</p>
              <p className="text-xs text-(--color-text-muted)">{product.sku}</p>
              <p className="mt-1 text-sm font-semibold text-(--color-text-primary)">${product.priceUSD.toFixed(2)}</p>
              <p className="text-[11px] text-(--color-text-faint)">{product.quantity} in stock</p>
            </button>
          ))
        )}
      </div>
    </div>
  );
}