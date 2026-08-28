"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ExpiryItem, ExpiryStatus } from "@/lib/expiry-types";
import ExpiryStatusBadge from "./ExpiryStatusBadge";

const FILTERS: (ExpiryStatus | "All")[] = ["All", "Expiring Soon", "Expired", "Valid"];

const DAYS_LEFT_COLOR: Record<ExpiryStatus, string> = {
  Valid: "text-(--color-success)",
  "Expiring Soon": "text-(--color-warning)",
  Expired: "text-(--color-danger)",
};

export default function ExpiryTable({ items }: { items: ExpiryItem[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ExpiryStatus | "All">("All");

  const filtered = useMemo(() => {
    let rows = items;
    if (statusFilter !== "All") rows = rows.filter((i) => i.status === statusFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter(
        (i) => i.productName.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
      );
    }
    return rows;
  }, [items, search, statusFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface) px-3.5 py-2.5 ">
          <Search size={18} className="shrink-0 text-(--color-text-faint)" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, SKU, category..."
            aria-label="Search expiry items"
            className="w-full bg-transparent text-base outline-none placeholder:text-(--color-text-muted) sm:text-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-medium transition ${
                statusFilter === f ? "bg-(--color-text-primary) text-white" : "bg-(--color-neutral-tint) text-(--color-text-muted)"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-(--color-border) bg-(--color-surface) p-3.5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-180 text-left">
            <thead>
              <tr className="border-b border-(--color-border) text-xs font-semibold uppercase text-(--color-text-muted)">
                <th className="pb-3">Product Name</th>
                <th className="w-25 pb-3">SKU</th>
                <th className="w-30 pb-3">Category</th>
                <th className="w-30 pb-3">Expiry Date</th>
                <th className="w-25 pb-3">Days Left</th>
                <th className="w-30 pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-sm text-(--color-text-muted)">
                    No items match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="border-b border-(--color-neutral-tint) last:border-0">
                    <td className="py-3 text-sm font-medium text-(--color-text-primary)">{item.productName}</td>
                    <td className="py-3 text-sm text-(--color-text-muted)">{item.sku}</td>
                    <td className="py-3 text-sm text-(--color-text-muted)">{item.category}</td>
                    <td className="py-3 text-sm text-(--color-text-muted)">{item.expiryDate}</td>
                    <td className={`py-3 text-sm font-semibold ${DAYS_LEFT_COLOR[item.status]}`}>{item.daysLeft}</td>
                    <td className="py-3">
                      <ExpiryStatusBadge status={item.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}