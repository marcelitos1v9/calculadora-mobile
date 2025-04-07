import React from 'react';
import { TextInput, StyleSheet, View, Text, Animated } from 'react-native';

interface CalculatorInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const CalculatorInput: React.FC<CalculatorInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = 'Digite um número',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType="numeric"
          placeholderTextColor="#999"
          selectionColor="#007AFF"
        />
        <View style={styles.underline} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    height: 50,
    fontSize: 18,
    color: '#333',
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#E0E0E0',
  },
}); 