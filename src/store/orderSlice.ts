import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, PromoCode } from '../types/order.types';
import { CouponService } from '../services/couponService';

interface OrderState {
  cartItems: CartItem[];
  promoCode: PromoCode;
  restaurantId: number;
  userId: number;
}

const initialState: OrderState = {
  cartItems: [
    {
      id: '1',
      name: 'Margherita Pizza',
      price: 250.00,
      quantity: 1,
    },
    {
      id: '2',
      name: 'Garlic Breadsticks',
      price: 200.00,
      quantity: 1,
    },
  ],
  promoCode: {
    code: '',
    isApplied: false,
    isLoading: false,
    error: undefined,
    appliedCoupon: undefined,
    discountAmount: 0,
  },
  restaurantId: 101,
  userId: 1100,
};

export const applyPromoCodeAsync = createAsyncThunk(
  'order/applyPromoCode',
  async (payload: { code: string; subtotal: number; restaurantId: number }, { rejectWithValue }) => {
    try {
      const result = await CouponService.validateAndApplyCoupon(
        payload.code,
        payload.subtotal,
        payload.restaurantId
      );

      if (!result.isValid) {
        return rejectWithValue(result.error || 'Invalid coupon');
      }

      return {
        coupon: result.coupon!,
        discountAmount: result.discountAmount!,
      };
    } catch (error) {
      return rejectWithValue('Error fetching coupon');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updatePromoCode: (state, action: PayloadAction<string>) => {
      state.promoCode.code = action.payload;
      state.promoCode.error = undefined;
    },
    removePromoCode: (state) => {
      state.promoCode = {
        code: '',
        isApplied: false,
        isLoading: false,
        error: undefined,
        appliedCoupon: undefined,
        discountAmount: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyPromoCodeAsync.pending, (state) => {
        state.promoCode.isLoading = true;
        state.promoCode.error = undefined;
      })
      .addCase(applyPromoCodeAsync.fulfilled, (state, action) => {
        state.promoCode.isLoading = false;
        state.promoCode.isApplied = true;
        state.promoCode.appliedCoupon = action.payload.coupon;
        state.promoCode.discountAmount = action.payload.discountAmount;
        state.promoCode.error = undefined;
      })
      .addCase(applyPromoCodeAsync.rejected, (state, action) => {
        state.promoCode.isLoading = false;
        state.promoCode.isApplied = false;
        state.promoCode.error = action.payload as string;
        state.promoCode.appliedCoupon = undefined;
        state.promoCode.discountAmount = 0;
      });
  },
});

export const { updatePromoCode, removePromoCode } = orderSlice.actions;
export default orderSlice.reducer;