module.exports = {
  transform: {
    '^.+\\.tsx?$': ['@swc/jest'],
  },
  'roots': [
    '<rootDir>/components',
    '<rootDir>/pages',
    '<rootDir>/helper',
    '<rootDir>/data-repos',
    '<rootDir>/data/graphql'
  ],
  setupFilesAfterEnv: [
      '<rootDir>/setupTests.ts',
      '<rootDir>/data/graphql/post/__tests__/setupTests.ts'
  ],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json'
    }
  }
};