import stylelintConfig from './stylelint.config.mjs';

export default {
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
