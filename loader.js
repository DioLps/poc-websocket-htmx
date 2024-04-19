const { readFile } = require("node:fs/promises");
const { resolve } = require("node:path");

async function loadFile(path) {
  try {
    const filePath = resolve(path);
    const contents = await readFile(filePath, { encoding: "utf8" });
    return contents;
  } catch (err) {
    console.log("Error on loadFile fn");
    console.error(err.message);
    return null;
  }
}

async function loadView(fileName) {
  try {
    return await loadFile(`./views/${fileName}.html`);
  } catch (err) {
    console.log("Error on loadView fn");
    console.error(err.message);
    return null;
  }
}

module.exports = {
  loadFile,
  loadView,
};
