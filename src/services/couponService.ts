import { Coupon, CouponValidationResult } from '../types/coupon.types';

const API_BASE_URL = 'http://10.15.8.165:3000/api';

export class CouponService {
 
  static async getCouponByCode(code: string): Promise<Coupon | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/coupons/by-code/${code}`);
      
      if (!response.ok) {
        return null;
      }

      const coupon: Coupon = await response.json();
      return coupon;
    } catch (error) {
      console.error('Error fetching coupon:', error);
      return null;
    }
  }

  static async validateAndApplyCoupon(
    code: string,
    subtotal: number,
    restaurantId: number = 101
  ): Promise<CouponValidationResult> {
    if (!code.trim()) {
      return {
        isValid: false,
        error: 'Please enter coupon code',
      };
    }

    const coupon = await this.getCouponByCode(code);

    if (!coupon) {
      return {
        isValid: false,
        error: 'Invalid coupon',
      };
    }

    if (!coupon.isActive) {
      return {
        isValid: false,
        error: 'This coupon is no longer active',
      };
    }

    const expiryDate = new Date(coupon.expiryDate);
    if (expiryDate < new Date()) {
      return {
        isValid: false,
        error: 'This coupon has expired',
      };
    }

    if (coupon.maxUses > 0 && coupon.currentUses >= coupon.maxUses) {
      return {
        isValid: false,
        error: 'This coupon has reached its usage limit',
      };
    }

    if (coupon.restaurantId !=restaurantId) {
      return {
        isValid: false,
        error: 'This coupon is not valid for this restaurant',
      };
    }

    const discountAmount =
      coupon.type === 'percentage'
        ? (subtotal * coupon.discountAmount) / 100
        : coupon.discountAmount;

    const finalDiscount = Math.min(discountAmount, subtotal);

    return {
      isValid: true,
      coupon,
      discountAmount: finalDiscount,
    };
  }


  static async incrementCouponUsage(couponId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/coupons/${couponId}/use`, {
        method: 'POST',
      });

      return response.ok;
    } catch (error) {
      console.error('Error incrementing coupon usage:', error);
      return false;
    }
  }
}