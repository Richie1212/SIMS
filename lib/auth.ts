"use client";

const SESSION_KEY = "sims-session";

export function signIn(email: string) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
}

export function signOut() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): { email: string } | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function isSignedIn(): boolean {
  return getSession() !== null;
}