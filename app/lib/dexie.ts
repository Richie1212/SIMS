import Dexie from "dexie";

class SimsDB extends Dexie {
  constructor() {
    super("sims-db");

    this.version(1).stores({
      products: "id, category, status, warehouse",
      expiryItems: "id, status",
      quotes: "id, status",
      purchaseOrders: "id, status, supplier",
    });

    // Every meaningful write anywhere in the app appends here. This is
    // what makes "Recent Activity" and any real trend-over-time possible —
    // without it, the dashboard has no way to know WHEN something happened,
    // only its current state.
    this.version(2).stores({
      activityLog: "++id, timestamp, type",
    });
  }
}

export const db = new SimsDB();

export async function logActivity(type, message) {
  await db.activityLog.add({ type, message, timestamp: Date.now() });
}