import AppShell from "@/components/AppShell";
import DashboardHeader from "@/components/DashboardHeader";
import KPICard from "@/components/KPICard";
import CategoryBarChart from "@/components/CategoryBarChart";
import StockTrendChart from "@/components/StockTrendChart";
import WarehouseDonutChart from "@/components/WarehouseDonutChart";
import ActivityFeed from "@/components/ActivityFeed";
import { kpis, categoryBars, stockTrend, warehouseDistribution, recentActivity } from "@/lib/data";

export default function DashboardPage() {
  return (
    <AppShell>
      <DashboardHeader />

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
