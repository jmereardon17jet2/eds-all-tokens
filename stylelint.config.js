const fs = require('fs');
const themes = fs.readdirSync('styles/themes').map((file) => `styles/themes/${file}`);

module.exports = {
  plugins: ['stylelint-value-no-unknown-custom-properties'],
  rules: {
    'csstools/value-no-unknown-custom-properties': [
      true,
      {
        importFrom: themes,
      },
    ],
  },
  ignoreFiles: themes,
};
