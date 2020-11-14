const pug = require("pug");
const sass = require("node-sass");
const fs = require("fs");

function createPublic() {
  !fs.existsSync("./public") && fs.mkdirSync("./public");
}

function compilePug() {
  const pages = fs.readdirSync("./pages");

  pages.forEach((page) => {
    const filesAndDir = fs.readdirSync(`./pages/${page}`);

    filesAndDir.forEach((file) => {
      const filename = file.split(".")[0];
      createPublic();

      if (file.includes(".pug")) {
        const html = renderPugFile(filename, file);
        savePugFile(html, filename);
      }

      if (file.includes(".js")) {
        copyScript(page, file);
      }
    });
  });
}

function renderPugFile(filename, file) {
  return pug.renderFile(`./pages/${filename}/${file}`, {
    pretty: true,
    cache: true,
  });
}

function createDir(name) {
  !fs.existsSync(`./public/${name}`) && fs.mkdirSync(`./public/${name}`);
}

function savePugFile(html, filename) {
  createDir(filename);

  fs.writeFileSync(`./public/${filename}/${filename}.html`, html);
}

function copyScript(dir, file) {
  const data = fs.readFileSync(`./pages/${dir}/${file}`);

  fs.writeFileSync(`./public/${dir}/${file}`, data);
}

function compileSass() {
  const dirs = fs.readdirSync("./scss");

  dirs.forEach((dir) => {
    const files = fs.readdirSync(`./scss/${dir}`);

    files.forEach((file) => {
      const compiled = renderSass(dir, file);

      const filename = file.split(".")[0];

      createPublic();
      saveCssFile(compiled, dir, filename);
    });
  });
}

function renderSass(dir, file) {
  const data = fs.readFileSync(`./scss/${dir}/${file}`, { encoding: "utf-8" });

  return sass.renderSync({
    data,
  });
}

function saveCssFile(compiled, dir, filename) {
  createDir(dir);

  fs.writeFileSync(`./public/${dir}/${filename}.css`, compiled.css);
}

module.exports = {
  compilePug,
  compileSass,
};
