import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity ,Alert} from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector } from '../../hooks/reduxHooks';
import { calculateOrderSummary, formatCurrency } from '../../utils/orderCalculation';
import SummaryRow from '../../components/summaryRow/summaryRow';
import PrimaryButton from '../../components/primaryButton/primaryButton';
import { styles } from './makePayement.styles';
import { OrderPaymentService } from '../../services/orderPayementService';
import { CouponService } from '../../services/couponService';
import { CreateOrderRequest, CreatePaymentRequest } from '../../types/api.types';


export default function MakePaymentScreen() {
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.order.cartItems);
  const promoCode = useAppSelector((state) => state.order.promoCode);
  const restaurantId = useAppSelector((state) => state.order.restaurantId);
  const userId = useAppSelector((state) => state.order.userId);
  
  const [selectedPayment, setSelectedPayment] = useState<'cash'>('cash');
  const [loading, setLoading] = useState(false);

  const orderSummary = useMemo(() => {
    const discount = promoCode.isApplied ? (promoCode.discountAmount || 0) : 0;
    return calculateOrderSummary(cartItems, discount);
  }, [cartItems, promoCode.isApplied, promoCode.discountAmount]);

  const handlePayment = useCallback(async () => {
    setLoading(true);

    try {
      // Step 1: Create Order
      const orderData: CreateOrderRequest = {
        userId: userId.toString(),
        restaurantId: restaurantId.toString(),
        deliveryType: 'delivery',
        subtotal: orderSummary.subtotal,
        tax: orderSummary.tax,
        deliveryFee: orderSummary.deliveryFee,
        promoDiscount: orderSummary.promoDiscount,
        total: orderSummary.total,
        couponCode: promoCode.appliedCoupon?.code,
        status: 'pending',
        items: cartItems.map(item => ({
          itemName: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      console.log('Creating order:', orderData);
      const orderResponse = await OrderPaymentService.createOrder(orderData);

      if (!orderResponse.success) {
        throw new Error('Failed to create order');
      }

      const createdOrderId = orderResponse.data.orderId;
      console.log('Order created:', createdOrderId);

      // Step 2: Create Payment Record
      const paymentData: CreatePaymentRequest = {
        orderId: createdOrderId,
        amount: orderSummary.total,
        subtotal: orderSummary.subtotal,
        tax: orderSummary.tax,
        discount: orderSummary.promoDiscount,
        couponCode: promoCode.appliedCoupon?.code,
        method: selectedPayment,
        status: 'pending',
      };

      console.log('Creating payment:', paymentData);
      const paymentResponse = await OrderPaymentService.createPayment(paymentData);

      if (!paymentResponse.success) {
        throw new Error('Failed to create payment');
      }

      console.log('Payment created:', paymentResponse.data.id);

      // Step 3: Update Order Status to Confirmed
      await OrderPaymentService.updateOrderStatus(createdOrderId, {
        status: 'confirmed',
      });

      console.log('Order status updated to confirmed');

      // Step 4: Increment Coupon Usage (if coupon was applied)
      if (promoCode.appliedCoupon) {
        try {
          await CouponService.incrementCouponUsage(promoCode.appliedCoupon.id);
          console.log('Coupon usage incremented');
        } catch (error) {
          // Don't fail the order if coupon increment fails
          console.error('Failed to increment coupon usage:', error);
        }
      }

      // Step 5: Navigate to Order Status Screen
      router.push({
        pathname: '/order-status',
        params: {
          orderId: createdOrderId,
          orderNumber: createdOrderId.slice(-4).toUpperCase(),
          total: orderSummary.total.toString(),
          deliveryAddress: '123 Main Street',
        },
      });

    } catch (error) {
      console.error('Payment error:', error);
      Alert.alert(
        'Payment Failed',
        error instanceof Error ? error.message : 'An error occurred. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  }, [selectedPayment, orderSummary, cartItems, promoCode, restaurantId, userId, router]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Make Payment</Text>
          <View style={{ width: 50 }} />
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Order Summary Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            <View style={styles.summaryContainer}>
              <SummaryRow 
                label="Total Amount" 
                value={formatCurrency(orderSummary.total)} 
              />
              <SummaryRow 
                label="Subtotal:" 
                value={formatCurrency(orderSummary.subtotal)} 
              />
              <SummaryRow 
                label="Tax:" 
                value={formatCurrency(orderSummary.tax)} 
              />
              <SummaryRow 
                label="Delivery Fee:" 
                value={formatCurrency(orderSummary.deliveryFee)} 
              />
              
              {promoCode.isApplied && orderSummary.promoDiscount > 0 && (
                <SummaryRow 
                  label="Promo Discount:" 
                  value={`-${formatCurrency(orderSummary.promoDiscount)}`} 
                />
              )}

              <View style={styles.divider} />

              <SummaryRow 
                label="Total:" 
                value={formatCurrency(orderSummary.total)} 
                isTotal 
              />
            </View>
          </View>

          {/* Payment Method Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            
            {/* Cash Payment Option */}
            <TouchableOpacity 
              style={[
                styles.paymentOption,
                selectedPayment === 'cash' && styles.paymentOptionSelected
              ]}
              onPress={() => setSelectedPayment('cash')}
              activeOpacity={0.7}
            >
              <View style={styles.radioOuter}>
                {selectedPayment === 'cash' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.paymentMethodText}>Cash</Text>
            </TouchableOpacity>

            {/* Payment instruction */}
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>
                Please keep exact change ready. Payment to be made on delivery.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Pay Button */}
        <View style={styles.footer}>
          <PrimaryButton 
            title={`Pay ${formatCurrency(orderSummary.total)}`}
            onPress={handlePayment}
            loading={loading}
            disabled={loading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}