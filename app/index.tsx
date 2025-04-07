import { Stack } from 'expo-router';
import { CalculatorScreen } from '../components/screen/CalculatorScreen';

export default function App() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Calculadora',
          headerShown: false,
        }}
      />
      <CalculatorScreen />
    </>
  );
} 