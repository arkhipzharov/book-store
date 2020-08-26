import { createGlobalStyle } from 'styled-components';

export const NormalizeCustom = createGlobalStyle`
  svg {
    fill: currentColor;
  }

  /* removes arrows from input[type=number] */
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }
`;
