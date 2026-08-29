"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PurchaseOrder, PurchaseOrderStatus } from "@/lib/purchase-types";
import PurchaseStatusBadge from "./PurchaseStatusBadge";

const FILTERS: (PurchaseOrderStatus | "All")[] = ["All", "Pending", "Ordered", "Received", "Cancelled"];

function poTotal(po: PurchaseOrder): number {
  return po.lines.reduce((sum, l) => sum + l.costUSD * l.quantity, 0);
}

interface PurchaseOrdersTableProps {
  orders: PurchaseOrder[];
  onMarkReceived: (id: string) => void;
}

export default function PurchaseOrdersTable({ orders, onMarkReceived }: PurchaseOrdersTableProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<PurchaseOrderStatus | "All">("All");

  const filtered = useMemo(() => {
    let rows = orders;
    if (status !== "All") rows = rows.filter((o) => o.status === status);
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      rows = rows.filter((o) => o.supplier.toLowerCase().includes(s) || o.poNumber.toLowerCase().includes(s));
    }
    return rows;
  }, [orders, search, status]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-(--color-border) bg-(--color-surface) px-3 py-2">
          <Search size={16} className="shrink-0 text-(--color-text-faint)" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by supplier or PO number..."
            aria-label="Search purchase orders"
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
          <table className="w-full min-w-180 text-left">
            <thead>
              <tr className="border-b border-(--color-border) text-xs font-medium text-(--color-text-muted)">
                <th className="px-4 py-2.5">PO #</th>
                <th className="px-4 py-2.5">Supplier</th>
                <th className="px-4 py-2.5">Order Date</th>
                <th className="px-4 py-2.5">Expected</th>
                <th className="px-4 py-2.5">Items</th>
                <th className="px-4 py-2.5">Total Cost</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-(--color-text-muted)">
                    No purchase orders match.
                  </td>
                </tr>
              ) : (
                filtered.map((po) => (
                  <tr key={po.id} className="border-b border-(--color-border) last:border-0">
                    <td className="px-4 py-3 text-sm font-medium text-(--color-text-primary)">{po.poNumber}</td>
                    <td className="px-4 py-3 text-sm text-(--color-text-secondary)">{po.supplier}</td>
                    <td className="px-4 py-3 text-sm text-(--color-text-muted)">{po.orderDate}</td>
                    <td className="px-4 py-3 text-sm text-(--color-text-muted)">{po.expectedDate}</td>
                    <td className="px-4 py-3 text-sm text-(--color-text-muted)">{po.lines.length}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-(--color-text-primary)">${poTotal(po).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <PurchaseStatusBadge status={po.status} />
                    </td>
                    <td className="px-4 py-3">
                      {po.status === "Ordered" && (
                        <button
                          onClick={() => onMarkReceived(po.id)}
                          className="text-sm font-semibold text-(--color-brand) hover:underline"
                        >
                          Mark Received
                        </button>
                      )}
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