const CleanCSS = require('clean-css');
const { globSync } = require('glob');
const fs = require('fs');
const options = require('./cleancss.config');

const tokens = globSync(`styles/themes/*.css`);

new CleanCSS(options).minify([...tokens, 'styles/base.css'], function (error, output) {
  if (error) {
    error.forEach((err) => console.error(err));
    return;
  }

  fs.writeFile('styles/styles.css', output.styles, () => {
    console.log('Tokens added to styles.css');
    return true;
  });
});
