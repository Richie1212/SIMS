"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Quote, QuoteStatus } from "@/lib/quote-types";
import QuoteStatusBadge from "./QuoteStatusBadge";

const FILTERS: (QuoteStatus | "All")[] = ["All", "Draft", "Sent", "Accepted", "Expired"];

function quoteTotal(quote: Quote): number {
  return quote.lines.reduce((sum, l) => sum + l.priceUSD * l.quantity, 0);
}

export default function QuotesTable({ quotes }: { quotes: Quote[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<QuoteStatus | "All">("All");

  const filtered = useMemo(() => {
    let rows = quotes;
    if (status !== "All") rows = rows.filter((q) => q.status === status);
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      rows = rows.filter((q) => q.customer.toLowerCase().includes(s) || q.quoteNumber.toLowerCase().includes(s));
    }
    return rows;
  }, [quotes, search, status]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-(--color-border) bg-(--color-surface) px-3 py-2">
          <Search size={16} className="shrink-0 text-(--color-text-faint)" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer or quote number..."
            className="w-full bg-transparent text-base outline-none placeholder:text-(--color-text-muted) sm:text-sm"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setStatus(f)}
              className={`shrink-0 rounded-md px-3 py-2 text-xs font-medium transition ${
                status === f ? "bg-(--color-neutral-tint) text-(--color-text-primary)" : "text-(--color-text-muted) hover:bg-(--color-neutral-tint)"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-(--color-border) bg-(--color-surface)">
        <div className="overflow-x-auto">
          <table className="w-full min-w-160 text-left">
            <thead>
              <tr className="border-b border-(--color-border) text-xs font-medium text-(--color-text-muted)">
                <th className="px-4 py-2.5">Quote #</th>
                <th className="px-4 py-2.5">Customer</th>
                <th className="px-4 py-2.5">Date</th>
                <th className="px-4 py-2.5">Items</th>
                <th className="px-4 py-2.5">Total</th>
                <th className="px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-(--color-text-muted)">
                    No quotes match.
                  </td>
                </tr>
              ) : (
                filtered.map((q) => (
                  <tr key={q.id} className="border-b border-(--color-border) last:border-0">
                    <td className="px-4 py-3 text-sm font-medium text-(--color-text-primary)">{q.quoteNumber}</td>
                    <td className="px-4 py-3 text-sm text-(--color-text-secondary)">{q.customer}</td>
                    <td className="px-4 py-3 text-sm text-(--color-text-muted)">{q.date}</td>
                    <td className="px-4 py-3 text-sm text-(--color-text-muted)">{q.lines.length}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-(--color-text-primary)">${quoteTotal(q).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <QuoteStatusBadge status={q.status} />
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