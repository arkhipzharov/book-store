import { createGlobalStyle } from 'styled-components';
import { NormalizeCustom } from './NormalizeCustom';
import { Fonts } from './Fonts';
import { Blocks } from './Blocks';

export const BaseStyles = createGlobalStyle`
  ${NormalizeCustom}
  ${Fonts}
  ${Blocks}
`;
