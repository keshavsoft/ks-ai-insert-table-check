import { createRequire } from "module";
import getLatestVersion from "./bin/core/getLatestVersion.js";

const require = createRequire(import.meta.url);

const startFunc = (toPath, tableName) => {
    const v = getLatestVersion();

    const mod = require(`./bin/${v}/index.js`);

    return mod.default(toPath, tableName);
};

export default startFunc;