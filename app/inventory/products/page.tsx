"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import AppShell from "@/components/AppShell";
import ProductsTable from "@/components/ProductsTable";
import Modal from "@/components/Modal";
import AddProductForm from "@/components/AddProductForm";
import { products as initialProducts } from "@/lib/inventory-data";
import { Product } from "@/lib/inventory-types";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [modalOpen, setModalOpen] = useState(false);

  function handleSave(product: Product) {
    setProducts((prev) => [product, ...prev]);
    setModalOpen(false);
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">
            <span className="text-(--color-text-primary)">Inventory/</span>
            <span className="text-(--color-text-muted)"> Products</span>
          </h1>
          <p className="text-sm text-(--color-text-muted)">Manage and track all your products.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-2xl bg-(--color-brand) px-4 py-2.5 text-sm font-bold text-white shadow-[0_4px_6px_rgba(59,130,246,0.25)] transition hover:opacity-90"
        >
          <Plus size={18} />
          Add product
        </button>
      </div>

      <ProductsTable products={products} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <AddProductForm onSave={handleSave} onCancel={() => setModalOpen(false)} />
      </Modal>
    </AppShell>
  );
}