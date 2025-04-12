interface CalculationResult {
  result: string;
  error?: string;
}

export const calculateOperation = (
  operation: string,
  num1: number,
  num2: number
): CalculationResult => {
  try {
    let result: number;

    switch (operation) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '×':
        result = num1 * num2;
        break;
      case '÷':
        if (num2 === 0) {
          return { result: '', error: 'Não é possível dividir por zero' };
        }
        result = num1 / num2;
        break;
      default:
        return { result: '', error: 'Operação inválida' };
    }

    return { result: result.toString() };
  } catch (error) {
    return { result: '', error: 'Erro ao calcular operação' };
  }
};

export const validateInput = (value: string): boolean => {
  const numberRegex = /^-?\d*\.?\d*$/;
  return numberRegex.test(value);
}; 