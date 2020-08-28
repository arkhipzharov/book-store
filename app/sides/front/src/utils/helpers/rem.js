import { BASE_FONT_SIZE } from '@front/utils/constants';

export function rem(fontSizePx) {
  return `${fontSizePx / BASE_FONT_SIZE}rem`;
}
