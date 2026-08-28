"use client";

import { Menu, Bell } from "lucide-react";

export default function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div className="flex items-center justify-between border-b border-(--color-border) px-5 py-3 sm:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Toggle menu"
          className="text-(--color-text-secondary) hover:text-(--color-text-primary)"
        >
          <Menu size={20} />
        </button>
        <span className="hidden text-sm font-medium text-(--color-text-primary) sm:inline">
          Tobinco Pharmaceuticals Ltd.
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button aria-label="Notifications" className="relative text-(--color-text-secondary) hover:text-(--color-text-primary)">
          <Bell size={20} />
          <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-(--color-danger) text-[10px] font-semibold text-white">
            2
          </span>
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-brand) text-sm font-semibold text-white">
          R
        </div>
      </div>
    </div>
  );
}
