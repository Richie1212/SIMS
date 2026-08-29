"use client";

import { Download } from "lucide-react";
import { DashboardRange } from "@/lib/data";

const RANGES: DashboardRange[] = ["Week", "Month", "Year"];

interface DashboardHeaderProps {
  range: DashboardRange;
  onRangeChange: (range: DashboardRange) => void;
  onExport: () => void;
}

export default function DashboardHeader({ range, onRangeChange, onExport }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold text-(--color-text-primary)">Inventory Overview</h1>
        <p className="text-sm text-(--color-text-muted)">Monitor your stock levels and warehouse performance</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex rounded-md border border-(--color-border) p-0.5">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => onRangeChange(r)}
              className={`rounded px-3 py-1.5 text-xs font-medium transition ${
                range === r ? "bg-(--color-neutral-tint) text-(--color-text-primary)" : "text-(--color-text-muted) hover:text-(--color-text-primary)"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <button
          onClick={onExport}
          className="flex items-center gap-2 rounded-md bg-(--color-brand) px-3.5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <Download size={14} />
          Export
        </button>
      </div>
    </div>
  );
}