"use client";

import { useMemo, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/dexie";
import { DashboardRange, KPI, CategoryBar, StockActivityPoint, WarehouseSlice, ActivityItem } from "../types";
import { RANGE_DAYS, WAREHOUSE_PALETTE } from "../data";

function timeAgo(timestamp: number): string {
  const diffMs = Date.now() - timestamp;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export function useDashboard() {
  const [range, setRange] = useState<DashboardRange>("Month");

  const products = useLiveQuery(() => db.products.toArray(), []) ?? [];
  const activity = useLiveQuery(() => db.activityLog.orderBy("timestamp").reverse().limit(50).toArray(), []) ?? [];

  const cutoff = Date.now() - RANGE_DAYS[range] * 86_400_000;
  const activityInRange = useMemo(() => activity.filter((a) => a.timestamp >= cutoff), [activity, cutoff]);

  const kpis: KPI[] = useMemo(() => {
    const totalProducts = products.length;
    const lowStock = products.filter((p) => p.status === "Low Stock").length;
    const totalValue = products.reduce((sum, p) => sum + p.quantity * p.priceUSD, 0);
    const addedInRange = activityInRange.filter((a) => a.type === "plus").length;

    return [
      {
        label: "Total Products",
        value: totalProducts.toLocaleString(),
        trend: `+${addedInRange} this ${range.toLowerCase()}`,
        trendDirection: "up",
        icon: "package",
        tone: "brand",
      },
      {
        label: "Low Stock Alerts",
        value: String(lowStock),
        trend: "Requires attention",
        trendDirection: "down",
        icon: "alert-triangle",
        tone: "danger",
      },
      {
        label: "Total Value",
        value: `$${(totalValue / 1000).toFixed(1)}K`,
        trend: "Live from current stock",
        trendDirection: "up",
        icon: "dollar-sign",
        tone: "success",
      },
      {
        // TEMPORARY: Expiry module isn't Dexie-wired yet, so this can't
        // be computed for real until that pass happens. Replace this
        // block once db.expiryItems is live.
        label: "Expiring Soon",
        value: "—",
        trend: "Pending Expiry sync",
        trendDirection: "neutral",
        icon: "calendar",
        tone: "warning",
      },
    ];
  }, [products, activityInRange, range]);

  const categoryBars: CategoryBar[] = useMemo(() => {
    const totals = new Map<string, number>();
    for (const p of products) totals.set(p.category, (totals.get(p.category) ?? 0) + p.quantity);
    return [...totals.entries()]
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [products]);

  const warehouseDistribution: WarehouseSlice[] = useMemo(() => {
    const totals = new Map<string, number>();
    let grandTotal = 0;
    for (const p of products) {
      totals.set(p.warehouse, (totals.get(p.warehouse) ?? 0) + p.quantity);
      grandTotal += p.quantity;
    }
    
   return [...totals.entries()].map(([label, value], i) => ({
   label,
   value: grandTotal > 0 ? Math.round((value / grandTotal) * 100) : 0,
   color: WAREHOUSE_PALETTE[i % WAREHOUSE_PALETTE.length],
     }));

  const stockActivity: StockActivityPoint[] = useMemo(() => {
    // Real data, bucketed by day — genuinely derived from the activity
    // log's timestamps, replacing the old hand-authored fake trend chart.
    const buckets = new Map<string, number>();
    for (const a of activityInRange) {
      if (a.type !== "plus") continue;
      const label = new Date(a.timestamp).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
      buckets.set(label, (buckets.get(label) ?? 0) + 1);
    }
    return [...buckets.entries()].map(([label, added]) => ({ label, added }));
  }, [activityInRange]);

  const recentActivity: ActivityItem[] = useMemo(
    () =>
      activityInRange.slice(0, 6).map((a) => ({
        id: a.id,
        icon: a.type as ActivityItem["icon"],
        title: a.message,
        timeAgo: timeAgo(a.timestamp),
      })),
    [activityInRange]
  );

  return { range, setRange, kpis, categoryBars, warehouseDistribution, stockActivity, recentActivity };
}