import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { Typography } from '../../themes/typography';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  applyButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  applyButtonText: {
    ...Typography.label,
    color: Colors.primary,
  },
});