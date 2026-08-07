# ks-ai-insert-table-check 🚀

> **A CLI and SDK utility for verifying the existence of target routing files before performing table insertions or scaffolding in Express.js.**

[![npm version](https://img.shields.io/npm/v/ks-ai-insert-table-check.svg?style=flat-square)](https://www.npmjs.com/package/ks-ai-insert-table-check)
[![License](https://img.shields.io/npm/l/ks-ai-insert-table-check.svg?style=flat-square)](LICENSE)

---

## 📖 Overview

`ks-ai-insert-table-check` is a lightweight developer utility and SDK that checks if required routing files (specifically `routes.js`) exist in a target directory. It is designed to act as a pre-check validator for code generators and scaffolding tools, ensuring a safe workspace environment before attempting to insert new table routes or endpoints.

This project is a core building block of the **KeshavSoft API Generation Suite**, enabling CLI generators and VS Code extensions to verify local file environments with minimal effort.

---

## 📂 Versioning & Support

- **v3 (Latest)**: Resolves routing files based on configurations provided by `pattern-collector-base-files` (specifically looking up the `fromRoutesJsEnd` structure) and returns an execution result format.

---

## 🚀 Execution Flow

```text
Run CLI / SDK Check
        │
        ▼
Resolve target paths from pattern-collector-base-files config
        │
        ▼
Verify if routes.js file exists in target path
        │
        ▼
Return JSON check payload (e.g. { KTF: true, KReason: "..." })
```

---

## 📦 Installation

To install globally or locally in your project:

```bash
npm install ks-ai-insert-table-check
```

---

## 💻 CLI Usage

Run the checker from your terminal using:

```bash
npx ks-ai-insert-table-check <raka> <poka> [toPath]
```

### Arguments

* **`raka`** - Value used for mapping.
* **`poka`** - Value used for naming/validation.
* **`toPath`** - *(Optional)* Target path to inspect (defaults to the current working directory).

### Options

* **`-h`, `--help`** - Show help message and usage instructions.
* **`-v`, `--version`** - Show CLI version.

### Example

```bash
npx ks-ai-insert-table-check purchases pokaValue ./test/v3
```

#### Output (JSON)

```json
{
  "KTF": true,
  "KReason": "file found : D:\\projects\\test\\v3\\routes.js"
}
```

---

## ⚙️ SDK Usage

You can also import `ks-ai-insert-table-check` programmatically in Node.js:

```javascript
import runCheck from "ks-ai-insert-table-check";

const targetPath = "./src/routes";
const result = runCheck(targetPath);

console.log(result);
/*
Output:
{
  "KTF": true,
  "KReason": "file found : D:\\projects\\src\\routes\\routes.js"
}
*/
```

---

## ❤️ Maintainer

Developed and maintained with ❤️ by **KeshavSoft**

- GitHub: [keshavsoft](https://github.com/keshavsoft)

---

## 📄 License

MIT License