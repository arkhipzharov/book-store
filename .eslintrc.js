const path = require('path');

module.exports = {
  env: {
    es6: true,
  },
  parserOptions: {
    // Parsing error: 'import' and 'export' may appear only with 'sourceType: module'
    // https://github.com/eslint/eslint/issues/5552#issuecomment-195544822
    sourceType: 'module',
  },
  rules: {
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
    // using only named import for vscode import autocomplete
    // https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/
    'import/prefer-default-export': 'off',
    // this rule can't look up in root node_modules to find package symlinked
    // with lerna
    // https://github.com/benmosher/eslint-plugin-import/issues/458#issuecomment-496134695
    'import/no-extraneous-dependencies': 'off',
  },
};
