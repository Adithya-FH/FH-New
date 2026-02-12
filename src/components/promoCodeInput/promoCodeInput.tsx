import React, { memo, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { updatePromoCode, applyPromoCode } from '../../store/orderSlice';
import { styles } from './promoCodeInput.styles';

const PromoCodeInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const promoCode = useAppSelector((state) => state.order.promoCode);

  const handlePromoCodeChange = useCallback((text: string) => {
    dispatch(updatePromoCode(text));
  }, [dispatch]);

  const handleApplyPromo = useCallback(() => {
    dispatch(applyPromoCode());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Promo Code"
        placeholderTextColor="#999"
        value={promoCode.code}
        onChangeText={handlePromoCodeChange}
        autoCapitalize="characters"
      />
      <TouchableOpacity 
        style={styles.applyButton}
        onPress={handleApplyPromo}
        activeOpacity={0.7}
      >
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(PromoCodeInput);