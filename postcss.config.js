const stylelintConfig = require('./stylelint.config');

module.exports = {
  map: false,
  syntax: 'postcss-scss',
  plugins: [
    require('stylelint')(stylelintConfig),
    require('postcss-preset-env'),
    require('@csstools/postcss-sass')({
      silenceDeprecations: ['legacy-js-api'],
    }),
    require('postcss-import'),
    require('postcss-reporter')({ clearReportedMessages: true }),
  ],
};
