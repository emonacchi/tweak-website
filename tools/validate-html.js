const fs = require("fs");
const html5Lint = require("html5-lint");

const WHITELIST = [
  "Bad value  for attribute “src” on element “img”: Expected an equals sign, a comma or a token character but saw “;” instead."
];
const targets = ["docs/index.html", "docs/documentation.html"];

function isWhitelisted(m) {
  const { message = "" } = m;

  return !!WHITELIST.find(wm => message.includes(wm));
}

function negate(fn) {
  return (...args) => !fn(...args);
}

function htmlProofFile(filename, html) {
  return new Promise((resolve, reject) => {
    let hasError = false;

    html5Lint(html, (err, results) => {
      const messages =
        results &&
        results.messages &&
        results.messages.filter(negate(isWhitelisted));

      if (messages && messages.length) {
        console.info(`\n\n🔎 ${filename} 👇\n\n`);

        messages.forEach(msg => {
          const { type, message, lastLine = "", firstColumn = "" } = msg;

          if (type === "error") {
            hasError = true;
          }

          console.info(
            `html5-lint [${type}]: ${message} ${filename}:${lastLine}:${firstColumn}`
          );
        });
      }

      return resolve(hasError);
    });
  });
}

function readFile(...args) {
  return new Promise((resolve, reject) => {
    fs.readFile(...args, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
}

async function main() {
  let hasError = false;

  for (t of targets) {
    const html = await readFile(t, "utf-8").catch(err => {
      throw err;
    });
    await htmlProofFile(t, html).then(_hasError => {
      if (_hasError) {
        hasError = _hasError;
      }
    });
  }

  if (hasError) {
    console.warn("\n\n\nplease fix the errors pointed by html5-lint!");
    process.exit(1);
  } else {
    console.log('\n\n\n🎉🎉🎉 No errors found! 🎉🎉🎉\n\n\n')
  }
}

main();
