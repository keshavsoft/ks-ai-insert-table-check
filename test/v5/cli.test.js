import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..", "..");

const cliPath = path.join(rootDir, "bin", "cli.js");
const routesFile = path.join(__dirname, "routes.js");
const backupRoutesFile = path.join(__dirname, "routes.js.bak");

console.log("Running CLI test for v3...");

try {
    // Ensure starting state is clean and routesFile exists
    if (!fs.existsSync(routesFile) && fs.existsSync(backupRoutesFile)) {
        fs.renameSync(backupRoutesFile, routesFile);
    } else if (!fs.existsSync(routesFile)) {
        fs.writeFileSync(routesFile, "import express from 'express';\nconst router = express.Router();\nexport { router };\n");
    }

    // Test case 1: routes.js exists in target directory
    const cmd1 = `node ${cliPath} purchases pokaValue ${__dirname}`;
    console.log(`Executing: ${cmd1}`);
    const output1 = execSync(cmd1, { cwd: rootDir, encoding: "utf8" });
    console.log("CLI Output 1:\n", output1);

    const jsonStart1 = output1.indexOf("{");
    if (jsonStart1 === -1) {
        throw new Error("CLI output 1 does not contain JSON");
    }
    const parsed1 = JSON.parse(output1.substring(jsonStart1));
    if (parsed1.KTF !== true) {
        throw new Error("Expected KTF to be true when routes.js exists");
    }

    // Test case 2: routes.js does NOT exist in target directory
    fs.renameSync(routesFile, backupRoutesFile);
    try {
        const cmd2 = `node ${cliPath} purchases pokaValue ${__dirname}`;
        console.log(`Executing: ${cmd2}`);
        const output2 = execSync(cmd2, { cwd: rootDir, encoding: "utf8" });
        console.log("CLI Output 2:\n", output2);

        const jsonStart2 = output2.indexOf("{");
        if (jsonStart2 === -1) {
            throw new Error("CLI output 2 does not contain JSON");
        }
        const parsed2 = JSON.parse(output2.substring(jsonStart2));
        if (parsed2.KTF !== false) {
            throw new Error("Expected KTF to be false when routes.js is missing");
        }
    } finally {
        if (fs.existsSync(backupRoutesFile)) {
            fs.renameSync(backupRoutesFile, routesFile);
        }
    }

    console.log("\x1b[32m✔ CLI Test for v3 passed successfully!\x1b[0m");

} catch (error) {
    console.error("\x1b[31m❌ CLI Test for v3 failed:\x1b[0m", error.message);
    process.exit(1);
}
