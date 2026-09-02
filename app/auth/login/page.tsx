"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Package } from "lucide-react";
import { signIn } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || password.length < 4) {
      setError("Enter a valid email and a password of at least 4 characters.");
      return;
    }
    signIn(email.trim());
    router.replace("/");
  }

  return (
    <div className="flex min-h-screen">
      {/* Brand panel — hidden on mobile, this is the visual anchor on desktop */}
      <div className="hidden w-1/2 flex-col justify-between bg-(--color-sidebar-bg) p-10 lg:flex">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-(--color-brand)">
            <span className="text-sm font-bold text-white">S</span>
          </div>
          <span className="text-lg font-semibold text-(--color-text-primary)">SIMS</span>
        </div>

        <div>
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-(--color-brand-tint)">
            <Package size={22} className="text-(--color-brand)" />
          </div>
          <p className="max-w-sm text-2xl font-medium leading-snug text-(--color-text-primary)">
            Manage inventory, sales, and purchases in one place.
          </p>
          <p className="mt-3 max-w-sm text-sm text-(--color-text-muted)">
            Real-time stock visibility across every warehouse, built for pharmacy and warehouse operations.
          </p>
        </div>

        <p className="text-xs text-(--color-text-faint)">© {new Date().getFullYear()} Tobinco Pharmaceuticals Ltd.</p>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center bg-(--color-page-bg) p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-(--color-brand)">
              <span className="text-sm font-bold text-white">S</span>
            </div>
            <span className="text-lg font-semibold text-(--color-text-primary)">SIMS</span>
          </div>

          <h1 className="text-xl font-semibold text-(--color-text-primary)">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-(--color-text-muted)">
            {mode === "signin" ? "Sign in to continue to SIMS." : "Set up access to your inventory dashboard."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-(--color-text-primary)">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@company.com"
                className="h-10 rounded-md border border-(--color-border) bg-(--color-surface) px-3 text-base outline-none focus:border-(--color-brand) sm:text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-(--color-text-primary)">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="h-10 rounded-md border border-(--color-border) bg-(--color-surface) px-3 text-base outline-none focus:border-(--color-brand) sm:text-sm"
              />
            </div>

            {error && <p className="text-sm text-(--color-danger)">{error}</p>}

            <button
              type="submit"
              className="mt-2 h-10 rounded-md bg-(--color-brand) text-sm font-semibold text-white transition hover:opacity-90"
            >
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-(--color-text-muted)">
            {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setError("");
              }}
              className="font-medium text-(--color-brand) hover:underline"
            >
              {mode === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}