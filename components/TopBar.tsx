"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Bell, LogOut } from "lucide-react";
import { getSession, signOut } from "@/lib/auth";

export default function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const email = getSession()?.email ?? "";
  const initial = email.charAt(0).toUpperCase() || "R";

  function handleSignOut() {
    signOut();
    router.replace("/login");
  }

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

        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Account menu"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-(--color-brand) text-xs font-semibold text-white"
          >
            {initial}
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-9 z-50 w-44 overflow-hidden rounded-md border border-(--color-border) bg-(--color-surface) shadow-sm">
              <div className="truncate border-b border-(--color-border) px-3 py-2 text-xs text-(--color-text-muted)">{email}</div>
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-(--color-danger) hover:bg-(--color-neutral-tint)"
              >
                <LogOut size={14} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}