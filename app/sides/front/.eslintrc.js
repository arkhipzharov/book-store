const _ = require('lodash');
const baseConfig = require('../../../.eslintrc.js');

module.exports = _.merge(baseConfig, {
  env: {
    browser: true,
    // webpack
    commonjs: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  overrides: [
    {
      files: ['webpack.*.js'],
      rules: {
        /*
          const webpack = require('webpack');

          `'webpack' should be listed in the project's dependencies, not
          devDependencies`
        */
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  rules: {
    /*
      <img src={require('../path/img.png')} ... />

      We can't do it in other way without boilerplate using react
    */
    'global-require': 'off',
    /*
      suppress errors for missing `import React from 'react'` in files,
      because we do it with webpack

      new webpack.ProvidePlugin({
        'React': 'react',
      }),
    */
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': [
      0,
      {
        /*
          const Icon = ({ viewBox = '0 0 1 1', ... }) => {
            ...
          };

          Icon.propTypes = {
            viewBox: PropTypes.string,
            ...
          };

          `propType "viewBox" is not required, but has no corresponding
          defaultProps declaration`
          https://stackoverflow.com/a/56443098
        */
        ignoreFunctionalComponents: true,
      },
    ],
    /*
      main.js

      ReactDOM.render(<App />, document.querySelector('.root'));
      `JSX not allowed in files with extension '.js'`
    */
    'react/jsx-filename-extension': [1, { 'extensions': ['.js'] }],
    'react/jsx-no-undef': [
      1,
      {
        /*
          <React.StrictMode>
            ...
          </React.StrictMode>

          `'React' is not defined`
        */
        allowGlobals: true,
      },
    ],
    'react/jsx-sort-props': [
      1,
      {
        ignoreCase: false,
        callbacksLast: true,
        shorthandFirst: false,
        shorthandLast: true,
        noSortAlphabetically: false,
        reservedFirst: true,
      },
    ],
    /*
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>

      ``code` must be placed on a new line`
      https://github.com/yannickcr/eslint-plugin-react/issues/1848
    */
    'react/jsx-one-expression-per-line': 'off',
    /*
      function ReactBootstrapSliderWrapper(props) {
        return <ReactBootstrapSlider {...props} />;
      },

      const WrapperButton = ({ children, ...props }) => {
        return <Button {...props}>{children}</Button>;
      };

      if we want type safety we should write custom prop-type validator for
      every component remaining props, it's quite boilerplate
    */
    'react/jsx-props-no-spreading': 'off',
  },
  settings: {
    'react': {
      // `Warning: React version was set to "detect" in eslint-plugin-react
      // settings, but the "react" package is not installed. Assuming latest
      // React version for linting.`
      // https://github.com/yannickcr/eslint-plugin-react/issues/1955#issuecomment-415181022
      version: '999.999.999',
    },
    'import/resolver': {
      webpack: {
        // respect resolve option in this config
        config: 'webpack.base.js',
        env: {
          eslint: true,
        },
      },
    },
  },
});
