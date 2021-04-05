module.exports = {
  preset: "ts-jest",
  "roots": [
    "<rootDir>/components",
    "<rootDir>/pages",
    "<rootDir>/helper",
    "<rootDir>/data-repos",
    "<rootDir>/data-api"
  ],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.jest.json"
    }
  }
};