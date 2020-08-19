// cheatsheets for utils taken from other css frameworks:
// tailwindcss - https://nerdcave.com/tailwind-cheat-sheet

import { createGlobalStyle } from 'styled-components';

export const UtilsCustom = createGlobalStyle`
  /* tailwindcss */
  ${['width', 'height'].map((propName, i) => {
    const classBase = propName === 'width' ? 'w' : 'h';
    return `
      .${classBase}-1 {
        ${propName}: 4px;
      }
      .${classBase}-2 {
        ${propName}: 8px;
      }
      .${classBase}-3 {
        ${propName}: 12px;
      }
      .${classBase}-4 {
        ${propName}: 16px;
      }
      .${classBase}-5 {
        ${propName}: 20px;
      }
      .${classBase}-6 {
        ${propName}: 24px;
      }
      .${classBase}-8 {
        ${propName}: 32px;
      }
      .${classBase}-10 {
        ${propName}: 40px;
      }
      .${classBase}-12 {
        ${propName}: 48px;
      }
      .${classBase}-16 {
        ${propName}: 64px;
      }
      .${classBase}-20 {
        ${propName}: 80px;
      }
      .${classBase}-24 {
        ${propName}: 96px;
      }
      .${classBase}-32 {
        ${propName}: 128px;
      }
      .${classBase}-40 {
        ${propName}: 160px;
      }
      .${classBase}-48 {
        ${propName}: 192px;
      }
      .${classBase}-56 {
        ${propName}: 224px;
      }
      .${classBase}-64 {
        ${propName}: 256px;
      }
    `;
  })}
`;
