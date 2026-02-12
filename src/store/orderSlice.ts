
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, PromoCode } from '../types/order.types';

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
  },
  restaurantId: 101,
  userId: 1100,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updatePromoCode: (state, action: PayloadAction<string>) => {
      state.promoCode.code = action.payload;
    },
    applyPromoCode: (state) => {
      // Logic to apply promo code will be added when integrating with coupon manager
      if (state.promoCode.code.trim()) {
        state.promoCode.isApplied = true;
      }
    },
    removePromoCode: (state) => {
      state.promoCode = { code: '', isApplied: false };
    },
  },
});

export const { updatePromoCode, applyPromoCode, removePromoCode } = orderSlice.actions;
export default orderSlice.reducer;
