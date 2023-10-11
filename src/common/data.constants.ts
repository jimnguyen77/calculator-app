// formatting number limits
export const EXPONENT_LIMIT = 160;
export const MAX_EXPONENT_VALUE = Math.pow(10, EXPONENT_LIMIT);
export const MIN_EXPONENT_VALUE = -Math.pow(10, EXPONENT_LIMIT);
export const WHOLE_NUMBER_LIMIT = 999999999;

// buttons
export const TOP_BUTTONS = ['AC', '+/-', '%'];
export const OPER_BUTTONS = ['÷', '×', '-', '+', '='];

export let BUTTONS = [
  [...TOP_BUTTONS],
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['0', '.'],
];

let operIndex = 0;
BUTTONS = BUTTONS.map((row) => {
  row.push(OPER_BUTTONS[operIndex]);
  operIndex++;
  return row;
});
