export type QuoteStatus = "Draft" | "Sent" | "Accepted" | "Expired";

export interface QuoteLine {
  productId: string;
  name: string;
  priceUSD: number;
  quantity: number;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  customer: string;
  date: string;
  lines: QuoteLine[];
  status: QuoteStatus;
}