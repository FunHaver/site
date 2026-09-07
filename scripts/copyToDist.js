import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

// recursively copies files from src into dist
// flattens file hierarchy in dist
function copy(src,dist,projectRoot,filesToMove = [],{wipeDist} = {wipeDist: false}) {

  const resolvedSrc = resolve(import.meta.dirname, projectRoot, src);
  const resolvedDist = resolve(import.meta.dirname, projectRoot, dist);

  if (!existsSync(resolvedSrc)) {
    throw new Error(`Source directory not found: ${resolvedSrc}`);
  }

  if (wipeDist) {
    rmSync(resolvedDist, { recursive: true, force: true });
  }

  mkdirSync(resolvedDist, { recursive: true });

  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const entryPath = resolve(dir, entry.name);
      if (entry.isDirectory()) {
        walk(entryPath);
      } else if (entry.isFile() && filesToMove.includes(entry.name)) {
        copyFileSync(entryPath, resolve(resolvedDist, entry.name));
      }
    }
  }

  walk(resolvedSrc);
  console.log("copy finished");
}

export default copy;