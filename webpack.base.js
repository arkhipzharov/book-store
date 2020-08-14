const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 'TypeError: merge is not a function', thats why .default
const merge = require('webpack-merge').default;
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.build');

module.exports = (env) => {
  const isEnvProduction = env.production;
  const baseConfig = {
    // `Can't resolve 'src/main.js', thats why ./`
    entry: './src/main.js',
    resolve: {
      // import './file-name-without-extension'
      extensions: ['*', '.js', '.scss'],
      // import './folder' instead of './folder/index.ext'
      plugins: [new DirectoryNamedWebpackPlugin(true)],
      alias: {
        // import '@/file' instead of import '../../../file'
        '@': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          // using scss only to customize bootstrap theme styles
          test: /\.scss$/,
          use: [
            isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            ...(isEnvProduction ? ['postcss-loader'] : []),
            'fast-sass-loader',
          ],
        },
        {
          test: /\.(jpe?g|png)$/,
          use: [
            {
              loader: isEnvProduction ? 'url-loader' : 'file-loader',
              options: {
                // <img src={[object Module]} ... /> inside chrome ELements tab
                // when doing src={require('../path/img.png')}
                // we can solve it by doing src={require('../path/img.png').default}
                // but this is more boilerplate
                // https://github.com/vuejs/vue-loader/issues/1612#issuecomment-559366730
                esModule: false,
                name: '[name].[hash:8].[ext]',
                ...(isEnvProduction
                  ? {
                      // inline small images to avoid additional network requests
                      limit: 10000,
                      outputPath: 'static/assets/img',
                    }
                  : {}),
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: () => {
            const loaders = [
              {
                // https://css-tricks.com/svg-sprites-use-better-icon-fonts/
                loader: 'svg-sprite-loader',
                options: {
                  // put all svg icons in separate file sprite.svg,
                  // switch to extract mode where we should use SpriteLoaderPlugin
                  // to configure other options
                  extract: true,
                },
              },
            ];
            if (isEnvProduction) {
              loaders.push({
                loader: 'svgo-loader',
                options: {
                  // by default external config not used
                  externalConfig: '.svgo.yml',
                },
              });
            }
            return loaders;
          },
        },
        {
          test: /\.(woff|woff2|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                esModule: false,
                ...(isEnvProduction
                  ? {
                      name: '[name].[hash:8].[ext]',
                      outputPath: 'static/assets/fonts',
                    }
                  : {}),
              },
            },
          ],
        },
      ],
    },
    plugins: [
      // `ReferenceError: React is not defined` if not `import React from 'react'`
      // in every component
      // https://stackoverflow.com/a/35672696
      // https://medium.com/react-weekly/never-import-react-from-react-again-thanks-to-webpack-s-provideplugin-69e7feb69e
      new webpack.ProvidePlugin({
        'React': 'react',
      }),
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        favicon: 'src/assets/img/favicon.ico',
        ...(isEnvProduction
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : undefined),
      }),
      new SpriteLoaderPlugin({
        // sprite without styles and usages
        plainSprite: true,
      }),
    ],
  };
  if (env.development) {
    return merge(baseConfig, devConfig);
  }
  if (env.production) {
    return merge(baseConfig, prodConfig);
  }
  if (env.eslint) {
    /*
      linter calls webpack config function with predefined 1st arg `env`:

      webpack.base.js

      module.exports = (env) => {
        ...
      };

      which we need to specify by special option of 'eslint-import-resolver-webpack'

      env: {
        eslint: true,
      },

      because otherwise there will be no environment variable and none of configs
      will be returned
    */
    return { resolve: baseConfig.resolve };
  }
  throw new Error('No config was found for specified environment');
};
