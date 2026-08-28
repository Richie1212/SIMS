"use client";

import { Line, LineChart, ResponsiveContainer, XAxis } from "recharts";
import { TrendPoint } from "@/lib/types";

export default function StockTrendChart({ data }: { data: TrendPoint[] }) {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-xl border border-(--color-border) bg-(--color-surface) p-3.5 ">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-semibold text-(--color-text-primary)">Stock Trends</h2>
        <span className="rounded-md bg-(--color-success-tint) px-2 py-1 text-xs font-medium text-(--color-success)">+8.4%</span>
      </div>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8 }}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-text-muted)", fontSize: 11 }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-brand)"
              strokeWidth={2}
              strokeDasharray="8 6"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
