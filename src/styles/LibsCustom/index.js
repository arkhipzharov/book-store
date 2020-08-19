import { createGlobalStyle } from 'styled-components';
import { Bootstrap } from './Bootstrap';
import { ReactBootstrapTypeahead } from './ReactBootstrapTypeahead';

export const Libs = createGlobalStyle`
  ${Bootstrap}
  ${ReactBootstrapTypeahead}
`;
