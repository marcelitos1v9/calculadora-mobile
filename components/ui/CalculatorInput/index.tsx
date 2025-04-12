import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { styles } from './styles';
import { COLORS } from '../../../constants/theme';

interface CalculatorInputProps extends TextInputProps {
  label: string;
}

export const CalculatorInput: React.FC<CalculatorInputProps> = ({
  label,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholderTextColor={COLORS.text.secondary}
        {...props}
      />
    </View>
  );
}; 