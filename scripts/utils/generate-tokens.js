const CleanCSS = require('clean-css');
const { globSync } = require('glob');
const fs = require('fs');
const Diff = require('diff');
const themeIndex = process.argv.indexOf('--theme');
const themes = fs.readdirSync('node_modules/@jet2/designsystem.tokens/build/web');
const options = require('cleancss.config');
let chosenTheme;
let cssFiles;

if (themeIndex > -1) chosenTheme = process.argv[themeIndex + 1];

const createCSSFile = (theme) => {
  cssFiles = globSync(`node_modules/@jet2/designsystem.tokens/build/web/${theme}/*/*.css`);

  if (!fs.existsSync('styles/tokens')) fs.mkdirSync('styles/tokens');

  new CleanCSS(options).minify(cssFiles, function (error, output) {
    if (error) {
      console.log('Failed to compile CSS, check reference file path and that theme exists');
      throw Error(error);
    }

    fs.readFile(`styles/tokens/${theme}.css`, 'utf8', (err, css) => {
      if (!err && css) {
        const changes = Diff.diffCss(css, output.styles);
        if (changes.length) console.log(`${changes.length} changes for ${theme} tokens`);
      }
    });

    fs.writeFile(`styles/tokens/${theme}.css`, output.styles, () => true);
    console.log(`Created tokens css file for ${theme}: styles/tokens/${theme}.css`);
  });
};

if (chosenTheme) {
  createCSSFile(chosenTheme);
} else {
  themes.forEach(createCSSFile);
}
