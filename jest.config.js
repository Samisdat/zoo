module.exports = {
  preset: "ts-jest",
  "roots": [
    "<rootDir>/components",
    "<rootDir>/pages",
    "<rootDir>/helper"
  ],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.jest.json"
    }
  }
};