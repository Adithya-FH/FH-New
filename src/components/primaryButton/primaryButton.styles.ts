import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { Typography } from '../../themes/typography';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    ...Typography.buttonText,
    color: Colors.white,
  },
});