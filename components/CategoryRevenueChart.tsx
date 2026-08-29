"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { CategoryRevenue } from "@/lib/report-types";

const COLORS = ["var(--color-brand)", "var(--color-brand-light)", "#a5a5f0", "#c9c9f7"];

export default function CategoryRevenueChart({ data }: { data: CategoryRevenue[] }) {
  const total = data.reduce((sum, d) => sum + d.revenueUSD, 0);

  return (
    <div className="flex h-56 items-center justify-center gap-6">
      <div className="relative h-32 w-32 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="revenueUSD" innerRadius="72%" outerRadius="100%" stroke="none" paddingAngle={2}>
              {data.map((entry, i) => (
                <Cell key={entry.category} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-(--color-text-primary)">${(total / 1000).toFixed(1)}K</span>
          <span className="text-[10px] text-(--color-text-muted)">Total</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {data.map((entry, i) => (
          <div key={entry.category} className="flex items-center gap-2 text-sm">
            <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
            <span className="text-(--color-text-secondary)">{entry.category}</span>
            <span className="ml-auto font-mono text-xs text-(--color-text-muted)">${entry.revenueUSD.toFixed(0)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}