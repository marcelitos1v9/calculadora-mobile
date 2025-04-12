import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.background.primary,
    borderRadius: 8,
    marginBottom: 8,
  },
  operation: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  operationText: {
    color: COLORS.background.card,
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  calculation: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  result: {
    fontSize: 16,
    color: COLORS.text.primary,
    fontWeight: 'bold',
  },
}); 