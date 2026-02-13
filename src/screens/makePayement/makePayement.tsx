import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector } from '../../hooks/reduxHooks';
import { calculateOrderSummary, formatCurrency } from '../../utils/orderCalculation';
import SummaryRow from '../../components/summaryRow/summaryRow';
import PrimaryButton from '../../components/primaryButton/primaryButton';
import { styles } from './makePayement.styles';

export default function MakePaymentScreen() {
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.order.cartItems);
  const promoCode = useAppSelector((state) => state.order.promoCode);
  const [selectedPayment, setSelectedPayment] = useState<'cash'>('cash');

  const orderSummary = useMemo(() => {
    const discount = promoCode.isApplied ? (promoCode.discountAmount || 0) : 0;
    return calculateOrderSummary(cartItems, discount);
  }, [cartItems, promoCode.isApplied, promoCode.discountAmount]);

  const handlePayment = useCallback(() => {
    // Navigate to order status screen
    console.log('Payment confirmed with:', selectedPayment);
    router.push('/order-status');
  }, [selectedPayment, router]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Make Payment</Text>
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
     
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

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
       
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

            
          </View>
        </ScrollView>

        {/* Pay Button */}
        <View style={styles.footer}>
          <PrimaryButton 
            title={`Pay ${formatCurrency(orderSummary.total)}`}
            onPress={handlePayment}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}