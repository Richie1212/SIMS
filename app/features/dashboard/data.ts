import { DashboardRange } from "./types";

// Single source of truth for which ranges exist and how many days each
// covers — both useDashboard.ts and DashboardHeader.tsx import from here
// instead of each hardcoding their own copy.
export const RANGES: DashboardRange[] = ["Week", "Month", "Year"];

export const RANGE_DAYS: Record<DashboardRange, number> = {
  Week: 7,
  Month: 30,
  Year: 365,
};

// Warehouse donut chart color ramp — kept here rather than inline in
// useDashboard.ts so any future chart needing warehouse colors reuses
// the exact same palette instead of inventing a new one.
export const WAREHOUSE_PALETTE = ["var(--color-brand)", "var(--color-brand-light)", "#c9c9f7", "#e0e0fb"];