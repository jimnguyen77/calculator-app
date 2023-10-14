export function calculate(a: number, b: number, operation: string): number | null {
  switch (operation) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) {
        // Division of zero
        return null;
      }
      return a / b;
    default:
      // Unknown operation
      return null;
  }
}
