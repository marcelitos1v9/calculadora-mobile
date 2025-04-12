import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

interface HistoryItemProps {
  firstNumber: string;
  secondNumber: string;
  operation: string;
  result: string;
  color: string;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({
  firstNumber,
  secondNumber,
  operation,
  result,
  color,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.operation, { backgroundColor: color }]}>
        <Text style={styles.operationText}>{operation}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.calculation}>
          {firstNumber} {operation} {secondNumber}
        </Text>
        <Text style={styles.result}>{result}</Text>
      </View>
    </View>
  );
}; 