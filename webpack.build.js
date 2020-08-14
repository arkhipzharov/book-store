const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// `CleanWebpackPlugin is not a constructor`, that's why `{ CleanWebpackPlugin }`
// https://stackoverflow.com/questions/56567930/typeerror-cleanwebpackplugin-is-not-a-constructor
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    // refresh js by adding hash after uploading new version of website
    filename: 'static/js/main.[hash:8].js',
  },
  performance: {
    // to not show warnings about too big bundle size
    hints: false,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            // We want terser to parse ecma 8 code. However, we don't want it
            // to apply any minification steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending further investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        sourceMap: true,
      }),
    ],
  },
  plugins: [
    // clean /build folder before every build config run
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // refresh styles by adding hash after uploading new version of website
      filename: 'static/css/styles.[hash:8].css',
    }),
  ],
};
