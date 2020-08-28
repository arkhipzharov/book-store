// Import all the icons recursively from specific folder and subfolders
// so that they will be in svg sprite and then consider deleting, moving and
// changing them
// https://github.com/JetBrains/svg-sprite-loader/issues/212#issuecomment-343561578
// reusing svg icons and saving to storage for faster website loading
// further info about icons system like this:
// https://www.keycdn.com/blog/icon-fonts-vs-svgs
// https://css-tricks.com/svg-sprites-use-better-icon-fonts/
// https://css-tricks.com/svg-symbol-good-choice-icons/

import { ICONS_CACHE_REVISION } from '@front/utils/constants';
// this lib puts svgSpriteInjector in window, that's why we just import file
// contents
import svgSpriteInjector from '@front/js/libs-custom/svgSpriteInjector';

const icons = require.context('@front/assets/img/icons', true, /\.svg$/);
icons.keys().forEach(icons);

// (unknown)
// sometimes `window.svgSpriteInjector is not a function occures`,
// maybe because of npm/webpack cache or other
(window.svgSpriteInjector || svgSpriteInjector)('sprite.svg', {
  revision: ICONS_CACHE_REVISION,
});
