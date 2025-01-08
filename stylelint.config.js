const fs = require('fs');
const tokens = fs.readdirSync('styles/tokens').map((file) => `styles/tokens/${file}`);

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
