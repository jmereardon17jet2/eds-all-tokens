const fs = require('fs');
const blockName = process.argv[2] || 'new-block';
const BLOCK_DIR = `blocks/${blockName}`;
const files = [`${BLOCK_DIR}/${blockName}.js`, `${BLOCK_DIR}/${blockName}.css`];

async function createDirectory(path) {
  fs.mkdirSync(path, (err) => {
    if (err) {
      console.error(`Failed to create directory ${path}:`, err);
      throw err;
    }
  });
}

function checkBlockExists() {
  const blockExists = checkFilesExists();

  if (blockExists) {
    console.log(`Block already exists with name: ${blockName}`);
    process.exit(0);
  }
}

function checkFilesExists() {
  return files.some(fs.existsSync);
}

function createBlockFiles() {
  try {
    createDirectory(`${BLOCK_DIR}`);

    fs.readFile('scripts/utils/block.config.js', 'utf8', (err, js) => {
      if (!err && js) {
        fs.writeFile(`${BLOCK_DIR}/${blockName}.js`, js, (err) => {
          if (err) {
            console.error('Failed to create JS', err);
            throw err;
          }
        });
      }
    });

    fs.openSync(`${BLOCK_DIR}/${blockName}.css`, 'a');

    console.log(`Block: ${blockName} created!`);
  } catch (err) {
    console.error('Error creating block files:', err);
  }
}

(async () => {
  try {
    checkBlockExists();
    createBlockFiles();
  } catch (err) {
    console.error('Error creating block:', err);
  }
})();
