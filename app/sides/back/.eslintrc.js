// is some comments will possibly have duplicate in other subfolder configs,
// they are exist only here.

// `require() of .../.eslintrc.js from .../config-array-factory.js is
// an ES module file as it is a .js file whose nearest parent package.json
// contains "type": "module" which defines all .js files in that package scope
// as ES modules. Instead rename .eslintrc.js to end in .cjs, change the
// requiring code to use import(), or remove "type": "module"`, that's why
// this file have .cjs extension

const _ = require('lodash');
const baseConfig = require('../../../.eslintrc.js');

// merging for ability to override subfolder config extends: [...] rules in root
// config
module.exports = _.merge(baseConfig, {
  extends: [
    'airbnb-base',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ['.eslintrc.*'],
      rules: {
        // .eslintrc.cjs
        // const baseConfig = require('../.eslintrc.js');
        'node/no-unpublished-require': 'off',
      },
    },
  ],
  rules: {
    // (unknown)
    // (1)
    // eslint-import-resolver-alias can't fix this rule for now,
    'import/no-unresolved': 'off',
    // (pending)
    // this rule can't look up in root node_modules to find package symlinked
    // with lerna
    // https://github.com/benmosher/eslint-plugin-import/issues/1174
    'node/no-extraneous-require': 'off',
    // `Import and export declarations are not supported yet`
    'node/no-unsupported-features/es-syntax': 'off',
    // (1)
    'node/no-missing-import': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', '../../../app'],
          ['@back', './src'],
        ],
        extensions: ['.js'],
      },
    },
  },
});
