// purgecss removes unused classes from bundled css

module.exports = {
  // purgecss will run after build to not check all styles that coming from
  // node_modules
  content: ['build/index.html', 'build/static/js/*.js'],
  css: ['build/static/css/*.css'],
  output: 'build/static/css',
  whitelistPatterns: [
    // add 3rd party component class prefix if you encounter problems with it's styles
    // because of dynamic classes
    // https://github.com/Developmint/nuxt-purgecss/issues/14#issuecomment-435850794
    /navbar\-/,
    /btn\-/,
    /card\-/,
    /badge\-/,
    /col\-/,
    /nav\-/,
  ],
};
