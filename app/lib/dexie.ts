import Dexie, { type EntityTable } from "dexie";
import { Product } from "@/features/inventory/types";
import { ExpiryItem } from "@/features/inventory/expiry/expiry-types";

export interface ActivityLogEntry {
  id?: number;
  type: string;
  message: string;
  timestamp: number;
}

class SimsDB extends Dexie {
  products!: EntityTable<Product, "id">;
  expiryItems!: EntityTable<ExpiryItem, "id">;
  activityLog!: EntityTable<ActivityLogEntry, "id">;

  constructor() {
    super("sims-db");

    this.version(1).stores({
      products: "id, category, status, warehouse",
      expiryItems: "id, status",
      quotes: "id, status",
      purchaseOrders: "id, status, supplier",
    });

    this.version(2).stores({
      activityLog: "++id, timestamp, type",
    });
  }
}

export const db = new SimsDB();

export async function logActivity(type: string, message: string) {
  await db.activityLog.add({ type, message, timestamp: Date.now() });
}