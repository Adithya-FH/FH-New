import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { CartItem as CartItemType } from '../../types/order.types';
import { formatCurrency } from '../../utils/orderCalculation';
import { styles } from './cartItem.styles';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.quantity}>x {item.quantity}</Text>
      </View>
      <Text style={styles.price}>{formatCurrency(item.price)}</Text>
    </View>
  );
};

export default memo(CartItem);