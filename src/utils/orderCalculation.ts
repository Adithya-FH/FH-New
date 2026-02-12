import { CartItem, OrderSummary } from '../types/order.types';

const TAX_RATE = 0.09; // 9%
const DELIVERY_FEE = 30.00;

export const calculateOrderSummary = (
  cartItems: CartItem[],
  promoDiscount: number = 0
): OrderSummary => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + DELIVERY_FEE - promoDiscount;

  return {
    subtotal,
    tax,
    deliveryFee: DELIVERY_FEE,
    promoDiscount,
    total,
  };
};

export const formatCurrency = (amount: number): string => {
  return `₹${amount.toFixed(2)}`;
};