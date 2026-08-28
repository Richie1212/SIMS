import { ExpiryItem } from "./expiry-types";

export const expiryItems: ExpiryItem[] = [
  { id: "1", productName: "Paracetamol 500mg", sku: "PAR-500-24", category: "Analgesics", expiryDate: "31 Oct 2024", daysLeft: 12, status: "Expiring Soon" },
  { id: "2", productName: "Ibuprofen 200mg", sku: "IBU-200-12", category: "Analgesics", expiryDate: "15 Nov 2024", daysLeft: 27, status: "Expiring Soon" },
  { id: "3", productName: "Amoxicillin 500mg", sku: "AMX-500-10", category: "Antibiotics", expiryDate: "05 Oct 2024", daysLeft: -7, status: "Expired" },
  { id: "4", productName: "Vitamin C 1000mg", sku: "VIT-C-1000", category: "Supplements", expiryDate: "20 Dec 2024", daysLeft: 72, status: "Valid" },
  { id: "5", productName: "Loratadine 10mg", sku: "LOR-10-24", category: "Antihistamines", expiryDate: "10 Nov 2024", daysLeft: 22, status: "Expiring Soon" },
  { id: "6", productName: "Metformin 500mg", sku: "MET-500-30", category: "Diabetes", expiryDate: "15 Jan 2025", daysLeft: 108, status: "Valid" },
  { id: "7", productName: "Atorvastatin 20mg", sku: "ATO-20-28", category: "Cholesterol", expiryDate: "28 Sep 2024", daysLeft: -14, status: "Expired" },
  { id: "8", productName: "Salbutamol Inhaler", sku: "SAL-100-12", category: "Respiratory", expiryDate: "12 Mar 2025", daysLeft: 144, status: "Valid" },
];