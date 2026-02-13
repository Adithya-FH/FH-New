export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  discountAmount: number;
  isActive: boolean;
  expiryDate: string;
  maxUses: number;
  currentUses: number;
  restaurantId: number;
}

export interface CouponValidationResult {
  isValid: boolean;
  coupon?: Coupon;
  discountAmount?: number;
  error?: string;
}
