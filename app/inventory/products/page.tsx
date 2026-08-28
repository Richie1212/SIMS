import { Plus } from "lucide-react";
import AppShell from "@/components/AppShell";
import ProductsTable from "@/components/ProductsTable";
import { products } from "@/lib/inventory-data";

export default function ProductsPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl px-6 py-8 flex flex-col gap-6">
        
        {/* Flat Minimal Header Section */}
        <header className="flex items-center justify-between border-b border-(--color-border) pb-4">
          <div className="space-y-1">
            <h1 className="text-xl font-medium tracking-tight text-(--color-text-primary)">
              Inventory <span className="text-(--color-text-muted)">/ Products</span>
            </h1>
            <p className="text-xs text-(--color-text-muted)">Manage and track all your products.</p>
          </div>

          {/* Low-profile Keyboard-style Button */}
          <button className="flex items-center gap-1.5 rounded-md border border-(--color-border) bg-(--color-surface-raised) px-3 py-1.5 text-xs font-medium text-(--color-text-primary) shadow-sm hover:bg-(--color-surface-elevated) active:scale-[0.98] transition-all">
            <Plus size={14} />
            Add product
          </button>
        </header>

        {/* Content Area */}
        <div className="w-full">
          <ProductsTable products={products} />
        </div>

      </div>
    </AppShell>
  );
}
