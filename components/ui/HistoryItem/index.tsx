import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
      <Text style={styles.expression}>
        <Text style={styles.number}>{firstNumber}</Text>
        <Text style={[styles.operator, { color }]}>{` ${operation} `}</Text>
        <Text style={styles.number}>{secondNumber}</Text>
        <Text style={styles.equals}> = </Text>
        <Text style={[styles.result, { color }]}>{result}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  expression: {
    fontSize: 16,
    color: '#333',
  },
  number: {
    fontWeight: '500',
  },
  operator: {
    fontWeight: 'bold',
  },
  equals: {
    color: '#666',
  },
  result: {
    fontWeight: 'bold',
  },
}); 