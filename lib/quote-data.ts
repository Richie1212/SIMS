import { Quote } from "./quote-types";

export const quotes: Quote[] = [
  {
    id: "1",
    quoteNumber: "QT-1001",
    customer: "Ridge Hospital",
    date: "12 Oct 2024",
    lines: [
      { productId: "1", name: "Paracetamol 500mg", priceUSD: 1.2, quantity: 500 },
      { productId: "4", name: "Ceftriaxone 1g", priceUSD: 18.0, quantity: 50 },
    ],
    status: "Sent",
  },
  {
    id: "2",
    quoteNumber: "QT-1002",
    customer: "Trust Pharmacy Ltd.",
    date: "18 Oct 2024",
    lines: [{ productId: "5", name: "Ibuprofen 200mg", priceUSD: 0.85, quantity: 1000 }],
    status: "Accepted",
  },
  {
    id: "3",
    quoteNumber: "QT-1003",
    customer: "Kumasi General",
    date: "02 Sep 2024",
    lines: [{ productId: "2", name: "Amoxicillin 500mg", priceUSD: 2.5, quantity: 300 }],
    status: "Expired",
  },
];