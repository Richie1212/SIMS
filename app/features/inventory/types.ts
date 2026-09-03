export interface KPI {
  label: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down" | "neutral";
  icon: "package" | "alert-triangle" | "dollar-sign" | "calendar";
  tone: "brand" | "danger" | "success" | "warning";
}

export interface CategoryBar {
  label: string;
  value: number; // 0–100, used to scale bar height
}

export interface TrendPoint {
  month: string;
  value: number;
}

export interface WarehouseSlice {
  label: string;
  value: number;
  color: string;
}

export interface ActivityItem {
  id: string;
  icon: "plus" | "minus" | "refresh-cw";
  title: string;
  timeAgo: string;
}
