const MAX_RANGE = 999999999;
const MIN_RANGE = -999999999;

export function getActualLength(numberString: string): number {
  return numberString.replace(/[,.]/g, '').length; // Excludes commas and the decimal point
}

export function formatNumber(number: string | number): string {
  let numValue = parseFloat(number.toString());
  numValue = Math.min(Math.max(numValue, MIN_RANGE), MAX_RANGE);

  let formattedNum = numValue.toLocaleString(undefined, { maximumFractionDigits: 8 });
  const parts = formattedNum.split('.');

  while (getActualLength(formattedNum) > 9) {
    formattedNum = Number(formattedNum).toFixed(parts[1].length - 1);
    parts[1] = parts[1].substring(0, parts[1].length - 1);
  }

  return formattedNum;
}

export function unformatNumber(formattedNumber: string): string {
  return formattedNumber.replace(/,/g, '');
}

export function getAdjustedFontSize(input: string): string {
  const formattedLength = unformatNumber(input).length;
  let ADJUSTED_FONTSIZE = '4.25rem';

  if (formattedLength >= 8) {
    ADJUSTED_FONTSIZE = '3.8rem';
  }

  if (formattedLength >= 9) {
    ADJUSTED_FONTSIZE = '3.4rem';
  }

  return ADJUSTED_FONTSIZE;
}
