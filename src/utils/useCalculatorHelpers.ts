import { useCallback, useState } from 'react';
import { OPER_BUTTONS } from '../common/data.constants';
import { formatNumber, getActualLength, unformatNumber } from './formatting';

type CalculatorHelpersProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setActiveOperation: React.Dispatch<React.SetStateAction<string | null>>;
  setClearButtonLabel: React.Dispatch<React.SetStateAction<string>>;
};

export const useCalculatorHelpers = ({
  input,
  setInput,
  setActiveOperation,
  setClearButtonLabel,
}: CalculatorHelpersProps) => {
  const [memory, setMemory] = useState<string | null>(null);
  const [lastOperand, setLastOperand] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldResetInput, setShouldResetInput] = useState(false);

  const handleEqualButtonClick = useCallback(() => {
    if (memory && operation) {
      const handleError = () => {
        setInput('Error');
        setMemory(null);
        setOperation(null);
      };

      // Only calculate with the new operand if '=' wasn't the previous button pressed
      if (!shouldResetInput) {
        setLastOperand(input);
      }

      // Use the last operand if '=' was the previous button pressed
      const operand = shouldResetInput ? lastOperand : unformatNumber(input);

      // Perform the calculation
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

  const handleClearButtonClick = useCallback(
    (value: string) => {
      if (value === 'AC') {
        setOperation(null);
        setActiveOperation(null);
      }

      setInput('0');
      setMemory(null);
      setLastOperand(null);
      setClearButtonLabel('AC');
    },
    [setInput, setMemory, setLastOperand, setOperation, setActiveOperation, setClearButtonLabel],
  );

  const handleSignChangeButtonClick = useCallback(() => {
    if (shouldResetInput) {
      setInput('0');
    } else {
      setInput((prev) => formatNumber(Number(unformatNumber(prev)) * -1));
    }
  }, [shouldResetInput, setInput]);

  const handlePercentageButtonClick = useCallback(() => {
    setInput((prev) => formatNumber(Number(unformatNumber(prev)) / 100));
  }, [setInput]);

  const handleNumberOrDecimalButtonClick = useCallback(
    (value: string) => {
      setClearButtonLabel('C');
      setActiveOperation(null);

      if (input === 'Error' || shouldResetInput) {
        setInput(value === '.' ? '0.' : value);
        if (shouldResetInput) {
          setShouldResetInput(false);
        }
        return;
      }

      if (value === '.' && !input.includes('.')) {
        setInput((prev) => prev + '.');
      } else {
        const currentNum = unformatNumber(input);
        // add +1 if the next character is not "."
        // to account for the character that will be appended
        if (getActualLength(currentNum) + (value !== '.' ? 1 : 0) <= 9) {
          setInput((prev) => {
            const newValue = prev === '0' && value !== '.' ? value : unformatNumber(prev) + value;
            return formatNumber(newValue);
          });
        }
      }
    },
    [input, shouldResetInput, setInput, setActiveOperation, setClearButtonLabel],
  );

  const handleButtonClick = useCallback(
    (value: string) => {
      if (value === '=') {
        handleEqualButtonClick();
      } else if (OPER_BUTTONS.includes(value)) {
        handleOperationButtonClick(value);
      } else if (value === 'AC' || value === 'C') {
        handleClearButtonClick(value);
      } else if (value === '+/-') {
        handleSignChangeButtonClick();
      } else if (value === '%') {
        handlePercentageButtonClick();
      } else if (!isNaN(Number(value)) || value === '.') {
        handleNumberOrDecimalButtonClick(value);
      }
    },
    [
      handleEqualButtonClick,
      handleOperationButtonClick,
      handleClearButtonClick,
      handleSignChangeButtonClick,
      handlePercentageButtonClick,
      handleNumberOrDecimalButtonClick,
    ],
  );

  return {
    handleButtonClick,
  };
};
