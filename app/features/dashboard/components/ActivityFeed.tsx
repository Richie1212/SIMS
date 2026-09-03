import { Plus, Minus, RefreshCw } from "lucide-react";
import { ActivityItem } from "@/lib/types";

const ICONS = { plus: Plus, minus: Minus, "refresh-cw": RefreshCw };

export default function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-xl border border-(--color-border) bg-(--color-surface) p-3.5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-semibold text-(--color-text-primary)">Recent Activity</h2>
        <button className="text-sm font-medium text-(--color-brand) hover:underline">View All</button>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <div key={item.id} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--color-neutral-tint)">
                <Icon size={20} className="text-(--color-text-secondary)" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-(--color-text-primary)">{item.title}</p>
                <p className="text-xs text-(--color-text-muted)">{item.timeAgo}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
