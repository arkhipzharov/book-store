import { createGlobalStyle } from 'styled-components';
import { BaseStyles } from './BaseStyles';
import { Libs } from './LibsCustom';
import './libs';

export const GlobalStyles = createGlobalStyle`
  ${BaseStyles}
  ${Libs}
`;
