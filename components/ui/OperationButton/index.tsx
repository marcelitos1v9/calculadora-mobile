import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

interface OperationButtonProps {
  label: string;
  onPress: () => void;
  color: string;
}

export const OperationButton: React.FC<OperationButtonProps> = ({
  label,
  onPress,
  color,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}; 