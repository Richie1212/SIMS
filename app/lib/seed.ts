import { db } from "./dexie";
import { seedProducts } from "@/features/inventory/data";
import { expiryItems } from "@/features/inventory/expiry/expiry-data";

let seeded = false;

export async function ensureSeeded() {
  if (seeded) return;
  seeded = true;

  const productCount = await db.products.count();
  if (productCount === 0) {
    await db.products.bulkAdd(seedProducts);
  }

  const expiryCount = await db.expiryItems.count();
  if (expiryCount === 0) {
    await db.expiryItems.bulkAdd(expiryItems);
  }
}