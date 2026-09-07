import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import copy from "./copyToDist.js";
import interpolate from "./interpolator.js";

const config = JSON.parse(
  readFileSync(resolve(import.meta.dirname, 'config.json'), 'utf-8')
);

copy(config.in,config.out,config.projectRoot,config.copy.files);
interpolate(config.projectRoot,config.in,config.interpolator.extension,config.out);