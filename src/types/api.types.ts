// Order types based on backend API structure
export interface OrderItem {
  itemName: string;
  price: number;
  quantity: number;
}

export interface CreateOrderRequest {
  userId: string;
  restaurantId: string;
  deliveryType: 'delivery' | 'pickup';
  subtotal: number;
  tax: number;
  deliveryFee: number;
  promoDiscount: number;
  total: number;
  couponCode?: string;
  status: 'pending';
  items: OrderItem[];
}

export interface CreateOrderResponse {
  success: boolean;
  data: {
    id: string;
    orderId: string;
    userId: string;
    restaurantId: string;
    deliveryType: string;
    subtotal: number;
    tax: number;
    deliveryFee: number;
    promoDiscount: number;
    total: number;
    couponCode?: string;
    status: string;
    items: OrderItem[];
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}

// Payment types based on backend API structure
export interface CreatePaymentRequest {
  orderId: string;
  amount: number;
  subtotal: number;
  tax: number;
  discount: number;
  couponCode?: string;
  method: 'card' | 'cash';
  status: 'pending';
}

export interface CreatePaymentResponse {
  success: boolean;
  data: {
    id: string;
    orderId: string;
    amount: number;
    subtotal: number;
    tax: number;
    discount: number;
    couponCode?: string;
    method: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}

export interface UpdateOrderStatusRequest {
  status: 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
}