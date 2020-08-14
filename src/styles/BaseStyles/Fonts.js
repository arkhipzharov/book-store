import { createGlobalStyle } from 'styled-components';

export const Fonts = createGlobalStyle`
  @font-face {
    font-weight: 400;
    font-family: Monsterrat;
    font-style: normal;
    src: local('Monsterrat Regular'), local('Monsterrat-Regular'),
      url(${require('@/assets/fonts/Monsterrat-Regular.ttf')}) format('truetype');
  }
`;
