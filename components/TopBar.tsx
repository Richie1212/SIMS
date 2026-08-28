"use client";

import { Menu, Bell } from "lucide-react";

export default function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div className="flex items-center justify-between border-b border-(--color-border) bg-(--color-page-bg) px-4 py-2.5 sm:px-6">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} aria-label="Toggle menu" className="text-(--color-text-muted) hover:text-(--color-text-primary) lg:hidden">
          <Menu size={18} />
        </button>
        <span className="hidden text-sm text-(--color-text-secondary) sm:inline">Tobinco Pharmaceuticals Ltd.</span>
      </div>

      <div className="flex items-center gap-3">
        <button aria-label="Notifications" className="relative text-(--color-text-muted) hover:text-(--color-text-primary)">
          <Bell size={18} />
          <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-(--color-danger) text-[9px] font-semibold text-white">
            2
          </span>
        </button>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-(--color-brand) text-xs font-semibold text-white">R</div>
      </div>
    </div>
  );
}