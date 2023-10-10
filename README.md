# Calculator App

This is a replica application of the Apple iPhone calculator app written purely in React + TypeScript using MUI (Material UI).

It satisfies the basic operations of add, subtract, multiply, and divide.

## Initial planning and thought process:
- Create scaffolding
	- Create initial grid
	- Map buttons in constants
   - Create static styling constants (for grid and buttons)
	- Fix styling of buttons
- Add button functionality
	- Display of numbers, including commas
	- Operation of operands (+, -, =, etc.)
	- Clear button
	- Decimal usage
	- Percent and +/-
- Expand on button functionality and UI
	- Change AC to C based on behavior
	- “Sticky” operand styling
	- Limit display to 9 digits, while shrinking font size
	- Add keyboard support (including backspace)

To use this code, within the root of it, type:
```
yarn && yarn dev
```
This should open up a temporary web dev server located at: http://localhost:5173

## TODOs (in no particular order):
- make "0" left justified, instead of centered (nit)
- ability to repeat last operand when clicking "=" button
- properly handle NaN and Infinity (display)
- add keyboard support, rather than only using mouse clicks
