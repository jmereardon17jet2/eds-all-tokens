const { globSync } = require('glob');
const tokens = globSync('styles/themes/**/*.css');

module.exports = {
  plugins: ['stylelint-value-no-unknown-custom-properties'],
  rules: {
    'csstools/value-no-unknown-custom-properties': [
      true,
      {
        importFrom: tokens,
      },
    ],
  },
  ignoreFiles: tokens,
};
