const stylelintConfig = require('stylelint.config');

module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require('stylelint')(stylelintConfig),
    require('postcss-preset-env'),
    require('@csstools/postcss-sass'),
    require('postcss-reporter')({ clearReportedMessages: true }),
  ],
};
