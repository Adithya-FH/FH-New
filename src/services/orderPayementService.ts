import {
  CreateOrderRequest,
  CreateOrderResponse,
  CreatePaymentRequest,
  CreatePaymentResponse,
  UpdateOrderStatusRequest,
} from '../types/api.types';

// ⭐ IMPORTANT: Replace with your backend URL
const API_BASE_URL = 'http://10.15.8.165:3000/api';  // Change to your IP address

export class OrderPaymentService {
  /**
   * Create a new order
   * POST /api/orders
   */
  static async createOrder(orderData: CreateOrderRequest): Promise<CreateOrderResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create order');
      }

      const result: CreateOrderResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  /**
   * Create a payment record
   * POST /api/payments
   */
  static async createPayment(paymentData: CreatePaymentRequest): Promise<CreatePaymentResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create payment');
      }

      const result: CreatePaymentResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }

  /**
   * Update order status
   * PUT /api/orders/:orderId
   */
  static async updateOrderStatus(
    orderId: string,
    statusData: UpdateOrderStatusRequest
  ): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(statusData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update order status');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  /**
   * Get order by ID
   * GET /api/orders/:orderId
   */
  static async getOrderById(orderId: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch order');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }
}