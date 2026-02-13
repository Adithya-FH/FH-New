import { Coupon } from './coupon.types';

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
  isLoading?: boolean;
  error?: string;
  appliedCoupon?: Coupon;
  discountAmount?: number;
}