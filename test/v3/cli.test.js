import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..", "..");

const cliPath = path.join(rootDir, "bin", "cli.js");
const targetDir = path.join(rootDir, "test", "v4", "fromRoutesJsEnd");
const routesFile = path.join(targetDir, "routes.js");
const generatedDir = path.join(targetDir, "purchases");

console.log("Running CLI test for v4...");

// 1. Ensure routes.js is in pristine state (no purchases imports/uses)
const originalContent = fs.readFileSync(routesFile, "utf8");
if (originalContent.includes("purchases")) {
    // Revert routes.js
    execSync(`git restore ${routesFile}`, { cwd: rootDir });
}
if (fs.existsSync(generatedDir)) {
    fs.rmSync(generatedDir, { recursive: true, force: true });
}

try {
    // 2. Run CLI command
    const cmd = `node ${cliPath} purchases ${targetDir}`;
    console.log(`Executing: ${cmd}`);
    const output = execSync(cmd, { cwd: rootDir, encoding: "utf8" });
    
    console.log("CLI Output:\n", output);

    // 3. Verify output JSON structure
    const jsonStart = output.indexOf("{");
    if (jsonStart === -1) {
        throw new Error("CLI output does not contain JSON");
    }
    const jsonStr = output.substring(jsonStart);
    const parsed = JSON.parse(jsonStr);
    
    if (!parsed || !parsed.fromRakaPoka || parsed.fromRakaPoka.fromAlterFile !== true) {
        throw new Error("CLI execution failed to modify routes file correctly: " + JSON.stringify(parsed));
    }

    // 4. Verify side effects
    const modifiedContent = fs.readFileSync(routesFile, "utf8");
    if (!modifiedContent.includes("routerFrompurchases") || !modifiedContent.includes("purchases")) {
        throw new Error("routes.js was not updated by CLI");
    }

    if (!fs.existsSync(generatedDir)) {
        throw new Error("Template directory was not created by CLI");
    }

    console.log("\x1b[32m✔ CLI Test passed successfully!\x1b[0m");

} catch (error) {
    console.error("\x1b[31m❌ CLI Test failed:\x1b[0m", error.message);
    process.exit(1);
} finally {
    // 5. Clean up side effects
    try {
        execSync(`git restore ${routesFile}`, { cwd: rootDir, stdio: "ignore" });
        if (fs.existsSync(generatedDir)) {
            fs.rmSync(generatedDir, { recursive: true, force: true });
        }
        console.log("Cleaned up test side effects.");
    } catch (cleanupErr) {
        console.error("Cleanup failed:", cleanupErr.message);
    }
}
