module.exports = {
  root: true,
  ignorePatterns: ['**/src/stories/*'],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals'
  ],
  rules: {
    quotes: ['error', 'single']
  }
};