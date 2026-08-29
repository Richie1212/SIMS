import { PurchaseOrderStatus } from "@/lib/purchase-types";

const STYLES: Record<PurchaseOrderStatus, string> = {
  Pending: "bg-(--color-neutral-tint) text-(--color-text-secondary)",
  Ordered: "bg-(--color-brand-tint) text-(--color-brand)",
  Received: "bg-(--color-success-badge-bg) text-(--color-success-badge-text)",
  Cancelled: "bg-(--color-danger-badge-bg) text-(--color-danger-badge-text)",
};

export default function PurchaseStatusBadge({ status }: { status: PurchaseOrderStatus }) {
  return <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${STYLES[status]}`}>{status}</span>;
}