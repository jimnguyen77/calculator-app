import { useCallback } from 'react';
import { BaseButtonProps } from './base-button.type';
import { formatNumber, getActualLength, unformatNumber } from '../formatting';

type NumberOrDecimalButtonProps = BaseButtonProps & {
  setActiveOperation: React.Dispatch<React.SetStateAction<string | null>>;
  setClearButtonLabel: React.Dispatch<React.SetStateAction<string>>;
};

export const useNumberOrDecimalButton = ({
  input,
  shouldResetInput,
  setInput,
  setActiveOperation,
  setClearButtonLabel,
  setShouldResetInput,
}: NumberOrDecimalButtonProps) => {
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
    [
      input,
      shouldResetInput,
      setInput,
      setActiveOperation,
      setClearButtonLabel,
      setShouldResetInput,
    ],
  );

  return {
    handleNumberOrDecimalButtonClick,
  };
};
