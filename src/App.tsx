import { useCallback, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Unstable_Grid2';

import { getButtonAttributes } from './common/button';
import { BUTTONS, OPER_BUTTONS } from './common/data.constants';
import { BoxStyle, InputStyle, MainStyle } from './common/styles.constants';
import {
  formatNumber,
  getActualLength,
  getAdjustedFontSize,
  unformatNumber,
} from './utils/formatting';

export default function App() {
  const [activeOperation, setActiveOperation] = useState<string | null>(null);
  const [clearButtonLabel, setClearButtonLabel] = useState('AC');
  const [input, setInput] = useState('0');
  const [memory, setMemory] = useState<string | null>(null);
  const [lastOperand, setLastOperand] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldResetInput, setShouldResetInput] = useState(false);

  const ADJUSTED_FONTSIZE = getAdjustedFontSize(input);

  const handleButtonClick = useCallback(
    (value: string) => {
      if (value === '=') {
        if (memory && operation) {
          const handleError = () => {
            setInput('Error');
            setMemory(null);
            setOperation(null);
          };

          try {
            const operand = lastOperand && shouldResetInput ? lastOperand : unformatNumber(input);
            const result = eval(`${unformatNumber(memory)} ${operation} ${operand}`);

            if (result === Infinity || result === -Infinity || isNaN(result)) {
              handleError();
            } else {
              setShouldResetInput(true);
              setInput(formatNumber(result));
              setMemory(formatNumber(result));
            }
          } catch {
            handleError();
          }
        }
      } else if (OPER_BUTTONS.includes(value)) {
        setMemory(input);
        setLastOperand(input);

        if (value === '×') {
          setOperation('*');
        } else if (value === '÷') {
          setOperation('/');
        } else {
          setOperation(value);
        }

        setActiveOperation(value);
        setShouldResetInput(true);
      } else if (value === 'AC' || value === 'C') {
        if (value === 'AC') {
          setOperation(null);
          setActiveOperation(null);
        }

        setInput('0');
        setMemory(null);
        setLastOperand(null);
        setClearButtonLabel('AC');
      } else if (value === '+/-') {
        if (shouldResetInput) {
          setInput('0');
        } else {
          setInput((prev) => formatNumber(Number(unformatNumber(prev)) * -1));
        }
      } else if (value === '%') {
        setInput((prev) => formatNumber(Number(unformatNumber(prev)) / 100));
      } else if (!isNaN(Number(value)) || value === '.') {
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
      }
    },
    [input, lastOperand, memory, operation, shouldResetInput],
  );

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
          handleButtonClick('C');
          break;
        case '%':
          handleButtonClick('%');
          break;
        default:
          break;
      }
    },
    [handleButtonClick, input],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Container component='main' maxWidth='xs' sx={MainStyle}>
      <CssBaseline />
      <Box sx={BoxStyle}>
        <Grid container spacing={1}>
          <Grid xs={12}>
            <Box sx={{ ...InputStyle, fontSize: ADJUSTED_FONTSIZE }}>{input}</Box>
          </Grid>
          {BUTTONS.map((row, rowIndex) => (
            <Grid xs={12} key={rowIndex}>
              <Grid container justifyContent='center' spacing={2}>
                {row.map((button, buttonIndex) => {
                  const { buttonLabel, buttonSx } = getButtonAttributes(
                    activeOperation,
                    button,
                    clearButtonLabel,
                  );

                  return (
                    <Grid key={buttonIndex} sx={button === '0' ? { flexGrow: 1 } : {}}>
                      <Button
                        variant='contained'
                        sx={buttonSx}
                        onClick={() => handleButtonClick(buttonLabel)}
                        fullWidth
                      >
                        {buttonLabel}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
