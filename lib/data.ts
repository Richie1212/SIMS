import { ActivityItem, CategoryBar, KPI, TrendPoint, WarehouseSlice } from "./types";

export const kpis: KPI[] = [
  {
    label: "Total Products",
    value: "1,248",
    trend: "+12 this week",
    trendDirection: "up",
    icon: "package",
    tone: "brand",
  },
  {
    label: "Low Stock Alerts",
    value: "14",
    trend: "Requires attention",
    trendDirection: "down",
    icon: "alert-triangle",
    tone: "danger",
  },
  {
    label: "Total Value",
    value: "$42.5K",
    trend: "+5.2% vs last month",
    trendDirection: "up",
    icon: "dollar-sign",
    tone: "success",
  },
  {
    label: "Expiring Soon",
    value: "8",
    trend: "Within 30 days",
    trendDirection: "neutral",
    icon: "calendar",
    tone: "warning",
  },
];

export const categoryBars: CategoryBar[] = [
  { label: "Pharma", value: 100 },
  { label: "Supplies", value: 75 },
  { label: "Medical", value: 62 },
  { label: "Devices", value: 50 },
  { label: "Misc", value: 37 },
];

export const stockTrend: TrendPoint[] = [
  { month: "Jan", value: 30 },
  { month: "Feb", value: 38 },
  { month: "Mar", value: 34 },
  { month: "Apr", value: 46 },
  { month: "May", value: 52 },
  { month: "Jun", value: 61 },
];

export const warehouseDistribution: WarehouseSlice[] = [
  { label: "Accra", value: 55, color: "var(--color-brand)" },
  { label: "Kumasi", value: 30, color: "var(--color-brand-light)" },
  { label: "Takoradi", value: 15, color: "var(--color-brand-faint)" },
];

export const recentActivity: ActivityItem[] = [
  { id: "1", icon: "plus", title: "Received new shipment", timeAgo: "2 mins ago" },
  { id: "2", icon: "minus", title: "Stock adjustment for SKU-102", timeAgo: "15 mins ago" },
  { id: "3", icon: "refresh-cw", title: "Inventory sync completed", timeAgo: "1 hour ago" },
];
