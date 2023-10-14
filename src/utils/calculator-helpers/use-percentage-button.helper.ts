import { useCallback } from 'react';
import { BaseButtonProps } from './base-button.type';
import { formatNumber, unformatNumber } from '../formatting';

type PercentageButtonProps = Pick<BaseButtonProps, 'setInput'>;

export const usePercentageButton = ({ setInput }: PercentageButtonProps) => {
  const handlePercentageButtonClick = useCallback(() => {
    setInput((prev) => formatNumber(Number(unformatNumber(prev)) / 100));
  }, [setInput]);

  return {
    handlePercentageButtonClick,
  };
};
