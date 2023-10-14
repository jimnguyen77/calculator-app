import { useCallback } from 'react';
import { BaseButtonProps } from './base-button.type';
import { formatNumber, unformatNumber } from '../formatting';

export const useEqualButton = ({
  input,
  memory,
  operation,
  shouldResetInput,
  lastOperand,
  setInput,
  setLastOperand,
  setMemory,
  setShouldResetInput,
}: BaseButtonProps) => {
  const handleEqualButtonClick = useCallback(() => {
    if (memory && operation) {
      const operand = shouldResetInput && lastOperand ? lastOperand : unformatNumber(input);

      const result = eval(`${unformatNumber(memory)} ${operation} ${operand}`);

      // Handle Error...

      setInput(formatNumber(result));
      setMemory(formatNumber(result));
      setLastOperand(operand); // Store operand for repeated "=" presses
      setShouldResetInput(true);
    }
  }, [
    input,
    memory,
    operation,
    shouldResetInput,
    lastOperand,
    setInput,
    setLastOperand,
    setMemory,
    setShouldResetInput,
  ]);

  return {
    handleEqualButtonClick,
  };
};
