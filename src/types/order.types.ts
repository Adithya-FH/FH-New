export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderSummary {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  promoDiscount: number;
  total: number;
}

export interface PromoCode {
  code: string;
  isApplied: boolean;
}