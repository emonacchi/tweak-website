const spellChecker = require('spellchecker');
const htmlToText = require('html-to-text');

console.log(spellChecker.checkSpelling('this is bd written'));
// [ { start: 5, end: 13 } ]
const input = '<h1>bad writting thgns english is nott a godd langusadfasfage</h1>';
const res = spellChecker.checkSpelling(htmlToText.fromString(input));

res.forEach(r => console.log(`Typo detected: "(...) ${input.slice(r.start, r.end)} (...)" at ${r.start}:${r.end}`));
