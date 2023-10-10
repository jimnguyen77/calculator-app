export enum ButtonColors {
  DEFAULT = 'white',
  NUM_BG = '#2D2D2D',
  NUM_HOVER_BG = '#6D6D6D',
  OPER_BG = '#FFAA00',
  OPER_HOVER_BG = '#FFD88A',
  TOP_BG = '#9B9B9B',
  TOP_COLOR = 'black',
}

export const BaseStyle = {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
};

export const MainStyle = {
  ...BaseStyle,
  flexDirection: 'column',
  height: '100vh',
};

export const BoxStyle = {
  ...BaseStyle,
  minHeight: '100vh',
  width: '304px',
};

export const InputStyle = {
  alignItems: 'center',
  color: ButtonColors.DEFAULT,
  display: 'flex',
  fontSize: '4.25rem',
  fontWeight: '300',
  height: '80px',
  justifyContent: 'flex-end',
  mb: 1,
};

export const ButtonStyle = {
  backgroundColor: ButtonColors.NUM_BG,
  borderRadius: '50%',
  fontSize: '1.3rem',
  fontWeight: 'bold',
  height: '65px',
  width: '100%',
  '&:hover': {
    backgroundColor: ButtonColors.NUM_HOVER_BG,
  },
};

export const OperButtonStyle = {
  ...ButtonStyle,
  backgroundColor: ButtonColors.OPER_BG,
  '&:hover': {
    backgroundColor: ButtonColors.OPER_HOVER_BG,
  },
};

export const OperButtonActiveStyle = {
  ...ButtonStyle,
  backgroundColor: ButtonColors.DEFAULT,
  color: ButtonColors.OPER_BG,
  '&:hover': {
    backgroundColor: ButtonColors.DEFAULT,
  },
};

export const TopButtonStyle = {
  ...ButtonStyle,
  color: ButtonColors.TOP_COLOR,
  backgroundColor: ButtonColors.TOP_BG,
};

export const ZeroButtonStyle = {
  ...ButtonStyle,
  borderRadius: '50px',
};
