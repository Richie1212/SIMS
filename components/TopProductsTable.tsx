import { TopProduct } from "@/lib/report-types";

export default function TopProductsTable({ products }: { products: TopProduct[] }) {
  const sorted = [...products].sort((a, b) => b.revenueUSD - a.revenueUSD);

  return (
    <div className="overflow-hidden rounded-lg border border-(--color-border) bg-(--color-surface)">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-(--color-border) text-xs font-medium text-(--color-text-muted)">
            <th className="px-4 py-2.5">Product</th>
            <th className="px-4 py-2.5">Category</th>
            <th className="px-4 py-2.5">Units Sold</th>
            <th className="px-4 py-2.5">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((product) => (
            <tr key={product.name} className="border-b border-(--color-border) last:border-0">
              <td className="px-4 py-3 text-sm font-medium text-(--color-text-primary)">{product.name}</td>
              <td className="px-4 py-3 text-sm text-(--color-text-muted)">{product.category}</td>
              <td className="px-4 py-3 text-sm text-(--color-text-secondary)">{product.unitsSold.toLocaleString()}</td>
              <td className="px-4 py-3 text-sm font-semibold text-(--color-text-primary)">${product.revenueUSD.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}