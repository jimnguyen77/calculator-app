import { useCallback } from 'react';
import { BaseButtonProps } from './base-button.type';
import { formatNumber, unformatNumber } from '../formatting';

type OperationButtonProps = BaseButtonProps & {
  setActiveOperation: React.Dispatch<React.SetStateAction<string | null>>;
};

export const useOperationButton = ({
  input,
  lastOperand,
  memory,
  operation,
  setInput,
  setActiveOperation,
  setLastOperand,
  setMemory,
  setOperation,
  setShouldResetInput,
  shouldResetInput,
}: OperationButtonProps) => {
  const handleOperationButtonClick = useCallback(
    (value: string) => {
      if (memory && operation) {
        // Perform the previous operation
        const operand = lastOperand && shouldResetInput ? lastOperand : unformatNumber(input);
        const result = eval(`${unformatNumber(memory)} ${operation} ${operand}`);
        setInput(formatNumber(result));
        setMemory(formatNumber(result));
      } else {
        // Store the first operand
        setMemory(input);
      }

      setLastOperand(input);

      // Set the new operation
      if (value === '×') {
        setOperation('*');
      } else if (value === '÷') {
        setOperation('/');
      } else {
        setOperation(value);
      }

      setActiveOperation(value);
      setShouldResetInput(true);
    },
    [
      input,
      lastOperand,
      memory,
      operation,
      setInput,
      setActiveOperation,
      setLastOperand,
      setMemory,
      setOperation,
      setShouldResetInput,
      shouldResetInput,
    ],
  );

  return {
    handleOperationButtonClick,
  };
};
