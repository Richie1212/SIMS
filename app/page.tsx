import Link from "next/link";
import { Package, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    icon: Package,
    title: "Full inventory control",
    desc: "Track stock, expiry dates, and warehouse levels across every location in real time.",
  },
  {
    icon: TrendingUp,
    title: "Sales & purchasing built in",
    desc: "Run point-of-sale, send quotes, and manage purchase orders without leaving the app.",
  },
  {
    icon: ShieldCheck,
    title: "Reports you can trust",
    desc: "Live analytics computed from your actual data — not static numbers that go stale.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-(--color-page-bg)">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-(--color-brand)">
            <span className="text-xs font-bold text-white">S</span>
          </div>
          <span className="text-sm font-semibold text-(--color-text-primary)">SIMS</span>
        </div>
        <Link
          href="/login"
          className="rounded-md bg-(--color-brand) px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Sign in
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-6 pb-20 pt-16 text-center sm:pt-24">
        <h1 className="text-3xl font-bold tracking-tight text-(--color-text-primary) sm:text-5xl">
          Inventory management,{" "}
          <span className="bg-gradient-to-r from-(--color-brand) to-(--color-status-review) bg-clip-text text-transparent">
            without the chaos
          </span>
        </h1>
        <p className="mt-4 max-w-xl text-base text-(--color-text-muted) sm:text-lg">
          Stock, sales, purchasing, and reporting — one system for pharmacy and warehouse operations, built to stay fast as you grow.
        </p>

        <Link
          href="/login"
          className="mt-8 flex items-center gap-2 rounded-full bg-(--color-brand) px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
        >
          Get started
          <ArrowRight size={16} />
        </Link>

        <div className="mt-20 grid w-full grid-cols-1 gap-6 text-left sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-(--color-brand-tint)">
                <Icon size={18} className="text-(--color-brand)" />
              </div>
              <p className="text-sm font-semibold text-(--color-text-primary)">{title}</p>
              <p className="mt-1 text-sm text-(--color-text-muted)">{desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-(--color-border) px-6 py-6 text-center text-xs text-(--color-text-faint)">
        © {new Date().getFullYear()} SIMS. Built as a portfolio project.
      </footer>
    </div>
  );
}