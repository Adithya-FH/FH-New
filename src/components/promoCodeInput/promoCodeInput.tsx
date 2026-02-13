import React, { memo, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { updatePromoCode, applyPromoCodeAsync, removePromoCode } from '../../store/orderSlice';
import { calculateOrderSummary } from '../../utils/orderCalculation';
import { styles } from './promoCodeInput.styles';

const PromoCodeInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const promoCode = useAppSelector((state) => state.order.promoCode);
  const cartItems = useAppSelector((state) => state.order.cartItems);
  const restaurantId = useAppSelector((state) => state.order.restaurantId);

  const handlePromoCodeChange = useCallback((text: string) => {
    dispatch(updatePromoCode(text.toUpperCase()));
  }, [dispatch]);

  const handleApplyPromo = useCallback(async () => {
    if (!promoCode.code.trim()) {
      Alert.alert('Error', 'Please enter a coupon code');
      return;
    }

    const orderSummary = calculateOrderSummary(cartItems, 0);

    try {
      const result = await dispatch(applyPromoCodeAsync({
        code: promoCode.code,
        subtotal: orderSummary.subtotal,
        restaurantId,
      })).unwrap();

      Alert.alert('Success', `Coupon applied! You saved ₹${result.discountAmount.toFixed(2)}`);
    } catch (error) {
      Alert.alert('Error', error as string);
    }
  }, [dispatch, promoCode.code, cartItems, restaurantId]);

  const handleRemovePromo = useCallback(() => {
    dispatch(removePromoCode());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, promoCode.isApplied && styles.inputDisabled]}
          placeholder="Promo Code"
          placeholderTextColor="#999"
          value={promoCode.code}
          onChangeText={handlePromoCodeChange}
          autoCapitalize="characters"
          editable={!promoCode.isApplied && !promoCode.isLoading}
        />
        {promoCode.isApplied ? (
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={handleRemovePromo}
            activeOpacity={0.7}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.applyButton, promoCode.isLoading && styles.applyButtonDisabled]}
            onPress={handleApplyPromo}
            activeOpacity={0.7}
            disabled={promoCode.isLoading}
          >
            {promoCode.isLoading ? (
              <ActivityIndicator size="small" color="#D32F2F" />
            ) : (
              <Text style={styles.applyButtonText}>Apply</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
      
      {promoCode.error && (
        <Text style={styles.errorText}>{promoCode.error}</Text>
      )}
      
      {promoCode.isApplied && promoCode.appliedCoupon && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>
            ✓ Coupon applied: {promoCode.appliedCoupon.type === 'percentage' 
              ? `${promoCode.appliedCoupon.discountAmount}% off` 
              : `₹${promoCode.appliedCoupon.discountAmount} off`}
          </Text>
        </View>
      )}
    </View>
  );
};

export default memo(PromoCodeInput);