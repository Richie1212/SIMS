import { CategoryRevenue, ReportRange, RevenuePoint, TopProduct } from "./report-types";

const REVENUE_BY_RANGE: Record<ReportRange, RevenuePoint[]> = {
  Week: [
    { period: "Mon", revenue: 820 },
    { period: "Tue", revenue: 940 },
    { period: "Wed", revenue: 760 },
    { period: "Thu", revenue: 1100 },
    { period: "Fri", revenue: 1350 },
    { period: "Sat", revenue: 980 },
    { period: "Sun", revenue: 610 },
  ],
  Month: [
    { period: "Week 1", revenue: 4200 },
    { period: "Week 2", revenue: 5100 },
    { period: "Week 3", revenue: 4700 },
    { period: "Week 4", revenue: 6300 },
  ],
  Year: [
    { period: "Jan", revenue: 14200 },
    { period: "Feb", revenue: 15800 },
    { period: "Mar", revenue: 13900 },
    { period: "Apr", revenue: 17200 },
    { period: "May", revenue: 19100 },
    { period: "Jun", revenue: 21400 },
  ],
};

const TOP_PRODUCTS_BY_RANGE: Record<ReportRange, TopProduct[]> = {
  Week: [
    { name: "Paracetamol 500mg", category: "Tablets", unitsSold: 480, revenueUSD: 576 },
    { name: "Ceftriaxone 1g", category: "Injections", unitsSold: 22, revenueUSD: 396 },
    { name: "Cough Syrup 200ml", category: "Syrups", unitsSold: 65, revenueUSD: 422.5 },
    { name: "Ibuprofen 200mg", category: "Tablets", unitsSold: 310, revenueUSD: 263.5 },
  ],
  Month: [
    { name: "Paracetamol 500mg", category: "Tablets", unitsSold: 1920, revenueUSD: 2304 },
    { name: "Ceftriaxone 1g", category: "Injections", unitsSold: 88, revenueUSD: 1584 },
    { name: "Amoxicillin 500mg", category: "Capsules", unitsSold: 340, revenueUSD: 850 },
    { name: "Cough Syrup 200ml", category: "Syrups", unitsSold: 260, revenueUSD: 1690 },
  ],
  Year: [
    { name: "Paracetamol 500mg", category: "Tablets", unitsSold: 23000, revenueUSD: 27600 },
    { name: "Ceftriaxone 1g", category: "Injections", unitsSold: 1050, revenueUSD: 18900 },
    { name: "Cough Syrup 200ml", category: "Syrups", unitsSold: 3100, revenueUSD: 20150 },
    { name: "Amoxicillin 500mg", category: "Capsules", unitsSold: 4080, revenueUSD: 10200 },
  ],
};

const CATEGORY_REVENUE_BY_RANGE: Record<ReportRange, CategoryRevenue[]> = {
  Week: [
    { category: "Tablets", revenueUSD: 840 },
    { category: "Injections", revenueUSD: 396 },
    { category: "Syrups", revenueUSD: 422.5 },
    { category: "Capsules", revenueUSD: 180 },
  ],
  Month: [
    { category: "Tablets", revenueUSD: 3200 },
    { category: "Injections", revenueUSD: 1584 },
    { category: "Syrups", revenueUSD: 1690 },
    { category: "Capsules", revenueUSD: 850 },
  ],
  Year: [
    { category: "Tablets", revenueUSD: 38600 },
    { category: "Injections", revenueUSD: 18900 },
    { category: "Syrups", revenueUSD: 20150 },
    { category: "Capsules", revenueUSD: 10200 },
  ],
};

export function getRevenueTrend(range: ReportRange): RevenuePoint[] {
  return REVENUE_BY_RANGE[range];
}

export function getTopProducts(range: ReportRange): TopProduct[] {
  return TOP_PRODUCTS_BY_RANGE[range];
}

export function getCategoryRevenue(range: ReportRange): CategoryRevenue[] {
  return CATEGORY_REVENUE_BY_RANGE[range];
}