import { LucideIcon } from "lucide-react";

interface ExpiryKPICardProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
   label: string;
  value: string | number;
  helper: string;
}

export default function ExpiryKPICard({ icon: Icon, iconBg, iconColor, label, value, helper }: ExpiryKPICardProps) {
  return (
    <div className="flex flex-1 flex-col gap-3 rounded-xl border border-(--color-border) bg-(--color-surface) p-4 shadow-[0_4px_6px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-[10px] ${iconBg}`}>
          <Icon size={18} className={iconColor} />
        </div>
        <p className="text-sm font-medium text-(--color-text-muted)">{label}</p>
      </div>
      <div>
        <p className="text-2xl font-bold text-(--color-text-primary)">{value}</p>
        <p className="text-xs text-(--color-text-muted)">{helper}</p>
      </div>
    </div>
  );
}