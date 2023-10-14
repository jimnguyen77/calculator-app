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
  setOperation,
  setShouldResetInput,
}: BaseButtonProps) => {
  const handleEqualButtonClick = useCallback(() => {
    if (memory && operation) {
      const operand = shouldResetInput && lastOperand ? lastOperand : unformatNumber(input);

      const result = eval(`${unformatNumber(memory)} ${operation} ${operand}`);

      if (result === Infinity || result === -Infinity || isNaN(result)) {
        setInput('Error');
        setMemory(null);
        setOperation(null);
      } else {
        setInput(formatNumber(result));
        setMemory(formatNumber(result));
        setLastOperand(operand);
        setShouldResetInput(true);
      }
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
    setOperation,
    setShouldResetInput,
  ]);

  return {
    handleEqualButtonClick,
  };
};
