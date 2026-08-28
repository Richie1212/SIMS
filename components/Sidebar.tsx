"use client";

import { useEffect, useState } from "react";
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
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const INVENTORY_CHILDREN = [
  { label: "Products", href: "/inventory/products" },
  { label: "Expiry tracker", href: "/inventory/expiry" },
];

const NAV = [
  { label: "Sales", href: "/sales", icon: Receipt },
  { label: "Purchases", href: "/purchases", icon: ShoppingCart },
  { label: "Analytics and Reports", href: "/reports", icon: BarChart2 },
];

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const [inventoryOpen, setInventoryOpen] = useState(pathname.startsWith("/inventory"));
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sims-sidebar-collapsed");
    if (stored) setCollapsed(stored === "true");
  }, []);

  function toggleCollapsed() {
    setCollapsed((c) => {
      localStorage.setItem("sims-sidebar-collapsed", String(!c));
      return !c;
    });
  }

  const width = collapsed ? "lg:w-16" : "lg:w-60";

  return (
    <>
      {mobileOpen && (
        <div onClick={onCloseMobile} className="fixed inset-0 z-40 bg-black/20 lg:hidden" aria-hidden="true" />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 shrink-0 flex-col border-r border-(--color-border) bg-(--color-sidebar-bg) transition-[width,transform] duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${width} ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-3 py-3">
          <Link href="/" className={`flex items-center gap-2 overflow-hidden ${collapsed ? "lg:w-0 lg:opacity-0" : ""}`}>
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-(--color-brand)">
              <span className="text-xs font-bold text-white">S</span>
            </div>
            <span className="whitespace-nowrap text-sm font-semibold text-(--color-text-primary)">SIMS</span>
          </Link>
          <div
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-(--color-brand) lg:hidden ${collapsed ? "flex" : "hidden"}`}
          >
            <span className="text-xs font-bold text-white">S</span>
          </div>
          <button
            onClick={toggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden shrink-0 rounded-md p-1 text-(--color-text-muted) transition hover:bg-(--color-neutral-tint) hover:text-(--color-text-primary) lg:flex"
          >
            {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>
        </div>

        <nav className="flex flex-col gap-0.5 px-2">
          <SidebarLink href="/" icon={LayoutDashboard} label="Dashboard" active={pathname === "/"} collapsed={collapsed} />

          {!collapsed && <p className="mt-3 px-2 pb-1 text-[11px] font-medium uppercase tracking-wide text-(--color-text-faint)">Modules</p>}

          <button
            onClick={() => (collapsed ? undefined : setInventoryOpen((v) => !v))}
            title={collapsed ? "Inventory" : undefined}
            className={`group flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition ${
              pathname.startsWith("/inventory") ? "text-(--color-brand)" : "text-(--color-text-secondary) hover:bg-(--color-neutral-tint)"
            }`}
          >
            <Package size={16} className="shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">Inventory</span>
                <ChevronDown size={14} className={`transition-transform ${inventoryOpen ? "rotate-180" : ""}`} />
              </>
            )}
          </button>

          {!collapsed && inventoryOpen && (
            <div className="ml-6 flex flex-col gap-0.5 border-l border-(--color-border) pl-3">
              {INVENTORY_CHILDREN.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={`rounded-md px-2 py-1.5 text-sm transition ${
                    pathname === child.href ? "font-medium text-(--color-brand)" : "text-(--color-text-secondary) hover:bg-(--color-neutral-tint)"
                  }`}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          )}

          {NAV.map(({ label, href, icon }) => (
            <SidebarLink key={href} href={href} icon={icon} label={label} active={pathname === href} collapsed={collapsed} />
          ))}
        </nav>

        <div className="flex-1" />

        <div className="flex flex-col gap-0.5 px-2 pb-3">
          <SidebarLink href="/settings" icon={Settings} label="Settings" active={pathname === "/settings"} collapsed={collapsed} />
          <SidebarButton icon={HelpCircle} label="Help" collapsed={collapsed} />
        </div>
      </aside>
    </>
  );
}

function SidebarLink({
  href,
  icon: Icon,
  label,
  active,
  collapsed,
}: {
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  active: boolean;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition ${
        active ? "bg-(--color-brand-tint) text-(--color-brand)" : "text-(--color-text-secondary) hover:bg-(--color-neutral-tint)"
      }`}
    >
      <Icon size={16} className="shrink-0" />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

function SidebarButton({
  icon: Icon,
  label,
  collapsed,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  collapsed: boolean;
}) {
  return (
    <button
      title={collapsed ? label : undefined}
      className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-sm text-(--color-text-secondary) transition hover:bg-(--color-neutral-tint)"
    >
      <Icon size={16} className="shrink-0" />
      {!collapsed && <span>{label}</span>}
    </button>
  );
}