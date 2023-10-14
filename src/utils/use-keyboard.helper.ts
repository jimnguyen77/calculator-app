import { useCallback } from 'react';
import { formatNumber, unformatNumber } from './formatting';

type KeyboardHelpersProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  clearButtonLabel: string;
  handleButtonClick: (value: string) => void;
};

export const useKeyboardHelpers = ({
  input,
  setInput,
  clearButtonLabel,
  handleButtonClick,
}: KeyboardHelpersProps) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;

      if (key === 'Backspace') {
        const slicedInput = unformatNumber(input).slice(0, -1);
        setInput(slicedInput ? formatNumber(slicedInput) : '0');
      }

      if (event.altKey && event.code === 'Minus') {
        handleButtonClick('+/-');
        return;
      }

      if (!isNaN(Number(key)) || key === '.') {
        handleButtonClick(key);
        return;
      }

      switch (key) {
        case '+':
        case '-':
          handleButtonClick(key);
          break;
        case '*':
          handleButtonClick('×');
          break;
        case '/':
          handleButtonClick('÷');
          break;
        case '=':
        case 'Enter':
          handleButtonClick('=');
          break;
        case 'c':
        case 'C':
        case 'Escape':
          handleButtonClick(clearButtonLabel);
          break;
        case '%':
          handleButtonClick('%');
          break;
        default:
          break;
      }
    },
    [clearButtonLabel, handleButtonClick, input, setInput],
  );

  return {
    handleKeyDown,
  };
};
