import { useCallback } from 'react';
import { BaseButtonProps } from './base-button.type';
import { calculate } from '../calculate';
import { formatNumber, unformatNumber } from '../formatting';

export const useEqualButton = ({
  input,
  memory,
  operation,
  shouldResetInput,
  lastDisplay,
  setInput,
  setLastDisplay,
  setMemory,
  setOperation,
  setShouldResetInput,
}: BaseButtonProps) => {
  const handleEqualButtonClick = useCallback(() => {
    if (memory && operation) {
      const currDisplay =
        shouldResetInput && lastDisplay
          ? parseFloat(lastDisplay)
          : parseFloat(unformatNumber(input));

      const result = calculate(parseFloat(unformatNumber(memory)), currDisplay, operation);

      if (result === Infinity || result === -Infinity || isNaN(result) || result === null) {
        setInput('Error');
        setMemory(null);
        setOperation(null);
      } else {
        setInput(formatNumber(result));
        setMemory(formatNumber(result));
        setLastDisplay(`${currDisplay}`);
        setShouldResetInput(true);
      }
    }
  }, [
    input,
    memory,
    operation,
    shouldResetInput,
    lastDisplay,
    setInput,
    setLastDisplay,
    setMemory,
    setOperation,
    setShouldResetInput,
  ]);

  return {
    handleEqualButtonClick,
  };
};
