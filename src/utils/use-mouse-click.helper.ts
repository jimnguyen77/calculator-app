import { useCallback, useState } from 'react';
import { OPER_BUTTONS } from '../common/data.constants';
import { useEqualButton } from './calculator-helpers/use-equal-button.helper';
import { useOperationButton } from './calculator-helpers/use-operation-button.helper';
import { useClearButton } from './calculator-helpers/use-clear-button.helper';
import { useSignChangeButton } from './calculator-helpers/use-sign-change-button.helper';
import { usePercentageButton } from './calculator-helpers/use-percentage-button.helper';
import { useNumberOrDecimalButton } from './calculator-helpers/use-number-or-decimal-button.helper';

type MouseClickHelpersProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setActiveOperation: React.Dispatch<React.SetStateAction<string | null>>;
  setClearButtonLabel: React.Dispatch<React.SetStateAction<string>>;
};

export const useMouseClickHelpers = ({
  input,
  setInput,
  setActiveOperation,
  setClearButtonLabel,
}: MouseClickHelpersProps) => {
  const [memory, setMemory] = useState<string | null>(null);
  const [lastOperand, setLastOperand] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldResetInput, setShouldResetInput] = useState(false);

  const sharedStateAndSetters = {
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
  };

  const { handleEqualButtonClick } = useEqualButton({
    ...sharedStateAndSetters,
  });

  const { handleOperationButtonClick } = useOperationButton({
    ...sharedStateAndSetters,
    setActiveOperation,
  });

  const { handleClearButtonClick } = useClearButton({
    ...sharedStateAndSetters,
    setActiveOperation,
    setClearButtonLabel,
  });

  const { handleSignChangeButtonClick } = useSignChangeButton({
    setInput,
    shouldResetInput,
  });

  const { handlePercentageButtonClick } = usePercentageButton({
    setInput,
  });

  const { handleNumberOrDecimalButtonClick } = useNumberOrDecimalButton({
    ...sharedStateAndSetters,
    setActiveOperation,
    setClearButtonLabel,
  });

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
