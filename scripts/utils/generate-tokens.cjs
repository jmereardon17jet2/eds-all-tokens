const path = require('path');
const CleanCSS = require('clean-css');
const { globSync } = require('glob');
const fs = require('fs');
const themeIndex = process.argv.indexOf('--theme');
const themes = fs.readdirSync('node_modules/@jet2/designsystem.tokens/build/web');
const options = require('./cleancss.config.cjs');
let chosenTheme;

if (themeIndex > -1) chosenTheme = process.argv[themeIndex + 1];

const createCSSFiles = (theme) => {
  const themePath = `node_modules/@jet2/designsystem.tokens/build/web/${theme}`;
  const targetThemePath = `styles/themes/${theme}`;

  // Create theme directory if it doesn't exist
  if (!fs.existsSync(targetThemePath)) fs.mkdirSync(targetThemePath, { recursive: true });

  // Get all directories within the theme
  const directories = fs.readdirSync(themePath);

  directories.forEach((dir) => {
    const targetDirPath = path.join(targetThemePath, dir);

    // Create directory for each subfolder in the theme
    if (!fs.existsSync(targetDirPath)) fs.mkdirSync(targetDirPath, { recursive: true });

    // Get all CSS files in the directory
    const cssFiles = globSync(`${themePath}/${dir}/*.css`);

    // Optimize and save each CSS file
    cssFiles.forEach((file) => {
      const fileName = path.basename(file);
      const outputFilePath = path.join(targetDirPath, fileName);
      const css = fs.readFileSync(file, 'utf8');

      new CleanCSS(options).minify(css, (error, output) => {
        if (error) {
          console.error(`Failed to compile CSS: ${file}`, error);
          return;
        }

        fs.writeFileSync(outputFilePath, output.styles);
        console.log(`Created tokens CSS file: ${outputFilePath}`);
      });
    });
  });
};

if (chosenTheme) {
  createCSSFiles(chosenTheme);
} else {
  themes.forEach(createCSSFiles);
}
