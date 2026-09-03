import { Product } from "./types";

export const seedProducts: Product[] = [
  { id: "1", category: "Tablets", name: "Paracetamol 500mg", sku: "TAB-500", quantity: 1240, status: "In Stock", warehouse: "Accra", priceUSD: 1.2 },
  { id: "2", category: "Capsules", name: "Amoxicillin 500mg", sku: "CAP-500", quantity: 450, status: "Low Stock", warehouse: "Kumasi", priceUSD: 2.5 },
  { id: "3", category: "Syrups", name: "Vitamin C 100ml", sku: "SYR-100", quantity: 0, status: "Out of Stock", warehouse: "Tamale", priceUSD: 4.8 },
  { id: "4", category: "Injections", name: "Ceftriaxone 1g", sku: "INJ-1000", quantity: 1500, status: "In Stock", warehouse: "Accra", priceUSD: 18.0 },
  { id: "5", category: "Tablets", name: "Ibuprofen 200mg", sku: "TAB-200", quantity: 890, status: "In Stock", warehouse: "Takoradi", priceUSD: 0.85 },
  { id: "6", category: "Capsules", name: "Azithromycin 250mg", sku: "CAP-250", quantity: 120, status: "Low Stock", warehouse: "Accra", priceUSD: 3.2 },
  { id: "7", category: "Syrups", name: "Cough Syrup 200ml", sku: "SYR-200", quantity: 2100, status: "In Stock", warehouse: "Kumasi", priceUSD: 6.5 },
  { id: "8", category: "Injections", name: "Dexamethasone 4mg", sku: "INJ-004", quantity: 340, status: "In Stock", warehouse: "Accra", priceUSD: 12.0 },
];

export const categories = ["All", "Tablets", "Capsules", "Syrups", "Injections"];
export const suppliers = ["MedSupply Ghana", "PharmaCorp Ltd.", "Accra Wholesale Meds"];
export const warehouses = ["Accra", "Kumasi", "Tamale", "Takoradi"];