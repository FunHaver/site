import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline/promises';

function findAndReplaceMarkupTags(line) {
  const regex = /<markup path="([^"]+)"\/>/g;
  const replacementLine = line.replace(regex, (fullTag, path) => {
    //function for spitting out html contents goes below
    return `"${path} FILE CONTENTS"`;
  })
  console.log(replacementLine);
}

async function process() {
  const fileStream = createReadStream('../index.js');

  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    findAndReplaceMarkupTags(line);
  }
}

process();