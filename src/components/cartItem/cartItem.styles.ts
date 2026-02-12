import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { Typography } from '../../themes/typography';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  detailsContainer: {
    flex: 1,
  },
  itemName: {
    ...Typography.itemName,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  quantity: {
    ...Typography.value,
    color: Colors.textSecondary,
  },
  price: {
    ...Typography.price,
    color: Colors.textPrimary,
  },
});