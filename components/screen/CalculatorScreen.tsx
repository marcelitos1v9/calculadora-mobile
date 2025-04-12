import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { CalculatorInput } from '../ui/CalculatorInput';
import { OperationButton } from '../ui/OperationButton';
import { HistoryItem } from '../ui/HistoryItem';
import { COLORS, SIZES } from '../../constants/theme';
import { calculateOperation, validateInput } from '../../services/calculator.service';

interface Calculation {
  firstNumber: string;
  secondNumber: string;
  operation: string;
  result: string;
}

const OPERATION_COLORS = {
  '+': COLORS.operations.add,
  '-': COLORS.operations.subtract,
  '×': COLORS.operations.multiply,
  '÷': COLORS.operations.divide,
};

export const CalculatorScreen = () => {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [result, setResult] = useState('');
  const [currentOperation, setCurrentOperation] = useState<string | null>(null);
  const [history, setHistory] = useState<Calculation[]>([]);
  const [error, setError] = useState<string>('');

  const clearAll = () => {
    setFirstNumber('');
    setSecondNumber('');
    setResult('');
    setCurrentOperation(null);
    setError('');
  };

  const handleInputChange = (value: string, setter: (value: string) => void) => {
    if (value === '' || validateInput(value)) {
      setter(value);
      setError('');
    }
  };

  const handleCalculation = (operation: string) => {
    try {
      if (!firstNumber || !secondNumber) {
        throw new Error('Por favor, preencha ambos os números');
      }

      const num1 = parseFloat(firstNumber);
      const num2 = parseFloat(secondNumber);

      if (isNaN(num1) || isNaN(num2)) {
        throw new Error('Por favor, insira números válidos');
      }

      const calculationResult = calculateOperation(operation, num1, num2);

      if (calculationResult.error) {
        setError(calculationResult.error);
        return;
      }

      setResult(calculationResult.result);
      setCurrentOperation(operation);
      setError('');

      const newCalculation: Calculation = {
        firstNumber,
        secondNumber,
        operation,
        result: calculationResult.result,
      };

      setHistory(prev => [newCalculation, ...prev].slice(0, SIZES.maxHistoryItems));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao calcular');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background.card} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Calculadora do Marcelo</Text>
            <TouchableOpacity 
              onPress={clearAll} 
              style={styles.clearButton}
              activeOpacity={0.7}
            >
              <Text style={styles.clearButtonText}>Limpar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <View style={styles.inputsContainer}>
              <CalculatorInput
                label="Primeiro Número"
                value={firstNumber}
                onChangeText={(value) => handleInputChange(value, setFirstNumber)}
              />
              
              <CalculatorInput
                label="Segundo Número"
                value={secondNumber}
                onChangeText={(value) => handleInputChange(value, setSecondNumber)}
              />
            </View>

            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}

            <View style={styles.operationsContainer}>
              <OperationButton 
                label="+" 
                onPress={() => handleCalculation('+')} 
                color={OPERATION_COLORS['+']}
              />
              <OperationButton 
                label="-" 
                onPress={() => handleCalculation('-')} 
                color={OPERATION_COLORS['-']}
              />
              <OperationButton 
                label="×" 
                onPress={() => handleCalculation('×')} 
                color={OPERATION_COLORS['×']}
              />
              <OperationButton 
                label="÷" 
                onPress={() => handleCalculation('÷')} 
                color={OPERATION_COLORS['÷']}
              />
            </View>

            <View style={styles.resultContainer}>
              <Text style={styles.resultLabel}>Resultado</Text>
              <Text style={[
                styles.resultText,
                currentOperation && { color: OPERATION_COLORS[currentOperation as keyof typeof OPERATION_COLORS] }
              ]}>
                {result || '0'}
              </Text>
              {currentOperation && (
                <Text style={styles.operationText}>
                  Operação: {currentOperation}
                </Text>
              )}
            </View>
          </View>

          {history.length > 0 && (
            <View style={styles.historyCard}>
              <Text style={styles.historyTitle}>Histórico</Text>
              {history.map((calc, index) => (
                <HistoryItem
                  key={index}
                  firstNumber={calc.firstNumber}
                  secondNumber={calc.secondNumber}
                  operation={calc.operation}
                  result={calc.result}
                  color={OPERATION_COLORS[calc.operation as keyof typeof OPERATION_COLORS]}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  clearButton: {
    padding: 10,
    backgroundColor: COLORS.button.clear,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  clearButtonText: {
    color: COLORS.background.card,
    fontWeight: 'bold',
    fontSize: 14,
  },
  errorText: {
    color: COLORS.button.clear,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    backgroundColor: COLORS.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  inputsContainer: {
    marginBottom: 24,
  },
  operationsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    gap: 12,
  },
  resultContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: COLORS.background.primary,
    borderRadius: 12,
  },
  resultLabel: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  resultText: {
    fontSize: 32,
    color: COLORS.text.primary,
    fontWeight: 'bold',
  },
  operationText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginTop: 8,
    fontStyle: 'italic',
  },
  historyCard: {
    backgroundColor: COLORS.background.card,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
}); 