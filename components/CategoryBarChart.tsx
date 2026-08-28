"use client";

import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from "recharts";
import { CategoryBar } from "@/lib/types";

const SHADES = ["var(--color-brand)", "var(--color-brand-light)", "var(--color-brand-lighter)", "var(--color-brand-lightest)", "var(--color-brand-faint)"];

export default function CategoryBarChart({ data }: { data: CategoryBar[] }) {
  return (
    <div className="flex-1 rounded-xl border border-(--color-border) bg-(--color-surface) p-4 shadow-[0_4px_6px_rgba(0,0,0,0.03)]">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-semibold text-(--color-text-primary)">Inventory by Category</h2>
        <span className="rounded-md bg-(--color-brand-tint) px-2 py-1 text-xs font-medium text-(--color-brand)">Top 5</span>
      </div>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-text-muted)", fontSize: 11 }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, i) => (
                <Cell key={entry.label} fill={SHADES[i % SHADES.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
