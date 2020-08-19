import { ICONS_CACHE_REVISION } from '@/js/utils/constants';
// this lib puts svgSpriteInjector in window, that's why we just import file
// contents
import svgSpriteInjector from '@/js/libs-custom/svgSpriteInjector';

// Import all the icons recursively from specific folder and subfolders
// so that they will be in svg sprite and then consider deleting, moving and
// changing them
// https://github.com/JetBrains/svg-sprite-loader/issues/212#issuecomment-343561578
const icons = require.context('@/assets/img/icons', true, /\.svg$/);
icons.keys().forEach(icons);

// (unknown)
// reusing svg icons and saving to storage for faster website loading
// further info about icons system like this:
// https://www.keycdn.com/blog/icon-fonts-vs-svgs
// https://css-tricks.com/svg-sprites-use-better-icon-fonts/
// https://css-tricks.com/svg-symbol-good-choice-icons/
// sometimes `window.svgSpriteInjector is not a function occures`,
// maybe because of npm/webpack cache or other
(window.svgSpriteInjector || svgSpriteInjector)('sprite.svg', {
  revision: ICONS_CACHE_REVISION,
});
