"use client";

import { useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, logActivity } from "@/lib/dexie";
import { ensureSeeded } from "@/lib/seed";
import { ExpiryItem } from "../expiry-types";

export function useExpiry() {
  useEffect(() => {
    ensureSeeded();
  }, []);

  const items = useLiveQuery(() => db.expiryItems.toArray(), []) ?? [];

  async function addItem(item: ExpiryItem) {
    await db.expiryItems.add(item);
    await logActivity("plus", `Added ${item.productName} to expiry tracking`);
  }

  async function updateItem(id: string, changes: Partial<ExpiryItem>) {
    const existing = await db.expiryItems.get(id);
    await db.expiryItems.update(id, changes);
    if (existing) await logActivity("refresh-cw", `Updated expiry record for ${existing.productName}`);
  }

  async function deleteItem(id: string) {
    const existing = await db.expiryItems.get(id);
    await db.expiryItems.delete(id);
    if (existing) await logActivity("minus", `Removed ${existing.productName} from expiry tracking`);
  }

  const expiringSoonCount = items.filter((i) => i.status === "Expiring Soon").length;
  const expiredCount = items.filter((i) => i.status === "Expired").length;

  return {
    items,
    addItem,
    updateItem,
    deleteItem,
    expiringSoonCount,
    expiredCount,
    totalTracked: items.length,
  };
}