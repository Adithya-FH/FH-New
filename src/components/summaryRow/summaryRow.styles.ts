import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { Typography } from '../../themes/typography';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    ...Typography.label,
    color: Colors.textSecondary,
  },
  value: {
    ...Typography.value,
    color: Colors.textPrimary,
  },
  totalLabel: {
    ...Typography.total,
    color: Colors.textPrimary,
  },
  totalValue: {
    ...Typography.total,
    color: Colors.textPrimary,
  },
});