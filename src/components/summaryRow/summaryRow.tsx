import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { styles } from './summaryRow.styles';

interface SummaryRowProps {
  label: string;
  value: string;
  isTotal?: boolean;
}

const SummaryRow: React.FC<SummaryRowProps> = ({ label, value, isTotal = false }) => {
  return (
    <View style={styles.container}>
      <Text style={isTotal ? styles.totalLabel : styles.label}>{label}</Text>
      <Text style={isTotal ? styles.totalValue : styles.value}>{value}</Text>
    </View>
  );
};

export default memo(SummaryRow);