import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { CalculatorInput } from '../ui/CalculatorInput';
import { OperationButton } from '../ui/OperationButton';
import { HistoryItem } from '../ui/HistoryItem';

const OPERATION_COLORS = {
  '+': '#4CAF50', // Verde
  '-': '#FF5722', // Laranja
  '×': '#2196F3', // Azul
  '÷': '#9C27B0', // Roxo
};

interface Calculation {
  firstNumber: string;
  secondNumber: string;
  operation: string;
  result: string;
}

export const CalculatorScreen = () => {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [result, setResult] = useState('');
  const [currentOperation, setCurrentOperation] = useState<string | null>(null);
  const [history, setHistory] = useState<Calculation[]>([]);

  const clearAll = () => {
    setFirstNumber('');
    setSecondNumber('');
    setResult('');
    setCurrentOperation(null);
  };

  const calculate = (operation: string) => {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    if (isNaN(num1) || isNaN(num2)) {
      setResult('Por favor, insira números válidos');
      setCurrentOperation(null);
      return;
    }

    let calculatedResult: number;
    switch (operation) {
      case '+':
        calculatedResult = num1 + num2;
        break;
      case '-':
        calculatedResult = num1 - num2;
        break;
      case '×':
        calculatedResult = num1 * num2;
        break;
      case '÷':
        if (num2 === 0) {
          setResult('Não é possível dividir por zero');
          setCurrentOperation(null);
          return;
        }
        calculatedResult = num1 / num2;
        break;
      default:
        return;
    }

    const resultString = calculatedResult.toString();
    setResult(resultString);
    setCurrentOperation(operation);

    setHistory(prev => [{
      firstNumber,
      secondNumber,
      operation,
      result: resultString,
    }, ...prev].slice(0, 5));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
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
                onChangeText={setFirstNumber}
              />
              
              <CalculatorInput
                label="Segundo Número"
                value={secondNumber}
                onChangeText={setSecondNumber}
              />
            </View>

            <View style={styles.operationsContainer}>
              <OperationButton 
                label="+" 
                onPress={() => calculate('+')} 
                color={OPERATION_COLORS['+']}
              />
              <OperationButton 
                label="-" 
                onPress={() => calculate('-')} 
                color={OPERATION_COLORS['-']}
              />
              <OperationButton 
                label="×" 
                onPress={() => calculate('×')} 
                color={OPERATION_COLORS['×']}
              />
              <OperationButton 
                label="÷" 
                onPress={() => calculate('÷')} 
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
    backgroundColor: '#F8F9FA',
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
    color: '#1A1A1A',
  },
  clearButton: {
    padding: 10,
    backgroundColor: '#FF3B30',
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
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  resultLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  resultText: {
    fontSize: 32,
    color: '#1A1A1A',
    fontWeight: 'bold',
  },
  operationText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
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
    color: '#1A1A1A',
    marginBottom: 16,
  },
}); 