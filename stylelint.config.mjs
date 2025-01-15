import { globSync } from 'glob';
const tokens = globSync('styles/themes/**/*.css');

export default {
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
