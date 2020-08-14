import { createGlobalStyle } from 'styled-components';
import { BaseStyles } from './BaseStyles';
import { Libs } from './Libs';

export const GlobalStyles = createGlobalStyle`
  ${BaseStyles}
  ${Libs}
`;
