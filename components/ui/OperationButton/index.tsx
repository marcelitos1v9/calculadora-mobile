import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface OperationButtonProps {
  label: string;
  onPress: () => void;
  color?: string;
}

export const OperationButton: React.FC<OperationButtonProps> = ({
  label,
  onPress,
  color = '#007AFF',
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: color }]} 
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 