import { createReadStream, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline/promises';
import path, { resolve } from 'node:path';


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
  return replacementLine;
}

async function process(filePath) {
  const fileStream = createReadStream(resolve(import.meta.dirname,filePath));
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  let processedFile = "";
  for await (const line of rl) {
    processedFile += findAndReplaceMarkupTags(line);
  }

  return processedFile;
}

async function interpolate(projectRoot,input,inExtension,output) {
  const inputDir = resolve(import.meta.dirname, projectRoot, input);
  const extension = `.${inExtension}`;

  if (!existsSync(inputDir)) {
    throw new Error(`Input directory not found: ${inputDir}`);
  }

  const filePaths = readdirSync(inputDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(extension))
    .map((entry) => resolve(inputDir, entry.name));

  if (filePaths.length === 0) {
    console.log(`No ${extension} files found in ${inputDir}`);
    return;
  }

  for (const filePath of filePaths) {
    const outDir = path.resolve(import.meta.dirname,projectRoot,output);
    const outFileName = path.parse(filePath).name + ".js";
    const outPath = path.resolve(outDir,outFileName);
    if(existsSync(outPath)){
      console.log(`${outPath} already exists, skipping.`);
    } else {
      //write file to out
      const fileContents = await process(filePath);
      mkdirSync(outDir, {recursive: true});
      writeFileSync(outPath,fileContents,{encoding: 'utf-8',flag:'w'})
    }
  }

  console.log('interpolator finished');
}

export default interpolate;