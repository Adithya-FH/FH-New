import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    fontSize: 14,
    color: '#212121',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputDisabled: {
    backgroundColor: '#F0F0F0',
    color: '#757575',
  },
  applyButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 70,
    alignItems: 'center',
  },
  applyButtonDisabled: {
    opacity: 0.5,
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#D32F2F',
  },
  removeButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  removeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF5252',
  },
  errorText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#FF5252',
    marginTop: 4,
  },
  successContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#E8F5E9',
    borderRadius: 6,
  },
  successText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#2E7D32',
  },
});