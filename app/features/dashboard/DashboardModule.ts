"use client";

import DashboardHeader from "./components/DashboardHeader";
import KPICard from "./components/KPICard";
import CategoryBarChart from "./components/CategoryBarChart";
import WarehouseDonutChart from "./components/WarehouseDonutChart";
import ActivityFeed from "./components/ActivityFeed";
import { useDashboard } from "./hooks/useDashboard";
import { exportDashboardCSV } from "./dashboard-export";

export default function DashboardModule() {
  const { range, setRange, kpis, categoryBars, warehouseDistribution, recentActivity } = useDashboard();

  return (
    <>
      <DashboardHeader range={range} onRangeChange={setRange} onExport={() => exportDashboardCSV(kpis, range)} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KPICard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <div className="flex flex-col gap-5 xl:flex-row">
        <CategoryBarChart data={categoryBars} />
        <WarehouseDonutChart data={warehouseDistribution} />
      </div>

      <ActivityFeed items={recentActivity} />
    </>
  );
}