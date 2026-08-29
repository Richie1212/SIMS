export interface CartLine {
  productId: string;
  name: string;
  priceUSD: number;
  quantity: number;
}

export type PaymentMethod = "Cash" | "Card" | "Mobile Money";