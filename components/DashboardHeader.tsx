"use client";

import { ChevronDown, Download } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-bold text-(--color-text-primary) sm:text-2xl">Inventory Overview</h1>
        <p className="text-sm text-(--color-text-muted)">Monitor your stock levels and warehouse performance</p>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-[10px] border border-(--color-border) bg-(--color-surface) px-3.5 py-2 text-sm font-medium text-(--color-text-subtle) shadow-sm">
          This Month
          <ChevronDown size={16} />
        </button>
        <button className="flex items-center gap-2 rounded-[10px] bg-(--color-brand) px-3.5 py-2 text-sm font-semibold text-white shadow-[0_4px_6px_rgba(59,130,246,0.25)] transition hover:opacity-90">
          <Download size={16} />
          Export
        </button>
      </div>
    </div>
  );
}
