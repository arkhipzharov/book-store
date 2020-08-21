// If you changed/added/moved some icon, set value that is greater than previous
// to refresh icons cache. You can use floating point number that is as big as you want.
// If you don't see icon on website after this, to refresh icons cache:
// 1. disable webpack
// 2. set new value
// 3. enable webpack
const ICONS_CACHE_REVISION = 2.31;
const STARTUP_SORT_PRODUCTS_BY_DATA_KEY = 'price';
const BASE_FONT_SIZE = 16;

// not es6 export because constants can be used in configs
module.exports = {
  ICONS_CACHE_REVISION,
  STARTUP_SORT_PRODUCTS_BY_DATA_KEY,
  BASE_FONT_SIZE,
};
