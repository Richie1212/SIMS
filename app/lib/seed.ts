import { db } from "./dexie";
import { seedProducts } from "@/features/inventory/data";

let seeded = false;

export async function ensureSeeded() {
  if (seeded) return;
  seeded = true;

  const productCount = await db.products.count();
  if (productCount === 0) {
    await db.products.bulkAdd(seedProducts);
  }
  // Expiry items, quotes, and purchase orders get the same treatment
  // in the next pass, once this pattern is confirmed on Products.
}