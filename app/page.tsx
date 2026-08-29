"use client";

import { useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import DashboardHeader from "@/components/DashboardHeader";
import KPICard from "@/components/KPICard";
import CategoryBarChart from "@/components/CategoryBarChart";
import StockTrendChart from "@/components/StockTrendChart";
import WarehouseDonutChart from "@/components/WarehouseDonutChart";
import ActivityFeed from "@/components/ActivityFeed";
import {
  DashboardRange,
  getKpis,
  getCategoryBars,
  getStockTrend,
  getWarehouseDistribution,
  getRecentActivity,
} from "@/lib/data";
import { exportDashboardCSV } from "@/lib/dashboard-export";

export default function DashboardPage() {
  const [range, setRange] = useState<DashboardRange>("Month");

  const kpis = useMemo(() => getKpis(range), [range]);
  const categoryBars = useMemo(() => getCategoryBars(range), [range]);
  const stockTrend = useMemo(() => getStockTrend(range), [range]);
  const warehouseDistribution = useMemo(() => getWarehouseDistribution(range), [range]);
  const recentActivity = useMemo(() => getRecentActivity(range), [range]);

  return (
    <AppShell>
      <DashboardHeader range={range} onRangeChange={setRange} onExport={() => exportDashboardCSV(kpis, range)} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KPICard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <div className="flex flex-col gap-5 xl:flex-row">
        <CategoryBarChart data={categoryBars} />
        <StockTrendChart data={stockTrend} />
      </div>

      <div className="flex flex-col gap-5 xl:flex-row">
        <WarehouseDonutChart data={warehouseDistribution} />
        <ActivityFeed items={recentActivity} />
      </div>
    </AppShell>
  );
}