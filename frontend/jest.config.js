module.exports = {
  preset: 'ts-jest',
  'roots': [
    '<rootDir>/components',
    '<rootDir>/pages',
    '<rootDir>/helper',
    '<rootDir>/data-repos',
    '<rootDir>/graphql'
  ],
  setupFilesAfterEnv: [
      '<rootDir>/setupTests.ts',
      '<rootDir>/graphql/posts/__tests__/setupTests.ts'
  ],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json'
    }
  }
};