import { Package, AlertTriangle, DollarSign, Calendar, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { KPI } from "@/lib/types";

const ICONS = { package: Package, "alert-triangle": AlertTriangle, "dollar-sign": DollarSign, calendar: Calendar };

const TONE_STYLES = {
  brand: { bg: "bg-(--color-brand-tint)", icon: "text-(--color-brand)" },
  danger: { bg: "bg-(--color-danger-tint)", icon: "text-(--color-danger)" },
  success: { bg: "bg-(--color-success-tint)", icon: "text-(--color-success)" },
  warning: { bg: "bg-(--color-warning-tint)", icon: "text-(--color-warning)" },
};

const TREND_STYLES = {
  up: { icon: ArrowUpRight, color: "text-(--color-success)" },
  down: { icon: ArrowDownRight, color: "text-(--color-danger)" },
  neutral: { icon: Clock, color: "text-(--color-warning)" },
};

export default function KPICard({ kpi }: { kpi: KPI }) {
  const Icon = ICONS[kpi.icon];
  const tone = TONE_STYLES[kpi.tone];
  const trend = TREND_STYLES[kpi.trendDirection];
  const TrendIcon = trend.icon;

  return (
    <div className="flex flex-1 flex-col gap-2 rounded-xl border border-(--color-border) bg-(--color-surface) p-4 shadow-[0_4px_6px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-(--color-text-muted)">{kpi.label}</p>
        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${tone.bg}`}>
          <Icon size={16} className={tone.icon} />
        </div>
      </div>
      <p className="text-2xl font-bold text-(--color-text-primary)">{kpi.value}</p>
      <div className="flex items-center gap-1">
        <TrendIcon size={14} className={trend.color} />
        <span className={`text-xs font-medium ${trend.color}`}>{kpi.trend}</span>
      </div>
    </div>
  );
}
