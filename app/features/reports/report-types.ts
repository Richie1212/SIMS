export type ReportRange = "Week" | "Month" | "Year";

export interface RevenuePoint {
  period: string;
  revenue: number;
}

export interface TopProduct {
  name: string;
  category: string;
  unitsSold: number;
  revenueUSD: number;
}

export interface CategoryRevenue {
  category: string;
  revenueUSD: number;
}