import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import runSync from "../../index.js";
const tableName = "purchases";

const fromNpm = runSync(__dirname, tableName);

console.log("aaaaaa : ", fromNpm);
