import {
  MAX_EXPONENT_VALUE,
  MIN_EXPONENT_VALUE,
  WHOLE_NUMBER_LIMIT,
} from '../common/data.constants';
import { DEFAULT_DISPLAY_FONT_SIZE } from '../common/styles.constants';

export function getActualLength(numberString: string): number {
  return numberString.replace(/[,.]/g, '').length; // Excludes commas and the decimal point
}

export function formatNumber(number: string | number): string {
  let numValue = parseFloat(number.toString());

  if (Math.abs(numValue) > WHOLE_NUMBER_LIMIT) {
    if (numValue > MAX_EXPONENT_VALUE) numValue = MAX_EXPONENT_VALUE;
    if (numValue < MIN_EXPONENT_VALUE) numValue = MIN_EXPONENT_VALUE;

    const exponent = Math.floor(Math.log10(Math.abs(numValue)));
    const base = Math.round(numValue / Math.pow(10, exponent));
    return `${base < 0 ? '-' : ''}${Math.abs(base)}e${exponent}`;
  }

  return numValue.toLocaleString(undefined, { maximumFractionDigits: 8 });
}

export function unformatNumber(formattedNumber: string): string {
  return formattedNumber.replace(/,/g, '');
}

export function getAdjustedFontSize(input: string): string {
  const formattedLength = unformatNumber(input).length;
  const FONT_SIZE_DECREMENT = 0.45;
  const decrementsNeeded = Math.max(formattedLength - 7, 0);

  const ADJUSTED_FONTSIZE = `${
    DEFAULT_DISPLAY_FONT_SIZE - FONT_SIZE_DECREMENT * decrementsNeeded
  }rem`;

  return ADJUSTED_FONTSIZE;
}
