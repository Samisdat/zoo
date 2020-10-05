module.exports = {
  preset: "ts-jest",
  "roots": [
    "<rootDir>/components",
    "<rootDir>/pages"
  ],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.jest.json"
    }
  }
};