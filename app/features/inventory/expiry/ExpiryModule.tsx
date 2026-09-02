import { AlertTriangle, AlertCircle, CheckCircle2, FileDown } from "lucide-react";
import AppShell from "@/components/AppShell";
import ExpiryKPICard from "@/app/features/products/components/ExpiryKPICard";
import ExpiryTable from "@/components/ExpiryTable";
import { expiryItems } from "@/lib/expiry-data";

export default function ExpiryTrackerPage() {
  const expiringSoonCount = expiryItems.filter((i) => i.status === "Expiring Soon").length;
  const expiredCount = expiryItems.filter((i) => i.status === "Expired").length;

  return (
    <AppShell>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">
            <span className="text-(--color-text-primary)">Inventory/</span>
            <span className="text-(--color-text-muted)"> Expiry tracker</span>
          </h1>
          <p className="text-sm text-(--color-text-muted)">Monitor and manage product expiry dates.</p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-2xl bg-(--color-brand) px-4 py-2.5 text-sm font-bold tracking-wide text-white shadow-[0_4px_6px_rgba(59,130,246,0.25)] transition hover:opacity-90">
          <FileDown size={16} />
          Export
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ExpiryKPICard
          icon={AlertTriangle}
          iconBg="bg-(--color-warning-badge-bg)"
          iconColor="text-(--color-warning)"
          label="Expiring this month"
          value={expiringSoonCount}
          helper="Requires immediate attention"
        />
        <ExpiryKPICard
          icon={AlertCircle}
          iconBg="bg-(--color-danger-badge-bg)"
          iconColor="text-(--color-danger)"
          label="Expired products"
          value={expiredCount}
          helper="Action required to quarantine"
        />
        <ExpiryKPICard
          icon={CheckCircle2}
          iconBg="bg-(--color-success-badge-bg)"
          iconColor="text-(--color-success)"
          label="Total tracked"
          value={expiryItems.length}
          helper="Active inventory items"
        />
      </div>

      <ExpiryTable items={expiryItems} />
    </AppShell>
  );
}