import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Unstable_Grid2';

import { getButtonAttributes } from './common/button';
import { BUTTONS } from './common/data.constants';
import { BoxStyle, InputStyle, MainStyle } from './common/styles.constants';
import { getAdjustedFontSize } from './utils/formatting';
import { useMouseClickHelpers } from './utils/use-mouse-click.helper';
import { useKeyboardHelpers } from './utils/use-keyboard.helper';

export default function App() {
  const [input, setInput] = useState<string>('0');
  const [activeOperation, setActiveOperation] = useState<string | null>(null);
  const [clearButtonLabel, setClearButtonLabel] = useState<string>('AC');

  const ADJUSTED_FONTSIZE = getAdjustedFontSize(input);

  const mouseClickHelpers = useMouseClickHelpers({
    input,
    setInput,
    setActiveOperation,
    setClearButtonLabel,
  });

  const keyboardHelpers = useKeyboardHelpers({
    input,
    setInput,
    clearButtonLabel,
    handleButtonClick: mouseClickHelpers.handleButtonClick,
  });

  useEffect(() => {
    window.addEventListener('keydown', keyboardHelpers.handleKeyDown);
    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('keydown', keyboardHelpers.handleKeyDown);
  }, [keyboardHelpers.handleKeyDown]);

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
              <Grid container justifyContent='center' spacing={1}>
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
                        onClick={() => mouseClickHelpers.handleButtonClick(buttonLabel)}
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
