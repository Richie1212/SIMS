"use client";

import { useEffect, useState } from "react";
import { Monitor, Sun, Moon } from "lucide-react";
import AppShell from "@/components/AppShell";
import { ThemePreference, getStoredPreference, setStoredPreference } from "@/lib/themes";

const OPTIONS: { value: ThemePreference; label: string; description: string; icon: typeof Monitor }[] = [
  { value: "system", label: "System", description: "Match your device's appearance setting", icon: Monitor },
  { value: "light", label: "Light", description: "Always use light mode", icon: Sun },
  { value: "dark", label: "Dark", description: "Always use dark mode", icon: Moon },
];

export default function SettingsPage() {
  const [preference, setPreference] = useState<ThemePreference>("system");

  useEffect(() => {
    setPreference(getStoredPreference());
  }, []);

  function choose(value: ThemePreference) {
    setPreference(value);
    setStoredPreference(value);
  }

  return (
    <AppShell>
      <div>
        <h1 className="text-xl font-semibold text-(--color-text-primary)">Settings</h1>
        <p className="text-sm text-(--color-text-muted)">Manage your preferences.</p>
      </div>

      <div className="max-w-lg rounded-lg border border-(--color-border) bg-(--color-surface)">
        <div className="border-b border-(--color-border) px-4 py-3">
          <p className="text-sm font-medium text-(--color-text-primary)">Appearance</p>
          <p className="text-xs text-(--color-text-muted)">Controls how SIMS looks on this device.</p>
        </div>

        <div className="flex flex-col divide-y divide-(--color-border)">
          {OPTIONS.map(({ value, label, description, icon: Icon }) => {
            const active = preference === value;
            return (
              <button
                key={value}
                onClick={() => choose(value)}
                className="flex items-center gap-3 px-4 py-3 text-left transition hover:bg-(--color-neutral-tint)"
              >
                <Icon size={16} className={active ? "text-(--color-brand)" : "text-(--color-text-muted)"} />
                <div className="flex-1">
                  <p className={`text-sm ${active ? "font-medium text-(--color-text-primary)" : "text-(--color-text-secondary)"}`}>{label}</p>
                  <p className="text-xs text-(--color-text-muted)">{description}</p>
                </div>
                <div
                  className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                    active ? "border-(--color-brand) bg-(--color-brand)" : "border-(--color-border-strong)"
                  }`}
                >
                  {active && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}