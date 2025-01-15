import fs from 'fs';
import { globSync } from 'glob';

const cssFiles = [...globSync('styles/*.css'), ...globSync('blocks/**/*.css')];
const tokenFiles = globSync(`styles/themes/**/*.css`);
const used = new Set();
const unused = new Set();

const checkCoverage = async () => {
  const styles = cssFiles.map((file) => fs.readFileSync(file, 'utf-8'));
  const tokenStyles = tokenFiles.map((file) => fs.readFileSync(file, 'utf-8'));

  tokenStyles.forEach((style) => {
    const matches = style.toString().match(/(--)[^,:)]+/g);

    if (matches) {
      const cssVariables = matches.map((match) => match.replace(/:.*/, '').trim());

      for (const variable of cssVariables) {
        let isUsed = false;

        for (const css of styles) {
          if (css.includes(variable)) {
            isUsed = true;
            break;
          }
        }

        isUsed ? used.add(variable) : unused.add(variable);
      }
    }
  });

  console.table(
    [...used, ...unused].sort().map((variable) => {
      return {
        Used: used.has(variable),
        'CSS Variable': variable,
      };
    })
  );
  console.log(`Total used variables: ${used.size}`);
  console.log(`Total unused variables: ${unused.size}`);
};

checkCoverage();
