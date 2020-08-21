const { BASE_FONT_SIZE } = require('./src/js/constants');

const isEnvProduction = process.env.NODE_ENV === 'development';

const presets = [
  '@babel/preset-env',
  '@babel/preset-react',
];
const plugins = [
  // `regeneratorRuntime is not defined` when using async/await
  // https://www.valentinog.com/blog/await-react/
  '@babel/plugin-transform-runtime',
  ['babel-plugin-styled-components-px2rem', {
    // root font size
    rootValue: BASE_FONT_SIZE,
    /*
      const Svg = styled.svg`
        width: ${({ $width }) => $width}px;
      `;

      Replace dynamic px values with rem
    */
    transformRuntime: true,
  }],
  ['babel-plugin-styled-components', {
    ...(isEnvProduction ? {
      // better dead code elimination
      // https://styled-components.com/docs/tooling#dead-code-elimination
      pure: true,
    } : {
      // https://styled-components.com/docs/tooling#minification
      // removes all whitespace & comments
      minify: false,
      // transpiles tagged template literals, keeping valuable bytes out of your bundles
      transpileTemplateLiterals: false,
    }),
  }],
];

const envOptions = {
  presets,
  plugins,
};

module.exports = {
  presets,
  env: {
    // duplicating options in each env for right plugins order of execution
    // https://github.com/styled-components/babel-plugin-styled-components/issues/78#issuecomment-322505412
    development: envOptions,
    production: envOptions,
  },
};
