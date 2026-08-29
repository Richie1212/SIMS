import { TopProduct } from "./report-types";

export function exportTopProductsCSV(products: TopProduct[], range: string) {
  const header = "product,category,units_sold,revenue_usd";
  const rows = products.map((p) => `${p.name},${p.category},${p.unitsSold},${p.revenueUSD}`);
  const csv = [header, ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `top-products-${range.toLowerCase()}-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}