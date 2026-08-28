"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Receipt,
  BarChart2,
  Settings,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

const INVENTORY_CHILDREN = [
  { label: "Products", href: "/inventory/products" },
  { label: "Expiry tracker", href: "/inventory/expiry" },
];

const NAV = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Sales", href: "/sales", icon: Receipt },
  { label: "Purchases", href: "/purchases", icon: ShoppingCart },
  { label: "Analytics and Reports", href: "/reports", icon: BarChart2 },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [inventoryOpen, setInventoryOpen] = useState(pathname.startsWith("/inventory"));

  return (
    <>
      {open && (
        <div onClick={onClose} className="fixed inset-0 z-40 bg-black/30 lg:hidden" aria-hidden="true" />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] shrink-0 flex-col gap-6 border-r border-(--color-border) bg-(--color-surface) px-4 py-5 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link href="/" className="flex items-center gap-3 px-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-(--color-brand)">
            <span className="text-sm font-bold text-white">S</span>
          </div>
          <span className="text-lg font-bold text-(--color-text-primary)">SIMS</span>
        </Link>

        <nav className="flex flex-col gap-1">
          <Link
            href="/"
            className={`flex items-center gap-3 rounded-xl p-2.5 text-left text-sm font-medium transition ${
              pathname === "/" ? "bg-(--color-brand-tint) text-(--color-brand)" : "text-(--color-text-secondary) hover:bg-(--color-neutral-tint)"
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <p className="mt-3 px-2.5 text-xs font-medium text-(--color-text-muted)">Modules</p>

          <button
            onClick={() => setInventoryOpen((v) => !v)}
            aria-expanded={inventoryOpen}
            className={`flex items-center gap-3 rounded-xl p-2.5 text-left text-sm font-medium transition ${
              pathname.startsWith("/inventory") ? "text-(--color-brand)" : "text-(--color-text-secondary) hover:bg-(--color-neutral-tint)"
            }`}
          >
            <Package size={18} />
            <span className="flex-1">Inventory</span>
            <ChevronDown size={16} className={`transition-transform ${inventoryOpen ? "rotate-180" : ""}`} />
          </button>

          {inventoryOpen && (
            <div className="ml-8 flex flex-col gap-1">
              {INVENTORY_CHILDREN.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={`rounded-lg px-2.5 py-2 text-sm transition ${
                    pathname === child.href
                      ? "font-medium text-(--color-brand)"
                      : "text-(--color-text-primary) hover:bg-(--color-neutral-tint)"
                  }`}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          )}

          {NAV.slice(1).map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl p-2.5 text-left text-sm font-medium transition ${
                pathname === href ? "bg-(--color-brand-tint) text-(--color-brand)" : "text-(--color-text-secondary) hover:bg-(--color-neutral-tint)"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <div className="flex flex-col gap-1">
          <button className="flex items-center gap-3 rounded-xl p-2.5 text-left text-sm font-medium text-(--color-text-secondary) transition hover:bg-(--color-neutral-tint)">
            <Settings size={18} />
            Settings
          </button>
          <button className="flex items-center gap-3 rounded-xl p-2.5 text-left text-sm font-medium text-(--color-text-secondary) transition hover:bg-(--color-neutral-tint)">
            <HelpCircle size={18} />
            Help
          </button>
        </div>
      </aside>
    </>
  );
}
