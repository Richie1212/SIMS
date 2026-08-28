export type ExpiryStatus = "Valid" | "Expiring Soon" | "Expired";

export interface ExpiryItem {
  id: string;
  productName: string;
  sku: string;
  category: string;
  expiryDate: string; // "DD MMM YYYY"
  daysLeft: number; // negative if already expired
  status: ExpiryStatus;
}