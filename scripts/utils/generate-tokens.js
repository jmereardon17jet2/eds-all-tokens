const CleanCSS = require('clean-css');
const { globSync } = require('glob');
const fs = require('fs');
const themeIndex = process.argv.indexOf('--theme');
const themes = fs.readdirSync('node_modules/@jet2/designsystem.tokens/build/web');
const options = require('./cleancss.config');
let chosenTheme;
let cssFiles;

if (themeIndex > -1) chosenTheme = process.argv[themeIndex + 1];

const createCSSFile = (theme) => {
  cssFiles = globSync(`node_modules/@jet2/designsystem.tokens/build/web/${theme}/*/*.css`);

  if (!fs.existsSync('styles/themes')) fs.mkdirSync('styles/themes');

  new CleanCSS(options).minify(cssFiles, function (error, output) {
    if (error) {
      console.log('Failed to compile CSS, check reference file path and that theme exists');
      throw Error(error);
    }

    fs.writeFile(`styles/themes/${theme}.css`, output.styles, () => true);
    console.log(`Created tokens css file for ${theme}: styles/themes/${theme}.css`);
  });
};

if (chosenTheme) {
  createCSSFile(chosenTheme);
} else {
  themes.forEach(createCSSFile);
}
