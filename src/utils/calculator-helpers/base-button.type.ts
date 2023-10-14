export type BaseButtonProps = {
  input: string;
  memory: string | null;
  operation: string | null;
  shouldResetInput: boolean;
  lastOperand: string | null;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setLastOperand: React.Dispatch<React.SetStateAction<string | null>>;
  setMemory: React.Dispatch<React.SetStateAction<string | null>>;
  setOperation: React.Dispatch<React.SetStateAction<string | null>>;
  setShouldResetInput: React.Dispatch<React.SetStateAction<boolean>>;
};
