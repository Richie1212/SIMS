"use client";

import { useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, logActivity } from "@/lib/dexie";
import { ensureSeeded } from "@/lib/seed";
import { Product } from "../../types";

export function useProducts() {
  useEffect(() => {
    ensureSeeded();
  }, []);

  const products = useLiveQuery(() => db.products.toArray(), []) ?? [];

  async function addProduct(product: Product) {
    await db.products.add(product);
    await logActivity("plus", `Added ${product.name} to inventory`);
  }

  async function updateProduct(id: string, changes: Partial<Product>) {
    const existing = await db.products.get(id);
    await db.products.update(id, changes);
    if (existing) await logActivity("refresh-cw", `Updated ${existing.name}`);
  }

  async function deleteProduct(id: string) {
    const existing = await db.products.get(id);
    await db.products.delete(id);
    if (existing) await logActivity("minus", `Removed ${existing.name} from inventory`);
  }

  return { products, addProduct, updateProduct, deleteProduct };
}