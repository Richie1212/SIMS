export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

export interface Product {
  id: string;
  category: string;
  name: string;
  sku: string;
  quantity: number;
  status: StockStatus;
  warehouse: string;
  priceUSD: number;
}
