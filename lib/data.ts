import { ActivityItem, CategoryBar, KPI, TrendPoint, WarehouseSlice } from "./types";

export type DashboardRange = "Week" | "Month" | "Year";

const KPIS_BY_RANGE: Record<DashboardRange, KPI[]> = {
  Week: [
    { label: "Total Products", value: "1,248", trend: "+3 this week", trendDirection: "up", icon: "package", tone: "brand" },
    { label: "Low Stock Alerts", value: "5", trend: "Requires attention", trendDirection: "down", icon: "alert-triangle", tone: "danger" },
    { label: "Total Value", value: "$9.8K", trend: "+2.1% vs last week", trendDirection: "up", icon: "dollar-sign", tone: "success" },
    { label: "Expiring Soon", value: "3", trend: "Within 7 days", trendDirection: "neutral", icon: "calendar", tone: "warning" },
  ],
  Month: [
    { label: "Total Products", value: "1,248", trend: "+12 this month", trendDirection: "up", icon: "package", tone: "brand" },
    { label: "Low Stock Alerts", value: "14", trend: "Requires attention", trendDirection: "down", icon: "alert-triangle", tone: "danger" },
    { label: "Total Value", value: "$42.5K", trend: "+5.2% vs last month", trendDirection: "up", icon: "dollar-sign", tone: "success" },
    { label: "Expiring Soon", value: "8", trend: "Within 30 days", trendDirection: "neutral", icon: "calendar", tone: "warning" },
  ],
  Year: [
    { label: "Total Products", value: "1,248", trend: "+186 this year", trendDirection: "up", icon: "package", tone: "brand" },
    { label: "Low Stock Alerts", value: "41", trend: "Requires attention", trendDirection: "down", icon: "alert-triangle", tone: "danger" },
    { label: "Total Value", value: "$486K", trend: "+18.4% vs last year", trendDirection: "up", icon: "dollar-sign", tone: "success" },
    { label: "Expiring Soon", value: "22", trend: "Within 12 months", trendDirection: "neutral", icon: "calendar", tone: "warning" },
  ],
};

const CATEGORY_BARS_BY_RANGE: Record<DashboardRange, CategoryBar[]> = {
  Week: [
    { label: "Pharma", value: 90 },
    { label: "Supplies", value: 60 },
    { label: "Medical", value: 45 },
    { label: "Devices", value: 30 },
    { label: "Misc", value: 20 },
  ],
  Month: [
    { label: "Pharma", value: 100 },
    { label: "Supplies", value: 75 },
    { label: "Medical", value: 62 },
    { label: "Devices", value: 50 },
    { label: "Misc", value: 37 },
  ],
  Year: [
    { label: "Pharma", value: 100 },
    { label: "Supplies", value: 88 },
    { label: "Medical", value: 71 },
    { label: "Devices", value: 64 },
    { label: "Misc", value: 48 },
  ],
};

const STOCK_TREND_BY_RANGE: Record<DashboardRange, TrendPoint[]> = {
  Week: [
    { month: "Mon", value: 48 },
    { month: "Tue", value: 52 },
    { month: "Wed", value: 47 },
    { month: "Thu", value: 58 },
    { month: "Fri", value: 63 },
    { month: "Sat", value: 55 },
  ],
  Month: [
    { month: "Jan", value: 30 },
    { month: "Feb", value: 38 },
    { month: "Mar", value: 34 },
    { month: "Apr", value: 46 },
    { month: "May", value: 52 },
    { month: "Jun", value: 61 },
  ],
  Year: [
    { month: "2020", value: 22 },
    { month: "2021", value: 31 },
    { month: "2022", value: 40 },
    { month: "2023", value: 53 },
    { month: "2024", value: 61 },
  ],
};

const WAREHOUSE_BY_RANGE: Record<DashboardRange, WarehouseSlice[]> = {
  Week: [
    { label: "Accra", value: 58, color: "var(--color-brand)" },
    { label: "Kumasi", value: 27, color: "var(--color-brand-light)" },
    { label: "Takoradi", value: 15, color: "#c9c9f7" },
  ],
  Month: [
    { label: "Accra", value: 55, color: "var(--color-brand)" },
    { label: "Kumasi", value: 30, color: "var(--color-brand-light)" },
    { label: "Takoradi", value: 15, color: "#c9c9f7" },
  ],
  Year: [
    { label: "Accra", value: 52, color: "var(--color-brand)" },
    { label: "Kumasi", value: 33, color: "var(--color-brand-light)" },
    { label: "Takoradi", value: 15, color: "#c9c9f7" },
  ],
};

const ACTIVITY_BY_RANGE: Record<DashboardRange, ActivityItem[]> = {
  Week: [
    { id: "1", icon: "plus", title: "Received new shipment", timeAgo: "2 mins ago" },
    { id: "2", icon: "minus", title: "Stock adjustment for SKU-102", timeAgo: "15 mins ago" },
    { id: "3", icon: "refresh-cw", title: "Inventory sync completed", timeAgo: "1 hour ago" },
  ],
  Month: [
    { id: "1", icon: "plus", title: "Received new shipment", timeAgo: "2 mins ago" },
    { id: "2", icon: "minus", title: "Stock adjustment for SKU-102", timeAgo: "15 mins ago" },
    { id: "3", icon: "refresh-cw", title: "Inventory sync completed", timeAgo: "1 hour ago" },
    { id: "4", icon: "plus", title: "Received shipment from PharmaCorp", timeAgo: "3 days ago" },
  ],
  Year: [
    { id: "1", icon: "plus", title: "Received new shipment", timeAgo: "2 mins ago" },
    { id: "2", icon: "refresh-cw", title: "Annual inventory audit completed", timeAgo: "2 weeks ago" },
    { id: "3", icon: "minus", title: "Year-end stock write-off", timeAgo: "1 month ago" },
  ],
};

export function getKpis(range: DashboardRange) {
  return KPIS_BY_RANGE[range];
}
export function getCategoryBars(range: DashboardRange) {
  return CATEGORY_BARS_BY_RANGE[range];
}
export function getStockTrend(range: DashboardRange) {
  return STOCK_TREND_BY_RANGE[range];
}
export function getWarehouseDistribution(range: DashboardRange) {
  return WAREHOUSE_BY_RANGE[range];
}
export function getRecentActivity(range: DashboardRange) {
  return ACTIVITY_BY_RANGE[range];
}