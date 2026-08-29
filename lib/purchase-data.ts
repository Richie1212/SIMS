import { PurchaseOrder } from "./purchase-types";

export const purchaseOrders: PurchaseOrder[] = [
  {
    id: "1",
    poNumber: "PO-2001",
    supplier: "MedSupply Ghana",
    orderDate: "01 Oct 2024",
    expectedDate: "10 Oct 2024",
    lines: [
      { productId: "1", name: "Paracetamol 500mg", costUSD: 0.7, quantity: 2000 },
      { productId: "5", name: "Ibuprofen 200mg", costUSD: 0.5, quantity: 1000 },
    ],
    status: "Received",
  },
  {
    id: "2",
    poNumber: "PO-2002",
    supplier: "PharmaCorp Ltd.",
    orderDate: "14 Oct 2024",
    expectedDate: "25 Oct 2024",
    lines: [{ productId: "4", name: "Ceftriaxone 1g", costUSD: 12.0, quantity: 300 }],
    status: "Ordered",
  },
  {
    id: "3",
    poNumber: "PO-2003",
    supplier: "Accra Wholesale Meds",
    orderDate: "20 Oct 2024",
    expectedDate: "05 Nov 2024",
    lines: [{ productId: "2", name: "Amoxicillin 500mg", costUSD: 1.6, quantity: 800 }],
    status: "Pending",
  },
];