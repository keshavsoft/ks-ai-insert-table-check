#!/usr/bin/env node

import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import getLatestVersion from "./core/getLatestVersion.js";
import loadRunner from "./core/loadRunner.js";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8"));

const showHelp = (version, isV4OrLater) => {
    if (isV4OrLater) {
        console.log(`
template-provider-with-discovery CLI v${version}

Usage:
  npx template-provider-with-discovery <tableName> [toPath]

Arguments:
  tableName       Name of the table to insert / configure
  toPath          (Optional) Target path to run discovery and fixing in (default: current working directory)

Options:
  -h, --help      Show this help message
  -v, --version   Show CLI version
  --alterArray    (Optional) JSON string representing array of key/value pairs to replace
`);
    } else {
        console.log(`
template-provider-with-discovery CLI v${version}

Usage:
  npx template-provider-with-discovery <raka> <poka> [toPath]

Arguments:
  raka            Value to use for configuration mapping (e.g. folderName)
  poka            Output value to write
  toPath          (Optional) Target path to run discovery and fixing in (default: current working directory)

Options:
  -h, --help      Show this help message
  -v, --version   Show CLI version
  --alterArray    (Optional) JSON string representing array of key/value pairs to replace
`);
    }
};

const run = async () => {
  const args = process.argv.slice(2);
  const version = getLatestVersion();
  const isV4OrLater = parseInt(version.slice(1)) >= 4;

  if (args.includes("-h") || args.includes("--help")) {
      showHelp(pkg.version, isV4OrLater);
      process.exit(0);
  }

  if (args.includes("-v") || args.includes("--version")) {
      console.log(pkg.version);
      process.exit(0);
  }

  // Parse --alterArray
  let alterArray;
  const alterArrayOpt = args.find(arg => arg.startsWith("--alterArray="));
  if (alterArrayOpt) {
      try {
          alterArray = JSON.parse(alterArrayOpt.split("=")[1]);
      } catch (e) {
          console.error("\x1b[31mError: --alterArray has invalid JSON format.\x1b[0m");
          process.exit(1);
      }
  } else {
      const idx = args.indexOf("--alterArray");
      if (idx !== -1 && idx + 1 < args.length) {
          try {
              alterArray = JSON.parse(args[idx + 1]);
          } catch (e) {
              console.error("\x1b[31mError: --alterArray has invalid JSON format.\x1b[0m");
              process.exit(1);
          }
      }
  }

  // Filter out options to get positional arguments
  const positionals = [];
  for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (arg.startsWith("-")) {
          // If it is --alterArray without '=', skip the next argument as it's the JSON value
          if (arg === "--alterArray" && i + 1 < args.length && !args[i + 1].startsWith("-")) {
              i++;
          }
          continue;
      }
      positionals.push(arg);
  }

  let raka;
  let poka;
  let toPath;

  if (isV4OrLater) {
      raka = positionals[0];
      toPath = positionals[1] ? path.resolve(positionals[1]) : process.cwd();

      if (!raka) {
          console.error("\x1b[31mError: <tableName> argument is required.\x1b[0m");
          showHelp(pkg.version, isV4OrLater);
          process.exit(1);
      }
  } else {
      raka = positionals[0];
      poka = positionals[1];
      toPath = positionals[2] ? path.resolve(positionals[2]) : process.cwd();

      if (!raka || !poka) {
          console.error("\x1b[31mError: Both <raka> and <poka> arguments are required.\x1b[0m");
          showHelp(pkg.version, isV4OrLater);
          process.exit(1);
      }
  }

  if (!fs.existsSync(toPath)) {
      console.error(`\x1b[31mError: Target directory "${toPath}" does not exist.\x1b[0m`);
      process.exit(1);
  }

  const runner = await loadRunner(version);

  try {
      const output = await runner({ raka, poka, toPath, alterArray });
      console.log(JSON.stringify(output, null, 2));
  } catch (error) {
      console.error(`\x1b[31mRuntime Error: ${error.message}\x1b[0m`);
      process.exit(1);
  }
};

run().catch(err => {
    console.error(err);
    process.exit(1);
});