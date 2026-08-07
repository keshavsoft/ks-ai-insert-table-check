# Developer Notes – ks-ai-insert-table-check

---

## 🎯 Purpose

This package is a read-only validation utility in the API generation lifecycle:
1. **CLI Tool**: Invoked via `bin/cli.js` to dry-run verify target file setups.
2. **SDK Reference**: Imported programmatically by `ks-ai-insert-table` and external scaffolding tools (like `EndPointGen`) to test target workspace directory readiness.

---

## 🧩 Architecture

The validation checking utilizes dynamic versioning:
```text
Check invocation
  └─► bin/cli.js 
        └─► bin/core/getLatestVersion.js (Loads highest version vX directory)
              └─► bin/core/loadRunner.js (Dynamically imports bin/vX/start.js)
                    └─► bin/vX/index.js (Performs check logic)
```

The check logic operates as follows:
* Reads path configuration profiles using the package `pattern-collector-base-files`.
* Maps the target framework (such as `fromRoutesJsEnd`) to its filename expectation (e.g. `routes.js`).
* Runs a check using node `fs.existsSync` to ensure the required routing file is in place, returning `{ KTF: true }` or `{ KTF: false, KReason }`.

---

## 🔗 Related Ecosystem Projects

### 1. `ks-ai-insert-table`
https://github.com/keshavsoft/ks-ai-insert-table

The main scaffolding CLI that utilizes this check repository before writing templates and altering routing configurations.

### 2. VS Code Extension (`EndPointGen`)
https://github.com/keshavsoft/EndPointGen

Ecosystem consumer that relies on both verification and insertion layers to support interactive developer workflows.