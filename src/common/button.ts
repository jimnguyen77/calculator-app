import { OPER_BUTTONS, TOP_BUTTONS } from './data.constants';
import {
  ButtonStyle,
  OperButtonActiveStyle,
  OperButtonStyle,
  TopButtonStyle,
  ZeroButtonStyle,
} from './styles.constants';

type ButtonSxType =
  | typeof ButtonStyle
  | typeof OperButtonStyle
  | typeof OperButtonActiveStyle
  | typeof TopButtonStyle
  | typeof ZeroButtonStyle;

type getButtonAttributesProps = (
  activeOperation: string | null,
  button: string,
  clearButtonLabel: string,
) => {
  buttonLabel: string;
  buttonSx: ButtonSxType;
};

export const getButtonAttributes: getButtonAttributesProps = (
  activeOperation,
  button,
  clearButtonLabel,
) => {
  const buttonLabel = button === 'AC' || button === 'C' ? clearButtonLabel : button;

  let buttonSx;
  if (button === '0') {
    buttonSx = ZeroButtonStyle;
  } else if (TOP_BUTTONS.includes(button)) {
    buttonSx = TopButtonStyle;
  } else if (OPER_BUTTONS.includes(button)) {
    buttonSx = {
      ...OperButtonStyle,
      ...(activeOperation === button ? OperButtonActiveStyle : {}),
    };
  } else {
    buttonSx = ButtonStyle;
  }

  return { buttonLabel, buttonSx };
};
