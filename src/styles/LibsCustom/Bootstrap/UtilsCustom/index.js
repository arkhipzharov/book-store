// cheatsheets for utils taken from other css frameworks:
// tailwindcss - https://nerdcave.com/tailwind-cheat-sheet

import { createGlobalStyle } from 'styled-components';
import { FixedWidthHeight } from './FixedWidthHeight';
import { Cursor } from './Cursor';

export const UtilsCustom = createGlobalStyle`
  /* tailwindcss */
  ${FixedWidthHeight}
  ${Cursor}
`;
