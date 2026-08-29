import { QuoteStatus } from "@/lib/quote-types";

const STYLES: Record<QuoteStatus, string> = {
  Draft: "bg-(--color-neutral-tint) text-(--color-text-secondary)",
  Sent: "bg-(--color-brand-tint) text-(--color-brand)",
  Accepted: "bg-(--color-success-badge-bg) text-(--color-success-badge-text)",
  Expired: "bg-(--color-danger-badge-bg) text-(--color-danger-badge-text)",
};

export default function QuoteStatusBadge({ status }: { status: QuoteStatus }) {
  return <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${STYLES[status]}`}>{status}</span>;
}