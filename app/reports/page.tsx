"use client";

import { useMemo, useState } from "react";
import { Download, DollarSign, ShoppingBag, TrendingUp } from "lucide-react";
import AppShell from "@/components/AppShell";
import KPICard from "@/components/KPICard";
import RevenueTrendChart from "@/components/RevenueTrendChart";
import CategoryRevenueChart from "@/components/CategoryRevenueChart";
import TopProductsTable from "@/components/TopProductsTable";
import { getRevenueTrend, getTopProducts, getCategoryRevenue } from "@/lib/report-data";
import { exportTopProductsCSV } from "@/lib/report-export";
import { ReportRange } from "@/lib/report-types";

const RANGES: ReportRange[] = ["Week", "Month", "Year"];

export default function ReportsPage() {
  const [range, setRange] = useState<ReportRange>("Month");

  const revenue = useMemo(() => getRevenueTrend(range), [range]);
  const topProducts = useMemo(() => getTopProducts(range), [range]);
  const categoryRevenue = useMemo(() => getCategoryRevenue(range), [range]);

  const totalRevenue = revenue.reduce((sum, p) => sum + p.revenue, 0);
  const totalUnits = topProducts.reduce((sum, p) => sum + p.unitsSold, 0);
  const avgOrderValue = totalUnits > 0 ? totalRevenue / totalUnits : 0;

  return (
    <AppShell>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-(--color-text-primary)">Analytics and Reports</h1>
          <p className="text-sm text-(--color-text-muted)">Revenue and sales performance over time.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-md border border-(--color-border) p-0.5">
            {RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`rounded px-3 py-1.5 text-xs font-medium transition ${
                  range === r ? "bg-(--color-neutral-tint) text-(--color-text-primary)" : "text-(--color-text-muted) hover:text-(--color-text-primary)"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <button
            onClick={() => exportTopProductsCSV(topProducts, range)}
            className="flex items-center gap-2 rounded-md bg-(--color-brand) px-3.5 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            <Download size={14} />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KPICard
          kpi={{
            label: "Total Revenue",
            value: `$${totalRevenue.toLocaleString()}`,
            trend: `Over the ${range.toLowerCase()}`,
            trendDirection: "up",
            icon: "dollar-sign",
            tone: "success",
          }}
        />
        <KPICard
          kpi={{
            label: "Units Sold",
            value: totalUnits.toLocaleString(),
            trend: "Top 4 products",
            trendDirection: "up",
            icon: "package",
            tone: "brand",
          }}
        />
        <KPICard
          kpi={{
            label: "Avg. Revenue / Unit",
            value: `$${avgOrderValue.toFixed(2)}`,
            trend: "Across top sellers",
            trendDirection: "neutral",
            icon: "calendar",
            tone: "warning",
          }}
        />
      </div>

      <div className="flex flex-col gap-4 xl:flex-row">
        <div className="flex-1 rounded-lg border border-(--color-border) bg-(--color-surface) p-4">
          <h2 className="mb-3 text-base font-semibold text-(--color-text-primary)">Revenue Trend</h2>
          <RevenueTrendChart data={revenue} />
        </div>
        <div className="flex-1 rounded-lg border border-(--color-border) bg-(--color-surface) p-4">
          <h2 className="mb-3 text-base font-semibold text-(--color-text-primary)">Revenue by Category</h2>
          <CategoryRevenueChart data={categoryRevenue} />
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-base font-semibold text-(--color-text-primary)">Top Selling Products</h2>
        <TopProductsTable products={topProducts} />
      </div>
    </AppShell>
  );
}