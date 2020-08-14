// eslint-import-resolver-webpack can't handle css file imports,
// but we are not ignoring that imports in config to not swallow possible errors
// so you should import file with .scss extension instead of shorter path
// https://github.com/benmosher/eslint-plugin-import/issues/151#issuecomment-167003063
import './partials-custom.scss';
import { createGlobalStyle } from 'styled-components';
import { UtilsCustom } from './UtilsCustom';

export const Bootstrap = createGlobalStyle`
  ${UtilsCustom}
`;
