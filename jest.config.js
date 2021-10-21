module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/ormconfig.js",
    "/src/generated/",
    "/src/helpers/schema-validator.ts",
    "/src/helpers/sql.ts",
    "/src/helpers/translate.ts",
    "/src/migrations/",
    "/src/services/Sentry.ts",
    "/src/services/Config.ts",
    "/tests/",
  ],
  coverageReporters: ["lcov", "text"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  globals: {
    "ts-jest": {
      diagnostics: false,
      isolatedModules: true,
    },
  },
  modulePaths: ["<rootDir>/src/"],
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts?(x)"],
};
