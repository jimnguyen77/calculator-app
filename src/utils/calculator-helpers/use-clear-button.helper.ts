import { useCallback } from 'react';
import { BaseButtonProps } from './base-button.type';

type ClearButtonProps = BaseButtonProps & {
  setActiveOperation: React.Dispatch<React.SetStateAction<string | null>>;
  setClearButtonLabel: React.Dispatch<React.SetStateAction<string>>;
};

export const useClearButton = ({
  setInput,
  setActiveOperation,
  setClearButtonLabel,
  setLastOperand,
  setMemory,
  setOperation,
}: ClearButtonProps) => {
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

  return {
    handleClearButtonClick,
  };
};
