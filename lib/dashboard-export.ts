import { KPI } from "./types";

export function exportDashboardCSV(kpis: KPI[], range: string) {
  const header = "metric,value,trend";
  const rows = kpis.map((k) => `${k.label},${k.value},"${k.trend}"`);
  const csv = [header, ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `dashboard-summary-${range.toLowerCase()}-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}