const fs = require("fs");
const html5Lint = require("html5-lint");

const targets = [
  "tweak/index.html",
  "tweak/howto1.html",
  "tweak/main.html",
];

function htmlProofFile(filename, html) {
  return new Promise((resolve, reject) => {
    let hasError = false;

    html5Lint(html, (err, results) => {
      console.info(`\n\n🔎 ${filename} 👇\n\n`);

      results.messages.forEach(msg => {
        const { type, message, lastLine, firstColumn } = msg;

        if (type === "error") {
          hasError = true;
        }

        console.info(
          `html5-lint [${type}]: ${message} ${filename}:${lastLine}:${firstColumn}`
        );
      });

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
    throw new Error("\n\n\nplease fix the errors pointed by html5-lint!");
  }
}

main();
