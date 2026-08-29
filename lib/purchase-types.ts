export type PurchaseOrderStatus = "Pending" | "Ordered" | "Received" | "Cancelled";

export interface PurchaseOrderLine {
  productId: string;
  name: string;
  costUSD: number;
  quantity: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: string;
  orderDate: string;
  expectedDate: string;
  lines: PurchaseOrderLine[];
  status: PurchaseOrderStatus;
}