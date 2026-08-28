import { StockStatus } from "@/lib/inventory-types";

const STYLES: Record<StockStatus, string> = {
  "In Stock": "bg-(--color-success-badge-bg) text-(--color-success-badge-text)",
  "Low Stock": "bg-(--color-warning-badge-bg) text-(--color-warning-badge-text)",
  "Out of Stock": "bg-(--color-danger-badge-bg) text-(--color-danger-badge-text)",
};

export default function StatusBadge({ status }: { status: StockStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STYLES[status]}`}>
      {status}
    </span>
  );
}
