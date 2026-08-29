"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import AppShell from "@/components/AppShell";
import PurchaseOrdersTable from "@/components/PurchaseOrdersTable";
import Modal from "@/components/Modal";
import NewPurchaseOrderForm from "@/components/NewPurchaseOrderForm";
import { purchaseOrders as initialOrders } from "@/lib/purchase-data";
import { PurchaseOrder } from "@/lib/purchase-types";

export default function PurchasesPage() {
  const [orders, setOrders] = useState<PurchaseOrder[]>(initialOrders);
  const [modalOpen, setModalOpen] = useState(false);

  function handleSave(order: PurchaseOrder) {
    setOrders((prev) => [order, ...prev]);
    setModalOpen(false);
  }

  function markReceived(id: string) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: "Received" } : o)));
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-(--color-text-primary)">Purchases</h1>
          <p className="text-sm text-(--color-text-muted)">Order and track stock from your suppliers.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-md bg-(--color-brand) px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          <Plus size={16} />
          New Purchase Order
        </button>
      </div>

      <PurchaseOrdersTable orders={orders} onMarkReceived={markReceived} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <NewPurchaseOrderForm onSave={handleSave} onCancel={() => setModalOpen(false)} />
      </Modal>
    </AppShell>
  );
}