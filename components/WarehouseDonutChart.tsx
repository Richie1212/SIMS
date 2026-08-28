"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { WarehouseSlice } from "@/lib/types";

export default function WarehouseDonutChart({ data }: { data: WarehouseSlice[] }) {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-xl border border-(--color-border) bg-(--color-surface) p-4 shadow-[0_4px_6px_rgba(0,0,0,0.03)]">
      <h2 className="mb-5 text-base font-semibold text-(--color-text-primary)">Warehouse Distribution</h2>
      <div className="flex h-48 items-center justify-center gap-6">
        <div className="relative h-40 w-40 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" innerRadius="72%" outerRadius="100%" stroke="none" paddingAngle={2}>
                {data.map((entry) => (
                  <Cell key={entry.label} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-(--color-text-primary)">3</span>
            <span className="text-xs text-(--color-text-muted)">Active Warehouses</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {data.map((entry) => (
            <div key={entry.label} className="flex items-center gap-2 text-sm">
              <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-(--color-text-secondary)">{entry.label}</span>
              <span className="ml-auto font-mono text-xs text-(--color-text-muted)">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
