"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import AppShell from "@/components/AppShell";
import QuotesTable from "@/components/QuotesTable";
import Modal from "@/app/features/products/components/Modal";
import NewQuoteForm from "@/app/features/products/components/NewQuoteForm";
import { quotes as initialQuotes } from "@/lib/quote-data";
import { Quote } from "@/lib/quote-types";

export default function SalesQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);

  function handleSave(quote: Quote) {
    setQuotes((prev) => [quote, ...prev]);
    setModalOpen(false);
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-(--color-text-primary)">
            <span>Sales/</span> <span className="text-(--color-text-muted)">Quotes</span>
          </h1>
          <p className="text-sm text-(--color-text-muted)">Create and track sales quotations.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-md bg-(--color-brand) px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          <Plus size={16} />
          New Quote
        </button>
      </div>

      <QuotesTable quotes={quotes} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <NewQuoteForm onSave={handleSave} onCancel={() => setModalOpen(false)} />
      </Modal>
    </AppShell>
  );
}