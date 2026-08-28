"use client";

import { useMemo, useState } from "react";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/lib/inventory-types";
import { categories } from "@/lib/inventory-data";
import StatusBadge from "./StatusBadge";

type SortKey = "category" | "name" | "quantity" | "priceUSD";

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "category", label: "Category" },
  { key: "name", label: "Product" },
  { key: "quantity", label: "Quantity" },
  { key: "priceUSD", label: "Price" },
];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 100];

export default function ProductsTable({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("category");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filtered = useMemo(() => {
    let rows = products;

    if (category !== "All") {
      rows = rows.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter(
        (p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }

    rows = [...rows].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const cmp = typeof aVal === "number" && typeof bVal === "number" ? aVal - bVal : String(aVal).localeCompare(String(bVal));
      return sortAsc ? cmp : -cmp;
    });

    return rows;
  }, [products, category, search, sortKey, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const rangeStart = filtered.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const rangeEnd = Math.min(currentPage * rowsPerPage, filtered.length);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortAsc((a) => !a);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface) px-4 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <Search size={18} className="shrink-0 text-(--color-text-faint)" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name, SKU, category..."
            aria-label="Search products"
            className="w-full bg-transparent text-base outline-none placeholder:text-(--color-text-muted) sm:text-sm"
          />
        </div>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          aria-label="Filter by category"
          className="rounded-xl border border-(--color-border) bg-(--color-surface) px-4 py-2.5 text-sm font-medium text-(--color-text-subtle) shadow-sm"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "Category" : c}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-surface) shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-(--color-border)">
                {COLUMNS.map(({ key, label }) => (
                  <th key={key} className="px-4 py-3">
                    <button
                      onClick={() => toggleSort(key)}
                      className="flex items-center gap-1 text-sm font-medium text-(--color-text-muted) hover:text-(--color-text-primary)"
                    >
                      {label}
                      <ArrowUpDown size={12} className={sortKey === key ? "text-(--color-brand)" : "text-(--color-text-faint)"} />
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3 text-sm font-medium text-(--color-text-muted)">In Hand</th>
                <th className="px-4 py-3 text-sm font-medium text-(--color-text-muted)">Warehouse</th>
                <th className="px-4 py-3 text-sm font-medium text-(--color-text-muted)">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-(--color-text-muted)">
                    No products match your search.
                  </td>
                </tr>
              ) : (
                pageRows.map((product) => (
                  <tr key={product.id} className="border-b border-(--color-border) last:border-0">
                    <td className="px-4 py-3.5 text-sm text-(--color-text-muted)">{product.category}</td>
                    <td className="px-4 py-3.5 text-sm font-medium text-(--color-text-primary)">{product.name}</td>
                    <td className="px-4 py-3.5 text-sm text-(--color-text-primary)">{product.quantity.toLocaleString()}</td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="px-4 py-3.5 text-sm text-(--color-text-muted)">{product.warehouse}</td>
                    <td className="px-4 py-3.5 text-sm font-semibold text-(--color-text-primary)">
                      ${product.priceUSD.toFixed(2)}
                    </td>
                    <td className="px-4 py-3.5">
                      <button className="text-sm font-semibold text-(--color-brand) hover:underline">Edit</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-(--color-border) px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs text-(--color-text-muted)">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="rounded-lg border border-(--color-border) px-2 py-1 text-xs text-(--color-text-primary)"
            >
              {ROWS_PER_PAGE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span>
              {rangeStart}-{rangeEnd} of {filtered.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 rounded-xl border border-(--color-border) px-3 py-2 text-xs font-medium text-(--color-text-faint) transition disabled:opacity-40 enabled:text-(--color-text-subtle) enabled:hover:bg-(--color-neutral-tint)"
            >
              <ChevronLeft size={14} />
              Previous
            </button>
            <span className="text-xs text-(--color-text-muted)">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 rounded-xl border border-(--color-border) px-3 py-2 text-xs font-medium text-(--color-text-faint) transition disabled:opacity-40 enabled:text-(--color-text-subtle) enabled:hover:bg-(--color-neutral-tint)"
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
