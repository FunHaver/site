import { createReadStream, existsSync, readFileSync } from 'node:fs';
import { createInterface } from 'node:readline/promises';
import { resolve } from 'node:path';

function readHTMLFile(htmlPath) {
  const resolvedPath = resolve(import.meta.dirname, '..', htmlPath);

  if (!existsSync(resolvedPath)) {
    throw new Error(`Markup file not found: ${resolvedPath}`);
  }

  return readFileSync(resolvedPath, 'utf-8');
}

function findAndReplaceMarkupTags(line) {
  const regex = /<markup path="([^"]+)"\/>/g;
  const replacementLine = line.replace(regex, (fullTag, htmlPath) => {
    return JSON.stringify(readHTMLFile(htmlPath));
  })
  console.log(replacementLine);
}

async function process() {
  const fileStream = createReadStream(resolve(import.meta.dirname, '..','src/index.jsx'));
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    findAndReplaceMarkupTags(line);
  }
}

process();