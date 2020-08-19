module.exports = {
  env: {
    browser: true,
    // webpack
    commonjs: true,
    // other js
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    // we are made it available to every component in webpack
    React: 'readonly',
  },
  rules: {
    'no-plusplus': 'off',
    /*
      grid:
        'location shops . to-buyers . projects . call . notifications . enter . registration .' 39.36px
        / 245px auto 10px auto 10px auto 1fr auto 20px auto 20px auto 10px auto 4px;

      And in the editor there is a limit line
    */
    'max-len': 'off',
    /*
      .find((data) => data.id === storData.id);
      Better than
      .find(data => data.id === storData.id);

      Brackets around a single parameter of the arrow function are required.
      It’s easier to identify function by looking through the code
    */
    'arrow-parens': ['error', 'always'],
    /*
      <img src={require('../path/img.png')} ... />

      We can't do it in other way without boilerplate using react
    */
    'global-require': 'off',
    /*
      const webpack = require('webpack');

      `'webpack' should be listed in the project's dependencies, not
      devDependencies`
    */
    'import/no-extraneous-dependencies': 'off',
    // using only named import for vscode import autocomplete
    // https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/
    'import/prefer-default-export': 'off',
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
        shorthandLast: false,
        noSortAlphabetically: true,
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
};
