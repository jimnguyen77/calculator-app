import { useCallback } from 'react';
import { formatNumber, unformatNumber } from '../formatting';

type SignChangeButtonProps = {
  setInput: React.Dispatch<React.SetStateAction<string>>;
  shouldResetInput: boolean;
};

export const useSignChangeButton = ({ setInput, shouldResetInput }: SignChangeButtonProps) => {
  const handleSignChangeButtonClick = useCallback(() => {
    if (shouldResetInput) {
      setInput('0');
    } else {
      setInput((prev) => formatNumber(Number(unformatNumber(prev)) * -1));
    }
  }, [shouldResetInput, setInput]);

  return { handleSignChangeButtonClick };
};
