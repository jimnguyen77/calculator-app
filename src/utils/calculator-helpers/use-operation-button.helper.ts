import { useCallback } from 'react';
import { BaseButtonProps } from './base-button.type';
import { formatNumber, unformatNumber } from '../formatting';

type OperationButtonProps = BaseButtonProps & {
  setActiveOperation: React.Dispatch<React.SetStateAction<string | null>>;
};

export const useOperationButton = ({
  input,
  memory,
  operation,
  setInput,
  setActiveOperation,
  setMemory,
  setOperation,
  setShouldResetInput,
  shouldResetInput,
}: OperationButtonProps) => {
  const handleOperationButtonClick = useCallback(
    (value: string) => {
      if (memory && operation && !shouldResetInput) {
        const operand = unformatNumber(input);
        const result = eval(`${unformatNumber(memory)} ${operation} ${operand}`);
        setInput(formatNumber(result));
        setMemory(formatNumber(result));
      } else if (!memory) {
        setMemory(input);
      }

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
      memory,
      operation,
      setInput,
      setActiveOperation,
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
