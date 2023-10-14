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
      const handleError = () => {
        setInput('Error');
        setMemory(null);
        setOperation(null);
      };

      if (!shouldResetInput) {
        setLastOperand(input);
      }

      const operand = shouldResetInput ? lastOperand : unformatNumber(input);
      const result = eval(`${unformatNumber(memory)} ${operation} ${operand}`);

      if (result === Infinity || result === -Infinity || isNaN(result)) {
        handleError();
      } else {
        setShouldResetInput(true);
        setInput(formatNumber(result));
        setMemory(formatNumber(result));
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
