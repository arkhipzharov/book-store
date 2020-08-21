import { BASE_FONT_SIZE } from '@/js/constants';

export function rem(fontSizePx) {
  return `${fontSizePx / BASE_FONT_SIZE}rem`;
}
