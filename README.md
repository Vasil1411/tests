# 🚀 Playwright Test Automation Framework (API, Database & UI)

Comprehensive automated testing suite built with **Playwright** and **TypeScript**, featuring robust end-to-end (E2E) UI validation, REST API checks, and direct **Oracle Database** integration.

---

## 📂 Project Structure

```text
├── Api and database test/
│   └── homework3/
│       ├── pageObjects/          # Page Object Models for API/DB workflows
│       ├── tests/
│       │   ├── apiTests.spec.ts  # REST API test scenarios
│       │   └── dbTests.spec.ts   # Oracle DB validation & queries
│       ├── connectionToOracleDB.ts # Oracle DB connection handler
│       ├── helperBase.ts         # Base helper classes
│       └── playwright.config.ts  # Playwright configuration for API/DB
│
└── UI test/
    └── homework/
        └── latest/
            ├── pageObjects/      # UI Page Objects (Cart, Login, Register, Home, etc.)
            ├── tests/
            │   ├── example.spec.ts
            │   ├── negativeTests.spec.ts # Negative test cases
            │   └── positiveTests.spec.ts # Positive test cases
            ├── helperBase.ts     # UI helper base
            └── playwright.config.ts # Playwright configuration for UI
