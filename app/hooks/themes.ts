"use client";

export type ThemePreference = "system" | "light" | "dark";

const STORAGE_KEY = "sims-theme-preference";

export function getStoredPreference(): ThemePreference {
  if (typeof window === "undefined") return "system";
  return (localStorage.getItem(STORAGE_KEY) as ThemePreference) ?? "system";
}

export function setStoredPreference(pref: ThemePreference) {
  localStorage.setItem(STORAGE_KEY, pref);
  applyResolvedTheme(pref);
}

function systemPrefersDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function applyResolvedTheme(pref: ThemePreference) {
  const resolved = pref === "system" ? (systemPrefersDark() ? "dark" : "light") : pref;
  document.documentElement.setAttribute("data-theme", resolved);
}