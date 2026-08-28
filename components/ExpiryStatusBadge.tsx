import { ExpiryStatus } from "@/lib/expiry-types";

const STYLES: Record<ExpiryStatus, string> = {
  Valid: "bg-(--color-success-badge-bg) text-(--color-success-badge-text)",
  "Expiring Soon": "bg-(--color-warning-badge-bg) text-(--color-warning-badge-text)",
  Expired: "bg-(--color-danger-badge-bg) text-(--color-danger-badge-text)",
};

export default function ExpiryStatusBadge({ status }: { status: ExpiryStatus }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${STYLES[status]}`}>
      {status}
    </span>
  );
}