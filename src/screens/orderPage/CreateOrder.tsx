import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector } from '../../hooks/reduxHooks';
import { calculateOrderSummary, formatCurrency } from '../../utils/orderCalculation';
import CartItem from '../../components/cartItem/cartItem';
import PromoCodeInput from '../../components/promoCodeInput/promoCodeInput';
import SummaryRow from '../../components/summaryRow/summaryRow';
import PrimaryButton from '../../components/primaryButton/primaryButton';
import { styles } from './CreateOrder.styles';


export default function CreateOrderScreen() {
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.order.cartItems);
  const promoCode = useAppSelector((state) => state.order.promoCode);

  const orderSummary = useMemo(() => {
    return calculateOrderSummary(cartItems, 0); // Will add promo discount later
  }, [cartItems]);

  const handlePlaceOrder = useCallback(() => {
    // Navigation to payment screen will be added later
    console.log('Place Order pressed');
    // router.push('/make-payment');
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create Order</Text>

          </View>
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Cart Items Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cart Items</Text>
            <View style={styles.cartItemsContainer}>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </View>
          </View>

          {/* Promo Code Section */}
          <View style={styles.section}>
            <PromoCodeInput />
          </View>

          {/* Order Summary Section */}
          <View style={styles.section}>
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
            
            <View style={styles.divider} />
            
            <SummaryRow 
              label="Total:" 
              value={formatCurrency(orderSummary.total)} 
              isTotal 
            />
          </View>

          {/* Duplicate Summary for visual match */}
          <View style={styles.section}>
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
          </View>
        </ScrollView>

        {/* Place Order Button */}
        <View style={styles.footer}>
          <PrimaryButton 
            title="Place Order" 
            onPress={handlePlaceOrder}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}