# template-provider 🚀

> **Automatically generate, update, and organize Express.js routing files with safe, idempotent code generation.**

[![npm version](https://img.shields.io/npm/v/template-provider.svg?style=flat-square)](https://www.npmjs.com/package/template-provider)
[![License](https://img.shields.io/npm/l/template-provider.svg?style=flat-square)](LICENSE)

---

# 📖 Overview

`template-provider` is a lightweight developer utility that automatically generates and updates Express.js routing files.

It safely inserts router imports, endpoint methods, version routes, and table routes while preventing duplicate code generation.

The project serves as one of the core building blocks of the **KeshavSoft API Generation Suite**, enabling CLI tools and VS Code extensions to scaffold Express APIs with minimal effort.

---


# 📂 Project Structure


Each folder demonstrates a different stage of Express route generation.

---

# 🚀 Generation Flow

---

## 1. App.js Generator

The journey of every API begins with app.js. Rather than manually wiring routers every time, the App.js Generator automatically connects them for you. It safely inserts imports and route registrations without creating duplicates, ensuring your application is always organized and ready to grow.

### Purpose

Automatically updates **app.js**.

### Generates

- Router imports
- app.use() registrations
- API router configuration



## 2. Version Route Generator

Great APIs grow over time, and so do their versions. The Version Route Generator automatically organizes routes into version folders like /v1 and /v2, making your API clean, scalable, and easy to maintain.


### Purpose

Creates version-based routing.

---

## 3. Table Route Generator
Every table deserves its own route. The Table Route Generator automatically creates routes from your schema, connecting tables like Customers, Doctors, and Products into a clean, scalable Express API structure with minimal effort.


### Purpose

Creates routes based on schema table names.

---
## 4. Endpoint Generator

An API is only useful when it can perform actions. The Endpoint Generator automatically creates Express endpoint methods for GET, POST, PUT, and DELETE, giving you a clean starting point for every new route while avoiding repetitive code.


### Purpose

Creates endpoint methods for Express routers.

---

# 📦 Installation

```bash
npm install template-provider
```

---

# 🌐 Documentation

Complete documentation is available here:

**Documentation Portal**

https://keshavsoft.github.io/template-provider/

---

# ❤️ Maintainer

Developed and maintained by **KeshavSoft**

GitHub:
https://github.com/keshavsoft

---

# 📄 License

MIT License